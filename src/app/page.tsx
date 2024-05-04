import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Home(props: Props) {
  const { children } = props;

  return <div className="h-full flex">{children}</div>;
}
