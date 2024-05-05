'use client';

import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '~/components/ui/button';
import { ProjectTaskDialog } from './project-task-dialog';

interface Props {
  projectId: number;
}

export function CreateProjectTaskDialog(props: Props) {
  const { projectId } = props;

  return (
    <ProjectTaskDialog
      projectId={projectId}
      button={
        <Button className="flex w-fit items-center gap-2">
          <div className="flex h-[18px] w-[18px] shrink-0 content-center items-center">
            <PlusCircleIcon />
          </div>
          
          Добавить проектную задачу
        </Button>
      }
    />
  );
}
