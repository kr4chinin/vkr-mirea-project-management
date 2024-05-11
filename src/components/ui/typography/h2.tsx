import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '~/lib/utils';

interface Props extends Omit<HTMLAttributes<HTMLHeadingElement>, 'className'> {
  children: ReactNode;
  className?: string;
}

export function H2(props: Props) {
  const { children, className, ...rest } = props;

  return (
    <h2 className={cn('text-xl font-bold text-gray-800', className)} {...rest}>
      {children}
    </h2>
  );
}
