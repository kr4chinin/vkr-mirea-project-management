import { type ReactNode } from 'react';
import { Sidebar } from './_components/Sidebar/Sidebar';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full flex">
      <Sidebar />

      {children}
    </div>
  );
}
