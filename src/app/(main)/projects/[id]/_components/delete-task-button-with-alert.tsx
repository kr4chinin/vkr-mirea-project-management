'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { api } from '~/trpc/react';

interface Props {
  id: number;
}

export function DeleteTaskButtonWithAlert(props: Props) {
  const { id } = props;

  const router = useRouter();

  const [opened, setOpened] = useState(false);

  const deleteTask = api.task.delete.useMutation({
    onSuccess: () => {
      router.refresh();

      setOpened(false);
    },
  });

  const handleApproveDelete = async () => {
    deleteTask.mutate({ id });
  };

  return (
    <AlertDialog open={opened} onOpenChange={setOpened}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="flex h-[16px] w-[16px] shrink-0 items-start justify-center text-transparent transition-all duration-200 hover:text-red-500 active:text-red-600 group-hover:text-slate-400"
          onClick={e => e.stopPropagation()}
        >
          <TrashIcon width={16} height={16} />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent onClick={e => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены, что хотите удалить задачу?</AlertDialogTitle>
          <AlertDialogDescription>Это действие нельзя отменить.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteTask.isPending}
            className="bg-red-500 transition-all duration-200 hover:bg-red-600 active:bg-red-500"
            onClick={handleApproveDelete}
          >
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
