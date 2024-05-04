import Link, { type LinkProps } from 'next/link';
import { type ReactNode } from 'react';

interface Props {
  itemText: string;
  itemIcon: ReactNode;
  href: LinkProps['href'];
}

export function SidebarItem(props: Props) {
  const { itemText, itemIcon, href } = props;

  return (
    <Link
      href={href}
      className="flex gap-2 items-center px-2 py-1 border text-gray-500 border-slate-200 rounded-md duration-200 hover:bg-slate-200 active:bg-slate-300"
    >
      <div className="w-[18px] h-[18px] flex items-center justify-center shrink-0">{itemIcon}</div>

      {itemText}
    </Link>
  );
}
