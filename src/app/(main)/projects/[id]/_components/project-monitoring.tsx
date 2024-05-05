import { api } from '~/trpc/server';
import { ProjectMonitoringInfoBlock } from './project-monitoring-info-block';

interface Props {
  projectId: number;
}

export async function ProjectMonitoring(props: Props) {
  const { projectId } = props;

  const { count, completedCount, overdueCount, withoutDateCount } =
    await api.analytics.getProjectMonitoringStats({ projectId });

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-wrap items-center gap-4">
        <ProjectMonitoringInfoBlock title="Всего задач" value={count} />

        <ProjectMonitoringInfoBlock title="Задач завершено" value={completedCount} />

        <ProjectMonitoringInfoBlock title="Задач просрочено" value={overdueCount} />

        <ProjectMonitoringInfoBlock title="Задач без даты" value={withoutDateCount} />
      </div>
    </div>
  );
}
