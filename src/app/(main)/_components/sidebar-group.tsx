'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState, type ReactNode } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
import { cn } from '~/lib/utils';

interface Props {
  groupName: string;
  children: ReactNode;
  groupIcon: ReactNode;
  defaultOpened?: boolean;
  canAddProject?: boolean;
}

export function SidebarGroup(props: Props) {
  const { groupName, children, groupIcon, defaultOpened = false } = props;

  const [isOpened, setIsOpened] = useState(defaultOpened);

  return (
    <Collapsible open={isOpened} className="flex flex-col gap-2" onOpenChange={setIsOpened}>
      <CollapsibleTrigger>
        <div className="flex items-center justify-between gap-2 pl-2 text-slate-500">
          <div className="flex items-center gap-2">
            <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center">
              {groupIcon}
            </div>

            <p className="text-bold pt-[2px] text-base font-bold">{groupName}</p>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={cn(
                'flex h-[16px] w-[16px] shrink-0 content-center items-center transition-all duration-200',
                {
                  'rotate-180': isOpened,
                }
              )}
            >
              <ChevronDownIcon strokeWidth={2} />
            </div>
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="flex flex-col gap-2">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
