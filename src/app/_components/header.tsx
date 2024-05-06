'use client';

import { SignOutButton, useUser } from '@clerk/nextjs';
import { BellIcon, CubeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';

export function Header() {
  const { isSignedIn, user } = useUser();

  const getAvatarFallback = (): string | null => {
    if (!user) return null;

    const { firstName, lastName, username } = user;

    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`;
    }

    return username;
  };

  const avatarFallback = getAvatarFallback();

  return (
    <header className="flex w-full items-center justify-between gap-4 border-b border-slate-300 bg-white p-4">
      <Link href="/projects" className="flex items-center gap-3">
        <CubeIcon width={34} height={34} />

        <h1 className="text-2xl font-bold text-gray-800">Управление Проектами</h1>
      </Link>

      <div className="flex items-center gap-4">
        {isSignedIn && <SignOutButton redirectUrl="/sign-in" />}

        {user && (
          <div className="flex items-center gap-2">
            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-slate-300">
              <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center text-slate-500">
                <BellIcon />
              </div>
            </div>

            {avatarFallback && (
              <Avatar className="h-[32px] w-[32px] border border-slate-300">
                <Link
                  className="flex h-full w-full items-center justify-center"
                  href="/user-profile"
                >
                  <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                </Link>
              </Avatar>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
