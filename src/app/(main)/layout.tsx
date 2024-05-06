import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { type ReactNode } from 'react';
import { api } from '~/trpc/server';
import { Sidebar } from './_components/sidebar';

export default async function MainLayout({ children }: { children: ReactNode }) {
  const projects = await api.project.getAll();

  const { isSignedIn } = useUser();

  if (isSignedIn) redirect('/sign-in');

  return (
    <div className="flex h-full">
      <Sidebar projects={projects} />

      {children}
    </div>
  );
}
