import { type ReactNode } from 'react';
import { Sidebar } from './_components/Sidebar/Sidebar';
import { api } from '~/trpc/server';

export default async function MainLayout({ children }: { children: ReactNode }) {
  const projects = await api.project.getAll();

  return (
    <div className="flex h-full">
      <Sidebar projects={projects} />

      {children}
    </div>
  );
}
