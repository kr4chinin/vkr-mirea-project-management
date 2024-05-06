import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function AuthLayout(props: Props) {
  const { children } = props;

  return <div className="flex h-full w-full items-center justify-center">{children}</div>;
}
