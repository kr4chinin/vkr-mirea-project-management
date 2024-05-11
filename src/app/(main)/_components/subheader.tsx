import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Subheader(props: Props) {
  const { children } = props;

  return <nav className="w-full truncate border-b border-slate-300 p-2">{children}</nav>;
}
