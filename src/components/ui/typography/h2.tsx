import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function H2(props: Props) {
  const { children } = props;

  return <h2 className="text-lg font-bold text-gray-800">{children}</h2>;
}
