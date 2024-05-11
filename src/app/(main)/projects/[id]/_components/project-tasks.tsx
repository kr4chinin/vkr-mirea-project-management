import { formatDate } from 'date-fns';
import { api } from '~/trpc/server';
import { CreateProjectTaskDialog } from './create-project-task-dialog';
import { ProjectTaskDialog } from './project-task-dialog';
import { cn } from '~/lib/utils';

interface Props {
  projectId: number;
}

export async function ProjectTasks(props: Props) {
  const { projectId } = props;

  const tasks = await api.task.getAll({ projectId });

  return (
    <div className="flex flex-col gap-4 p-4">
      <CreateProjectTaskDialog projectId={projectId} />

      <div className="flex flex-col gap-4">
        {tasks.map(t => (
          <ProjectTaskDialog
            task={t}
            key={t.id}
            projectId={projectId}
            button={
              <div
                className={cn(
                  'rounded-md border border-slate-300 p-2 text-gray-600 transition-all duration-200 hover:cursor-pointer hover:bg-slate-100 active:bg-slate-200',
                  { 'text-slate-400 line-through': t.isCompleted }
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <p className="text-base font-bold">{t.name}</p>
                  </div>

                  {t.startDate && <div>{formatDate(t.startDate, 'dd.MM.yyyy')}</div>}
                  {t.endDate && <div>{formatDate(t.endDate, 'dd.MM.yyyy')}</div>}
                </div>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
