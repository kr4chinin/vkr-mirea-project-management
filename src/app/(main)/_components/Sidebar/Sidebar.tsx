import { SidebarItem } from './SidebarItem';

export function Sidebar() {
  const projects = [
    {
      name: 'Project 1',
      href: '/projects/1',
    },
    {
      name: 'Project 2',
      href: '/projects/2',
    },
    {
      name: 'Project 3',
      href: '/projects/3',
    },
    {
      name: 'Project 4',
      href: '/projects/4',
    },
  ];

  return (
    <nav className="h-full flex flex-col gap-2 w-sidebar p-4 border-r border-slate-300">
      {projects.map(p => (
        <SidebarItem key={p.href} href={p.href}>
          {p.name}
        </SidebarItem>
      ))}

      <SidebarItem href="/analytics">Analytics</SidebarItem>
    </nav>
  );
}
