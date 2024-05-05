import Link, { type LinkProps } from 'next/link';
import { type ReactNode } from 'react';
import { cn } from '~/lib/utils';

interface Props {
  active: boolean;
  itemText: string;
  itemIcon: ReactNode;
  href: LinkProps['href'];
}

export function SidebarItem(props: Props) {
  const { itemText, itemIcon, href, active } = props;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1 text-gray-500 transition-all duration-200 hover:bg-slate-200 active:bg-slate-300',
        { ['bg-slate-200']: active }
      )}
    >
      <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">{itemIcon}</div>

      {itemText}
    </Link>
  );
}
