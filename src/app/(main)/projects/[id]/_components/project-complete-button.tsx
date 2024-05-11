'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '~/components/ui/button';
import { api } from '~/trpc/react';

interface Props {
  id: number;
  isCompleted: boolean;
}

export function ProjectCompleteButton(props: Props) {
  const { id, isCompleted } = props;

  const router = useRouter();

  const updateProjectCompleteStatus = api.project.updateProjectCompleteStatus.useMutation({
    onSuccess: () => {
      router.refresh();

      toast.success('Статус проекта обновлен', { icon: '✅' });
    },
  });

  const handleClick = () => {
    updateProjectCompleteStatus.mutate({ id, isCompleted: !isCompleted });
  };

  return (
    <Button
      variant={isCompleted ? 'outline' : undefined}
      disabled={updateProjectCompleteStatus.isPending}
      onClick={handleClick}
    >
      {isCompleted ? 'Сделать активным' : 'Завершить проект'}
    </Button>
  );
}
