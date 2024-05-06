import { type ReactNode } from 'react';
import { api } from '~/trpc/server';
import { Sidebar } from './_components/sidebar';

export default async function MainLayout({ children }: { children: ReactNode }) {
  const projects = await api.project.getAll();

  return (
    <div className="flex h-full">
      <Sidebar projects={projects} />

      {children}
    </div>
  );
}
