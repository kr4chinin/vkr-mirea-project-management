import { type ReactNode } from 'react';

interface Props {
  groupName: string;
  children: ReactNode;
  groupIcon: ReactNode;
}

export function SidebarGroup(props: Props) {
  const { groupName, children, groupIcon } = props;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 pl-2 text-slate-500">
        <div className="w-[22px] h-[22px] flex items-center justify-center shrink-0">
          {groupIcon}
        </div>

        <p className="text-base text-bold font-bold pt-[2px]">{groupName}</p>
      </div>

      {children}
    </div>
  );
}
