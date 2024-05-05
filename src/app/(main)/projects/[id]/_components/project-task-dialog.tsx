'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Task } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
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
import { Textarea } from '~/components/ui/textarea';
import { api } from '~/trpc/react';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Необходимо указать название задачи' }),
  description: z.string(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

interface Props {
  projectId: number;
  button: ReactNode;
  task?: Task;
}

export function ProjectTaskDialog(props: Props) {
  const { projectId, task, button } = props;

  const router = useRouter();

  const createTask = api.task.createTask.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const updateTask = api.task.updateTask.useMutation({
    onSuccess: () => {
      router.refresh();
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
      });
    } else {
      await createTask.mutateAsync({
        projectId,
        name: values.name,
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
      });
    }

    form.reset();

    setOpened(false);
  };

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>{button}</DialogTrigger>

      <DialogContent className="max-w-[540px]">
        <DialogHeader>
          <DialogTitle>Создайте задачу</DialogTitle>
          <DialogDescription>Создайте задачу в вашем проекте</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
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
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Описание задачи</FormLabel>
                  <FormControl>
                    <Textarea rows={10} placeholder="Введите описание задачи" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={createTask.isPending}>
              {task ? 'Сохранить задачу' : 'Создать задачу'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
