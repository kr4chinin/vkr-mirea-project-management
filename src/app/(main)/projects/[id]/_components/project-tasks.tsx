import { H2 } from '~/components/ui/typography/h2';
import { api } from '~/trpc/server';
import { CreateProjectTaskDialog } from './create-project-task-dialog';
import { ProjectTasksTable } from './project-tasks-table';

interface Props {
  projectId: number;
}

export async function ProjectTasks(props: Props) {
  const { projectId } = props;

  const tasks = await api.task.getAll({ projectId });

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <H2>Задачи</H2>

      <CreateProjectTaskDialog projectId={projectId} />

      <ProjectTasksTable tasks={tasks} projectId={projectId} />
    </div>
  );
}
