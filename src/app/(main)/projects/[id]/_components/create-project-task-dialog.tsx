'use client';

import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '~/components/ui/button';
import { ProjectTaskDialog } from './project-task-dialog';
import { type Task } from '@prisma/client';
import { type Dispatch, type SetStateAction } from 'react';

interface Props {
  projectId: number;
  setProjectTasks: Dispatch<SetStateAction<Task[]>>;
}

export function CreateProjectTaskDialog(props: Props) {
  const { projectId, setProjectTasks } = props;

  return (
    <ProjectTaskDialog
      projectId={projectId}
      button={
        <Button className="flex w-fit items-center gap-2">
          <div className="flex h-[18px] w-[18px] shrink-0 content-center items-center">
            <PlusCircleIcon width={18} height={18} />
          </div>
          Добавить проектную задачу
        </Button>
      }
      setProjectTasks={setProjectTasks}
    />
  );
}
