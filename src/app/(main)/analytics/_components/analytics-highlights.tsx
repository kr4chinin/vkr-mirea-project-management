import { MonitoringInfoBlock } from '~/components/ui/monitoring-info-block';
import { api } from '~/trpc/server';

export async function AnalyticsHighlights() {
  const { count, completedCount, averageDuration, averageTasksCount } =
    await api.analytics.getProjectsAnalytics();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <MonitoringInfoBlock title="Всего проектов" value={count} />

      <MonitoringInfoBlock title="Завершено проектов" value={completedCount} />

      <MonitoringInfoBlock title="Среднее количество задач" value={averageTasksCount} />

      <MonitoringInfoBlock title="Средний срок проекта (дней)" value={averageDuration} />
    </div>
  );
}
