import { TaskStatus } from '@prisma/client';
import { formatDate } from 'date-fns';
import { Badge, type BadgeVariant } from '~/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { H2 } from '~/components/ui/typography/h2';
import { getReadableTaskStatusLabel } from '~/lib/utils';
import { api } from '~/trpc/server';
import { CreateProjectTaskDialog } from './create-project-task-dialog';
import { DeleteTaskButtonWithAlert } from './delete-task-button-with-alert';
import { ProjectTaskDialog } from './project-task-dialog';

interface Props {
  projectId: number;
}

const badgeVariantMap: Record<TaskStatus, BadgeVariant['variant']> = {
  [TaskStatus.CHECKING]: 'default',
  [TaskStatus.DONE]: 'outline',
  [TaskStatus.IN_PROGRESS]: 'default',
  [TaskStatus.PLAN]: 'default',
  [TaskStatus.READY_FOR_WORK]: 'default',
  [TaskStatus.REQUIRES_CORRECTION]: 'destructive',
};

export async function ProjectTasks(props: Props) {
  const { projectId } = props;

  const tasks = await api.task.getAll({ projectId });

  return (
    <div className="flex flex-col gap-4 p-4">
      <H2>Задачи</H2>

      <CreateProjectTaskDialog projectId={projectId} />

      <Table>
        {!tasks.length && <TableCaption>В этом проекте пока нет задач.</TableCaption>}

        <TableHeader>
          <TableRow>
            <TableHead>Название задачи</TableHead>
            <TableHead>Дата начала</TableHead>
            <TableHead>Дата окончания</TableHead>
            <TableHead>Статус</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map(t => (
            <TableRow className="group" key={t.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <ProjectTaskDialog
                    task={t}
                    key={t.id}
                    projectId={projectId}
                    button={<div className="hover:cursor-pointer hover:underline">{t.name}</div>}
                  />

                  <DeleteTaskButtonWithAlert id={t.id} />
                </div>
              </TableCell>
              <TableCell>{t.startDate ? formatDate(t.startDate, 'dd.MM.yyyy') : null}</TableCell>
              <TableCell>{t.endDate ? formatDate(t.endDate, 'dd.MM.yyyy') : null}</TableCell>
              <TableCell>
                <Badge variant={badgeVariantMap[t.status]}>
                  {getReadableTaskStatusLabel(t.status)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
