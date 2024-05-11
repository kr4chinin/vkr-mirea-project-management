import { H2 } from '~/components/ui/typography/h2';
import { AnalyticsHighlights } from './_components/analytics-highlights';
import { OverdueProjects } from './_components/overdue-projects';

export default async function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <H2>Отчеты</H2>

      <AnalyticsHighlights />

      <OverdueProjects />
    </div>
  );
}
