import { MonitoringInfoBlock } from '~/components/ui/monitoring-info-block';
import { api } from '~/trpc/server';
import { ProjectTasksBurndown } from './project-tasks-burndown';
import { H3 } from '~/components/ui/typography/h3';
import { H2 } from '~/components/ui/typography/h2';

interface Props {
  projectId: number;
}

export async function ProjectMonitoring(props: Props) {
  const { projectId } = props;

  const { count, completedCount, overdueCount, withoutDateCount } =
    await api.analytics.getProjectMonitoringStats({ projectId });

  const tasksBurndown = await api.analytics.getProjectTasksBurndown({
    projectId,
    toDate: new Date(2024, 9, 31),
    fromDate: new Date(2024, 4, 1),
  });

  return (
    <div className="flex flex-col gap-6 p-4">
      <H2>Мониторинг</H2>

      <div className="flex flex-wrap items-center gap-4">
        <MonitoringInfoBlock title="Всего задач" value={count} />

        <MonitoringInfoBlock title="Задач завершено" value={completedCount} />

        <MonitoringInfoBlock title="Задач просрочено" value={overdueCount} />

        <MonitoringInfoBlock title="Задач без даты" value={withoutDateCount} />
      </div>

      <H3>График сгорания задач</H3>

      <ProjectTasksBurndown data={tasksBurndown} />
    </div>
  );
}
