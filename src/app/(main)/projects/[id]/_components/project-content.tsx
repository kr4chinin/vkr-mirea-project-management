'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Project } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
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
import { UserBlock } from '~/components/ui/user-block';
import { UsersMultiSelect, type UserOptionType } from '~/components/ui/users-multiselect';
import { type ClientUser } from '~/lib/models/ClientUser';
import { api } from '~/trpc/react';
import { ProjectDatesInfoBlock } from './project-dates-info-block';

interface Props {
  project: Project;
  users: ClientUser[];
  creatorLastName: string;
  creatorFirstName: string;
  creatorImageUrl: string;
}

const formSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  participants: z
    .array(
      z.object({
        id: z.string(),
        lastName: z.string().trim(),
        imageUrl: z.string(),
        firstName: z.string().trim(),
      })
    )
    .refine(
      value =>
        value.every((item: UserOptionType) => {
          return item.id && item.lastName && item.imageUrl && item.firstName;
        }),
      { message: 'Неправильный массив участников' }
    ),
});

export function ProjectContent(props: Props) {
  const { users, project, creatorFirstName, creatorLastName, creatorImageUrl } = props;

  const router = useRouter();

  const updateProject = api.project.updateProject.useMutation({
    onSuccess: () => {
      router.refresh();

      toast.success('Проект успешно обновлен', { icon: '✏️' });
    },
  });

  const getDefaultParticipants = () => {
    const result: UserOptionType[] = [];

    ((project.particpantsIds as string[]) ?? []).forEach(participantId => {
      const user = users.find(u => u.id === participantId);

      if (user) {
        result.push({
          id: user.id,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
          firstName: user.firstName,
        });
      }
    });

    return result;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: project.name,
      description: project.description ?? '',
      startDate: project.startDate ?? undefined,
      endDate: project.endDate ?? undefined,
      participants: getDefaultParticipants(),
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values.participants);

    await updateProject.mutateAsync({
      id: project.id,
      name: values.name,
      endDate: values.endDate,
      startDate: values.startDate,
      description: values.description,
      participants: values.participants.map(p => p.id),
    });
  };

  const participantsOptions = users.map<UserOptionType>(u => ({
    id: u.id,
    lastName: u.lastName,
    imageUrl: u.imageUrl,
    firstName: u.firstName,
  }));

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
                  <FormItem className="flex flex-col gap-1 text-sm font-medium">
                    <FormLabel>Создатель проекта</FormLabel>

                    <UserBlock
                      lastName={creatorLastName}
                      imageUrl={creatorImageUrl}
                      firstName={creatorFirstName}
                    />
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

        <FormField
          name="participants"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Выберите участников проекта</FormLabel>
              <UsersMultiSelect selected={field.value} {...field} options={participantsOptions} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-fit" type="submit" disabled={updateProject.isPending}>
          Сохранить изменения
        </Button>
      </form>
    </Form>
  );
}
