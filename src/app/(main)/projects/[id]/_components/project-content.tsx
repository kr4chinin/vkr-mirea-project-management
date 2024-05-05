'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Project } from '@prisma/client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Textarea } from '~/components/ui/textarea';
import { ProjectDatesInfoBlock } from './project-dates-info-block';
import { api } from '~/trpc/react';
import { useRouter } from 'next/navigation';
import { DatePicker } from '~/components/ui/date-picker';

interface Props {
  project: Project;
}

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});

export function ProjectContent(props: Props) {
  const { project } = props;

  const router = useRouter();

  const updateProject = api.project.updateProject.useMutation({
    onSuccess: () => {
      router.refresh();
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

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    updateProject.mutate({
      id: project.id,
      name: project.name,
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

        <Button type="submit">Сохранить изменения</Button>
      </form>
    </Form>
  );
}
