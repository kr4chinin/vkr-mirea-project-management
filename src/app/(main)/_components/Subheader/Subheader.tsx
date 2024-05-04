import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Subheader(props: Props) {
  const { children } = props;

  return <nav className="w-full p-2 border-b border-slate-300">{children}</nav>;
}
