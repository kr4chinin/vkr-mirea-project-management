'use client';

import {
  AdjustmentsVerticalIcon,
  ChartBarIcon,
  ChartPieIcon,
  CheckCircleIcon,
  CheckIcon,
  PuzzlePieceIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { SidebarGroup } from './sidebar-group';
import { SidebarItem } from './sidebar-item';
import { CreateProjectDialog } from './create-project-dialog';
import { type Project } from '@prisma/client';
import { useParams, usePathname } from 'next/navigation';
import { AppRoutes, DynamicRoutePath, RoutePath } from '~/config/routeConfig';
import { ProjectImportantMark } from './project-important-mark';
import { ScrollArea } from '~/components/ui/scroll-area';

interface Props {
  projects: Project[];
}
export function Sidebar(props: Props) {
  const { projects } = props;

  const { id } = useParams();
  const pathname = usePathname();

  const currentProjectId = Number(id);

  const activeProjects = projects.filter(p => !p.isCompleted);
  const finishedProjects = projects.filter(p => p.isCompleted);

  return (
    <nav className="flex h-[calc(100dvh-var(--header-height))] w-sidebar shrink-0 flex-col border-r border-slate-300">
      <div className="w-full px-4 pt-4">
        <CreateProjectDialog />
      </div>

      <ScrollArea className="h-full w-sidebar">
        <div className="flex h-full w-sidebar flex-col gap-2 p-4">
          <div className="flex h-full flex-col gap-2">
            <SidebarGroup
              canAddProject
              defaultOpened
              groupName="Активные проекты"
              groupIcon={<PuzzlePieceIcon />}
            >
              {activeProjects.map(p => (
                <SidebarItem
                  key={p.id}
                  itemText={p.name}
                  itemIcon={<Squares2X2Icon />}
                  active={p.id === currentProjectId}
                  href={DynamicRoutePath[AppRoutes.PROJECTS](p.id)}
                  controls={<ProjectImportantMark projectId={p.id} isImportant={p.isImportant} />}
                />
              ))}
            </SidebarGroup>

            <SidebarGroup
              groupName="Завершенные проекты"
              groupIcon={<CheckCircleIcon />}
              defaultOpened
            >
              {finishedProjects.map(p => (
                <SidebarItem
                  key={p.id}
                  itemText={p.name}
                  itemIcon={<CheckIcon />}
                  active={p.id === currentProjectId}
                  href={DynamicRoutePath[AppRoutes.PROJECTS](p.id)}
                />
              ))}
            </SidebarGroup>

            <SidebarGroup groupName="Аналитика" groupIcon={<ChartPieIcon />} defaultOpened>
              <SidebarItem
                itemText="Аналитика"
                itemIcon={<ChartBarIcon />}
                href={RoutePath[AppRoutes.ANALYTICS]}
                active={pathname === RoutePath[AppRoutes.ANALYTICS]}
              />
            </SidebarGroup>
          </div>

          <hr className="my-2 w-full border-t border-slate-200" />

          <SidebarItem
            itemText="Настройки"
            href={RoutePath[AppRoutes.SETTINGS]}
            itemIcon={<AdjustmentsVerticalIcon />}
            active={pathname === RoutePath[AppRoutes.SETTINGS]}
          />
          <SidebarItem
            itemText="Справка"
            href={RoutePath[AppRoutes.HELP]}
            itemIcon={<QuestionMarkCircleIcon />}
            active={pathname === RoutePath[AppRoutes.HELP]}
          />
        </div>
      </ScrollArea>
    </nav>
  );
}
