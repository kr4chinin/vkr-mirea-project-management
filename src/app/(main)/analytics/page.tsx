import { H2 } from '~/components/ui/typography/h2';
import { AnalyticsHighlights } from './_components/analytics-highlights';
import { OverdueProjects } from './_components/overdue-projects';
import { UsersBreakdown } from './_components/users-breakdown';

export default async function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <H2>Отчеты</H2>

      <AnalyticsHighlights />

      <OverdueProjects />

      <UsersBreakdown />
    </div>
  );
}
