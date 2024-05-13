'use client';

import { StarIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { type MouseEventHandler } from 'react';
import { toast } from 'sonner';
import { cn } from '~/lib/utils';
import { api } from '~/trpc/react';

interface Props {
  projectId: number;
  isImportant: boolean;
}

export function ProjectImportantMark(props: Props) {
  const { projectId, isImportant } = props;

  const router = useRouter();

  const updateProject = api.project.updateProject.useMutation({
    onSuccess: () => {
      router.refresh();

      toast.success(isImportant ? 'Проект больше не важен' : 'Проект помечен как важный', {
        icon: isImportant ? '❌' : '⭐️',
      });
    },
  });

  const handleUpdateProject: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();

    updateProject.mutate({ id: projectId, isImportant: !isImportant });
  };

  return (
    <button
      type="button"
      className="justify-cente duration-200r flex h-[16px] w-[16px] shrink-0 items-center hover:cursor-pointer"
      onClick={handleUpdateProject}
    >
      <StarIcon
        width={16}
        height={16}
        fill={isImportant ? 'yellow' : 'none'}
        className={cn('transition-all duration-200', {
          'text-yellow-400': isImportant,
        })}
      />
    </button>
  );
}
