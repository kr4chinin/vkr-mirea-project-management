import Link, { type LinkProps } from 'next/link';
import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  href: LinkProps['href'];
}

export function SidebarItem(props: Props) {
  const { children, href } = props;

  return (
    <Link
      href={href}
      className="px-2 py-1 border border-slate-200 rounded-md duration-200 hover:bg-slate-200 active:bg-slate-300"
    >
      {children}
    </Link>
  );
}
