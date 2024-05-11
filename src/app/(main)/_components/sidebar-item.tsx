import Link, { type LinkProps } from 'next/link';
import { type ReactNode } from 'react';
import { cn } from '~/lib/utils';

interface Props {
  active: boolean;
  itemText: string;
  itemIcon: ReactNode;
  href: LinkProps['href'];
  controls?: ReactNode;
}

export function SidebarItem(props: Props) {
  const { itemText, itemIcon, href, active, controls } = props;

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between gap-2 truncate rounded-md border border-slate-200 px-2 py-1 text-gray-500 transition-all duration-200 hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300',
        { ['bg-slate-200']: active }
      )}
    >
      <Link href={href} className="flex w-full items-center gap-2 truncate">
        <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">
          {itemIcon}
        </div>

        <span className="truncate" title={itemText}>
          {itemText}
        </span>
      </Link>

      {controls}
    </div>
  );
}
