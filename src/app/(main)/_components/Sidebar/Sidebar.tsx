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
    <nav className="h-full flex flex-col gap-2 w-sidebar p-4 border-r border-slate-300">
      <div className="flex flex-col gap-2 h-full">
        <SidebarGroup groupName="Активные проекты" groupIcon={<PuzzlePieceIcon />}>
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

        <SidebarGroup groupName="Аналитика" groupIcon={<ChartPieIcon />}>
          <SidebarItem href="/analytics" itemText="Аналитика" itemIcon={<ChartBarIcon />} />
        </SidebarGroup>
      </div>

      <SidebarItem href="/settings" itemText="Настройки" itemIcon={<AdjustmentsVerticalIcon />} />
      <SidebarItem href="/help" itemText="Справка" itemIcon={<QuestionMarkCircleIcon />} />
    </nav>
  );
}
