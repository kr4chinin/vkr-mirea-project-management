'use client';

import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { BellIcon, CubeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { AppRoutes, RoutePath } from '~/config/routeConfig';

export function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="h-header flex w-full items-center justify-between gap-4 border-b border-slate-300 bg-white p-4">
      <Link
        href={isSignedIn ? RoutePath[AppRoutes.PROJECTS] : RoutePath[AppRoutes.SIGN_IN]}
        className="flex items-center gap-3"
      >
        <CubeIcon width={34} height={34} />

        <h1 className="text-2xl font-bold text-gray-800">Управление Проектами</h1>
      </Link>

      <SignedIn>
        <div className="flex items-center gap-3">
          <UserButton showName />

          <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-slate-300">
            <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center text-slate-500">
              <BellIcon />
            </div>
          </div>
        </div>
      </SignedIn>
    </header>
  );
}
