'use client';

import { CubeIcon } from '@heroicons/react/24/outline';

export function Header() {
  return (
    <header className="fixed top-0 w-full p-4 bg-white border-b border-slate-300">
      <div className="flex items-center gap-3">
        <CubeIcon width={34} height={34} />

        <h1 className="text-2xl font-bold text-gray-800">Управление Проектами</h1>
      </div>
    </header>
  );
}
