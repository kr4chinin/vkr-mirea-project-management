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

export function Sidebar() {
  const activeProjects = [
    {
      name: 'Активный проект 1',
      href: '/projects/1',
    },
    {
      name: 'Активный проект 2',
      href: '/projects/2',
    },
    {
      name: 'Активный проект 3',
      href: '/projects/3',
    },
    {
      name: 'Активный проект 4',
      href: '/projects/4',
    },
  ];

  const finishedProjects = [
    {
      name: 'Завершенный проект 1',
      href: '/projects/5',
    },
    {
      name: 'Завершенный проект 2',
      href: '/projects/6',
    },
  ];

  return (
    <nav className="flex h-full w-sidebar flex-col gap-2 border-r border-slate-300 p-4">
      <div className="flex h-full flex-col gap-2">
        <SidebarGroup groupName="Активные проекты" groupIcon={<PuzzlePieceIcon />} defaultOpened>
          {activeProjects.map(p => (
            <SidebarItem
              key={p.href}
              href={p.href}
              itemText={p.name}
              itemIcon={<Squares2X2Icon />}
            />
          ))}
        </SidebarGroup>

        <SidebarGroup groupName="Завершенные проекты" groupIcon={<CheckCircleIcon />}>
          {finishedProjects.map(p => (
            <SidebarItem key={p.href} href={p.href} itemText={p.name} itemIcon={<CheckIcon />} />
          ))}
        </SidebarGroup>

        <SidebarGroup groupName="Аналитика" groupIcon={<ChartPieIcon />} defaultOpened>
          <SidebarItem href="/analytics" itemText="Аналитика" itemIcon={<ChartBarIcon />} />
        </SidebarGroup>
      </div>

      <SidebarItem href="/settings" itemText="Настройки" itemIcon={<AdjustmentsVerticalIcon />} />
      <SidebarItem href="/help" itemText="Справка" itemIcon={<QuestionMarkCircleIcon />} />
    </nav>
  );
}
