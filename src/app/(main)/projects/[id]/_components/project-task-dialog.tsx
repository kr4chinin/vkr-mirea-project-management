'use client';

import { useUser } from '@clerk/nextjs';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskStatus, type Task } from '@prisma/client';
import { redirect, useRouter } from 'next/navigation';
import { useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '~/components/ui/button';
import { DatePicker } from '~/components/ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Form, FormField } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { ScrollArea } from '~/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Textarea } from '~/components/ui/textarea';
import { AppRoutes, RoutePath } from '~/config/route-config';
import { cn, getReadableTaskStatusLabel } from '~/lib/utils';
import { api } from '~/trpc/react';
import { ProjectTaskDialogFormItem } from './project-task-dialog-form-item';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Необходимо указать название задачи' }),
  description: z.string(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  status: z.nativeEnum(TaskStatus).optional(),
});

interface Props {
  projectId: number;
  button: ReactNode;
  task?: Task;
  setProjectTasks: Dispatch<SetStateAction<Task[]>>;
}

export function ProjectTaskDialog(props: Props) {
  const { projectId, task, button, setProjectTasks } = props;

  const router = useRouter();
  const { user } = useUser();

  const [opened, setOpened] = useState(false);

  const createTask = api.task.createTask.useMutation({
    onSuccess: () => {
      router.refresh();

      toast.success('Задача успешно создана', { icon: '💎' });
    },
  });

  const changeTaskIsCompletedState = api.task.changeTaskIsCompletedState.useMutation({
    onSuccess: () => {
      router.refresh();

      const isCompleted = task?.isCompleted;

      toast.success(isCompleted ? 'Задача успешно сделана активной' : 'Задача успешно выполнена', {
        icon: isCompleted ? '✅' : '🎉',
      });
    },
  });

  const updateTask = api.task.updateTask.useMutation({
    onSuccess: () => {
      router.refresh();

      toast.success('Задача успешно обновлена', { icon: '✏️' });
    },
  });

  const handleResetFormAfterMutation = (task: Task) =>
    form.reset({
      name: task.name,
      description: task.description ?? '',
      startDate: task.startDate ?? undefined,
      endDate: task.endDate ?? undefined,
      status: task.status,
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: task?.name ?? '',
      description: task?.description ?? '',
      startDate: task?.startDate ?? undefined,
      endDate: task?.endDate ?? undefined,
      status: task?.status,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) redirect(RoutePath[AppRoutes.SIGN_IN]);

    if (task) {
      const updatedTask = await updateTask.mutateAsync({
        id: task.id,
        name: values.name,
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
        status: values.status,
      });

      setProjectTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      handleResetFormAfterMutation(updatedTask);
    } else {
      const createdTask = await createTask.mutateAsync({
        projectId,
        name: values.name,
        createdBy: user.id,
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
        status: values.status,
      });

      setProjectTasks(prev => [createdTask, ...prev]);
      form.reset();
    }
  };

  const handleChangeTaskIsCompleteState = async () => {
    if (!task) throw new Error('Task does not exist yet, failed to change isComplete state');

    await handleSubmit(form.getValues());
    const updatedTask = await changeTaskIsCompletedState.mutateAsync({
      id: task.id,
      isCompleted: !task.isCompleted,
    });

    setProjectTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    handleResetFormAfterMutation(updatedTask);

    setOpened(false);
  };

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>{button}</DialogTrigger>

      <DialogContent className="max-h-[600px] max-w-[540px] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{task ? 'Внесите изменения в задачу' : 'Создайте задачу'}</DialogTitle>
          <DialogDescription>
            {task
              ? 'Вы находитесь в режиме редактирования задачи'
              : 'Создайте задачу в вашем проекте'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={async e => {
              await form.handleSubmit(handleSubmit)(e);

              setOpened(false);
            }}
          >
            <ScrollArea className="max-h-[440px] w-full">
              <div className="flex flex-1 flex-col gap-4 p-2">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <ProjectTaskDialogFormItem label="Название задачи">
                      <Input placeholder="Введите название задачи" {...field} />
                    </ProjectTaskDialogFormItem>
                  )}
                />

                <div className="flex gap-4">
                  <FormField
                    name="startDate"
                    control={form.control}
                    render={({ field }) => (
                      <ProjectTaskDialogFormItem label="Начало задачи">
                        <DatePicker selected={field.value} onSelect={field.onChange} />
                      </ProjectTaskDialogFormItem>
                    )}
                  />

                  <FormField
                    name="endDate"
                    control={form.control}
                    render={({ field }) => (
                      <ProjectTaskDialogFormItem label="Окончание задачи">
                        <DatePicker selected={field.value} onSelect={field.onChange} />
                      </ProjectTaskDialogFormItem>
                    )}
                  />
                </div>

                <FormField
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <ProjectTaskDialogFormItem label="Статус задачи">
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-[240px]">
                          <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(TaskStatus).map(status => (
                            <SelectItem key={status} value={status}>
                              {getReadableTaskStatusLabel(status)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </ProjectTaskDialogFormItem>
                  )}
                />

                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <ProjectTaskDialogFormItem label="Описание задачи">
                      <Textarea
                        rows={6}
                        className="max-h-[300px]"
                        placeholder="Введите описание задачи"
                        {...field}
                      />
                    </ProjectTaskDialogFormItem>
                  )}
                />
              </div>
            </ScrollArea>

            <div className="flex items-center gap-2">
              {task && (
                <Button
                  type="button"
                  variant={task.isCompleted ? 'outline' : 'default'}
                  className={cn({
                    'flex flex-1 items-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-600':
                      !task.isCompleted,
                  })}
                  onClick={handleChangeTaskIsCompleteState}
                >
                  {!task.isCompleted && (
                    <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center">
                      <CheckCircleIcon width={20} height={20} stroke="white" />
                    </div>
                  )}

                  {task.isCompleted ? 'Сделать активной' : 'Завершить задачу'}
                </Button>
              )}

              <Button className="flex flex-1" type="submit" disabled={createTask.isPending}>
                {task ? 'Сохранить задачу' : 'Создать задачу'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
