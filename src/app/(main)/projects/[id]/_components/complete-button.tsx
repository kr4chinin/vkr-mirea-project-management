'use client';

import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { api } from '~/trpc/react';

interface Props {
  id: number;
  isCompleted: boolean;
}

export function CompleteButton(props: Props) {
  const { id, isCompleted } = props;

  const router = useRouter();

  const updateProjectCompleteStatus = api.project.updateProjectCompleteStatus.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleClick = () => {
    updateProjectCompleteStatus.mutate({ id, isCompleted: !isCompleted });
  };

  return (
    <Button variant={isCompleted ? 'outline' : undefined} onClick={handleClick}>
      {isCompleted ? 'Сделать активным' : 'Завершить проект'}
    </Button>
  );
}
