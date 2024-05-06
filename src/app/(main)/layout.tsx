import { type ReactNode } from 'react';
import { api } from '~/trpc/server';
import { Sidebar } from './_components/sidebar';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function MainLayout({ children }: { children: ReactNode }) {
  const projects = await api.project.getAll();

  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  return (
    <div className="flex h-full">
      <Sidebar projects={projects} />

      {children}
    </div>
  );
}
