import { type ReactNode } from 'react';

interface Props {
  groupName: string;
  children: ReactNode;
}

export function SidebarGroup(props: Props) {
  const { groupName, children } = props;

  return (
    <div className="flex flex-col gap-2">
      <div className="pl-2 text-base text-slate-500 text-bold font-bold">{groupName}</div>

      {children}
    </div>
  );
}
