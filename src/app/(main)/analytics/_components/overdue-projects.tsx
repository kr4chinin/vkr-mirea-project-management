import { Squares2X2Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { H3 } from '~/components/ui/typography/h3';
import { AppRoutes, DynamicRoutePath } from '~/config/routeConfig';
import { api } from '~/trpc/server';

export async function OverdueProjects() {
  const overdueProjects = await api.project.getOverdueProjects();

  return (
    <div className="flex flex-col gap-4">
      <H3>Проекты, отстающие от графика</H3>

      <div className="flex flex-wrap items-center gap-4">
        {overdueProjects.length > 0
          ? overdueProjects.map(p => (
              <Link
                key={p.id}
                href={DynamicRoutePath[AppRoutes.PROJECTS](p.id)}
                className="flex w-fit items-center gap-2 rounded-md border border-slate-400 px-2 py-1 transition-all duration-200 hover:bg-slate-100"
              >
                <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                  <Squares2X2Icon />
                </div>

                {p.name}
              </Link>
            ))
          : 'Все проекты идут по графику ✨'}
      </div>
    </div>
  );
}
