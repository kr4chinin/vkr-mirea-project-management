'use client';

import { useUser } from '@clerk/nextjs';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskStatus, type Task } from '@prisma/client';
import { redirect, useRouter } from 'next/navigation';
import { useState, type ReactNode } from 'react';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Textarea } from '~/components/ui/textarea';
import { AppRoutes, RoutePath } from '~/config/routeConfig';
import { cn, getReadableTaskStatusLabel } from '~/lib/utils';
import { api } from '~/trpc/react';

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
}

export function ProjectTaskDialog(props: Props) {
  const { projectId, task, button } = props;

  const router = useRouter();

  const { user } = useUser();

  const createTask = api.task.createTask.useMutation({
    onSuccess: () => {
      router.refresh();

      toast.success('Задача успешно создана', { icon: '💎' });
    },
  });

  const changeTaskIsCompleteState = api.task.changeTaskIsCompletedState.useMutation({
    onSuccess: () => {
      router.refresh();

      toast.success(
        task?.isCompleted ? 'Задача успешно сделана активной' : 'Задача успешно выполнена',
        {
          icon: task?.isCompleted ? '✅' : '🎉',
        }
      );
    },
  });

  const updateTask = api.task.updateTask.useMutation({
    onSuccess: () => {
      router.refresh();

      toast.success('Задача успешно обновлена', { icon: '✏️' });
    },
  });

  const [opened, setOpened] = useState(false);

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
    if (task) {
      await updateTask.mutateAsync({
        id: task.id,
        name: values.name,
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
        status: values.status,
      });
    } else {
      if (!user) redirect(RoutePath[AppRoutes.SIGN_IN]);

      await createTask.mutateAsync({
        projectId,
        name: values.name,
        createdBy: user.id,
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
        status: values.status,
      });

      form.reset();
    }
  };

  const handleChangeTaskIsCompleteState = async () => {
    if (!task) throw new Error('Task does not exist yet, failed to change isComplete state');

    await handleSubmit(form.getValues());
    await changeTaskIsCompleteState.mutateAsync({ id: task.id, isCompleted: !task.isCompleted });

    setOpened(false);
  };

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>{button}</DialogTrigger>

      <DialogContent className="max-w-[540px]">
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
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Название задачи</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите название задачи" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                name="startDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel>Начало задачи</FormLabel>
                    <FormControl>
                      <DatePicker selected={field.value} onSelect={field.onChange} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="endDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel>Окончание задачи</FormLabel>
                    <FormControl>
                      <DatePicker selected={field.value} onSelect={field.onChange} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Статус задачи</FormLabel>

                  <FormControl>
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
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Описание задачи</FormLabel>
                  <FormControl>
                    <Textarea rows={6} placeholder="Введите описание задачи" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

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
                      <CheckCircleIcon stroke="white" />
                    </div>
                  )}

                  {task.isCompleted ? 'Сделать активной' : 'Завершить задачу'}
                </Button>
              )}

              <Button className="flex-1" type="submit" disabled={createTask.isPending}>
                {task ? 'Сохранить задачу' : 'Создать задачу'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
