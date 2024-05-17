'use client';

import { useUser } from '@clerk/nextjs';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { redirect, useRouter } from 'next/navigation';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type Confetti from 'react-confetti/dist/types/Confetti';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { SizedConfetti } from '~/components/ui/sized-confetti';
import { AppRoutes, RoutePath } from '~/config/route-config';
import { api } from '~/trpc/react';

export function CreateProjectDialog() {
  const router = useRouter();
  const [name, setName] = useState('');

  const { user } = useUser();

  const [opened, setOpened] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const createProject = api.project.create.useMutation({
    onSuccess: () => {
      setName('');
      router.refresh();

      toast.success('Проект успешно создан', { icon: '🎉' });

      setConfetti(true);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) redirect(RoutePath[AppRoutes.SIGN_IN]);

    await createProject.mutateAsync({ name, createdBy: user.id });

    setOpened(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleConfettiComplete = (confetti?: Confetti) => {
    confetti?.reset();

    setConfetti(false);
  };

  return (
    <>
      <Dialog open={opened} onOpenChange={setOpened}>
        <DialogTrigger asChild>
          <Button className="flex w-full items-center gap-2">
            <div className="flex h-[18px] w-[18px] shrink-0 content-center items-center">
              <PlusCircleIcon width={18} height={18} />
            </div>
            Создать проект
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[540px]">
          <DialogHeader>
            <DialogTitle>Создайте проект</DialogTitle>
            <DialogDescription>Пожалуйста, введите название проекта</DialogDescription>
          </DialogHeader>

          <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="name">Название проекта</Label>
              <Input value={name} id="name" className="col-span-3" onChange={handleChange} />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={createProject.isPending}>
                Создать проект
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <SizedConfetti
        recycle={false}
        style={{ pointerEvents: 'none' }}
        numberOfPieces={confetti ? 400 : 0}
        onConfettiComplete={handleConfettiComplete}
      />
    </>
  );
}
