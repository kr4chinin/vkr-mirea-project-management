import { type ReactNode } from 'react';
import { cn } from '~/lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
}

export function H2(props: Props) {
  const { children, className } = props;

  return <h2 className={cn('text-lg font-bold text-gray-800', className)}>{children}</h2>;
}
