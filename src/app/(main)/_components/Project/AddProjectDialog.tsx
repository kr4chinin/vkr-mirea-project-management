'use client';

import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState, type ChangeEvent } from 'react';
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
import { api } from '~/trpc/react';

export function AddProjectDialog() {
  const router = useRouter();
  const [name, setName] = useState('');

  const [opened, setOpened] = useState(false);

  const createProject = api.project.create.useMutation({
    onSuccess: () => {
      setName('');
      router.refresh();
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createProject.mutateAsync({ name });

    setOpened(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <div className="flex h-[18px] w-[18px] shrink-0 content-center items-center">
            <PlusCircleIcon />
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
  );
}
