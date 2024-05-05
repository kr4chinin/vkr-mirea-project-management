import { MonitoringInfoBlock } from '~/components/ui/monitoring-info-block';
import { api } from '~/trpc/server';

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
        <MonitoringInfoBlock title="Всего задач" value={count} />

        <MonitoringInfoBlock title="Задач завершено" value={completedCount} />

        <MonitoringInfoBlock title="Задач просрочено" value={overdueCount} />

        <MonitoringInfoBlock title="Задач без даты" value={withoutDateCount} />
      </div>
    </div>
  );
}
