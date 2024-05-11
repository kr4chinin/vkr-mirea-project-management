'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Project } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { DatePicker } from '~/components/ui/date-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Textarea } from '~/components/ui/textarea';
import { api } from '~/trpc/react';
import { ProjectDatesInfoBlock } from './project-dates-info-block';

interface Props {
  project: Project;
  creatorLastName: string;
  creatorFirstName: string;
  creatorImageUrl: string;
}

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export function ProjectContent(props: Props) {
  const { project, creatorFirstName, creatorLastName, creatorImageUrl } = props;

  const router = useRouter();

  const updateProject = api.project.updateProject.useMutation({
    onSuccess: () => {
      router.refresh();

      toast.success('Проект успешно обновлен', { icon: '✏️' });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: project.name,
      description: project.description ?? '',
      startDate: project.startDate ?? undefined,
      endDate: project.endDate ?? undefined,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateProject.mutateAsync({
      id: project.id,
      name: values.name,
      description: values.description,
      startDate: values.startDate,
      endDate: values.endDate,
    });
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4 p-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-4">
          <ProjectDatesInfoBlock createdAt={project.createdAt} />

          <div className="flex gap-4">
            <div className="flex flex-[0.5] flex-col gap-4">
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel>Описание проекта</FormLabel>
                    <FormControl>
                      <Textarea rows={10} placeholder="Введите описание проекта" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-[0.5] flex-col gap-4">
              <FormField
                name="name"
                render={() => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel>Создатель проекта</FormLabel>

                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={creatorImageUrl} />
                        <AvatarFallback>
                          {creatorFirstName[0]}
                          {creatorLastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      {creatorFirstName} {creatorLastName}
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                name="startDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel>Начало проекта</FormLabel>
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
                    <FormLabel>Окончание проекта</FormLabel>
                    <FormControl>
                      <DatePicker selected={field.value} onSelect={field.onChange} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button className="w-fit" type="submit" disabled={updateProject.isPending}>
          Сохранить изменения
        </Button>
      </form>
    </Form>
  );
}
