import { PlusCircleIcon } from '@heroicons/react/24/outline';
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

export function AddProjectDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <div className="flex h-[18px] w-[18px] shrink-0 content-center items-center">
            <PlusCircleIcon />
          </div>
          Добавить проект
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[540px]">
        <DialogHeader>
          <DialogTitle>Создайте проект</DialogTitle>
          <DialogDescription>Пожалуйста, введите название проекта</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 py-4" onSubmit={e => e.preventDefault()}>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="name">Название проекта</Label>
            <Input id="name" className="col-span-3" />
          </div>
        </form>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
