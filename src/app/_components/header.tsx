'use client';

import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { BellIcon, CubeIcon } from '@heroicons/react/24/outline';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

export function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="flex w-full items-center justify-between gap-4 border-b border-slate-300 bg-white p-4">
      <div className="flex items-center gap-3">
        <CubeIcon width={34} height={34} />

        <h1 className="text-2xl font-bold text-gray-800">Управление Проектами</h1>
      </div>

      <div className="flex items-center gap-4">
        {isSignedIn ? <SignOutButton /> : <SignInButton />}

        <div className="flex items-center gap-2">
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-slate-300">
            <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center text-slate-500">
              <BellIcon />
            </div>
          </div>
          <Avatar className="h-[32px] w-[32px] border border-slate-300">
            <AvatarImage src="https://avatars.githubusercontent.com/u/103210607?v=4" />
            <AvatarFallback>IK</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
