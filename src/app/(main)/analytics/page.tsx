import { MonitoringInfoBlock } from '~/components/ui/monitoring-info-block';
import { H2 } from '~/components/ui/typography/h2';
import { api } from '~/trpc/server';

export default async function AnalyticsPage() {
  const { count, completedCount, averageDuration, averageTasksCount } =
    await api.analytics.getProjectsAnalytics();

  return (
    <div className="flex flex-col gap-4 p-4">
      <H2>Отчеты</H2>

      <div className="flex flex-wrap items-center gap-4">
        <MonitoringInfoBlock title="Всего проектов" value={count} />

        <MonitoringInfoBlock title="Завершено проектов" value={completedCount} />

        <MonitoringInfoBlock title="Среднее количество задач" value={averageTasksCount} />

        <MonitoringInfoBlock title="Средний срок проекта (дней)" value={averageDuration} />
      </div>
    </div>
  );
}
