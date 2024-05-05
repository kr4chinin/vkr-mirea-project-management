import { api } from '~/trpc/server';
import { CreateProjectTaskDialog } from './create-project-task-dialog';
import { formatDate } from 'date-fns';

interface Props {
  projectId: number;
}

export async function ProjectTasks(props: Props) {
  const { projectId } = props;

  const tasks = await api.task.getAll({ projectId });

  return (
    <div className="p-4 flex flex-col gap-4">
      <CreateProjectTaskDialog projectId={projectId} />

      <div className="flex flex-col gap-4">
        {tasks.map(task => (
          <div key={task.id} className="rounded-md border border-slate-300 p-2 text-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="text-base font-bold">{task.name}</p>
              </div>

              {task.startDate && <div>{formatDate(task.startDate, 'dd.MM.yyyy')}</div>}
              {task.endDate && <div>{formatDate(task.endDate, 'dd.MM.yyyy')}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
