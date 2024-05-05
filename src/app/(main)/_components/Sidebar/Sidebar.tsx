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
import { SidebarGroup } from './SidebarGroup';
import { SidebarItem } from './SidebarItem';
import { AddProjectDialog } from '../Project/AddProjectDialog';
import { type Project } from '@prisma/client';
import { useParams, usePathname } from 'next/navigation';

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
    <nav className="flex h-full w-sidebar flex-col gap-2 border-r border-slate-300 p-4">
      <div className="flex h-full flex-col gap-2">
        <AddProjectDialog />

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
              href={`/projects/${p.id}`}
              itemIcon={<Squares2X2Icon />}
              active={p.id === currentProjectId}
            />
          ))}
        </SidebarGroup>

        <SidebarGroup groupName="Завершенные проекты" groupIcon={<CheckCircleIcon />}>
          {finishedProjects.map(p => (
            <SidebarItem
              key={p.id}
              itemText={p.name}
              itemIcon={<CheckIcon />}
              href={`/projects/${p.id}`}
              active={p.id === currentProjectId}
            />
          ))}
        </SidebarGroup>

        <SidebarGroup groupName="Аналитика" groupIcon={<ChartPieIcon />} defaultOpened>
          <SidebarItem
            href="/analytics"
            itemText="Аналитика"
            itemIcon={<ChartBarIcon />}
            active={pathname === '/analytics'}
          />
        </SidebarGroup>
      </div>

      <SidebarItem
        href="/settings"
        itemText="Настройки"
        itemIcon={<AdjustmentsVerticalIcon />}
        active={pathname === '/settings'}
      />
      <SidebarItem
        href="/help"
        itemText="Справка"
        itemIcon={<QuestionMarkCircleIcon />}
        active={pathname === '/help'}
      />
    </nav>
  );
}
