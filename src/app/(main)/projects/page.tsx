import { TableCellsIcon } from '@heroicons/react/24/outline';

export default function ProjectHomePage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 pb-24">
      <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center text-slate-300">
        <TableCellsIcon width={48} height={48} strokeWidth={1} />
      </div>

      <p className="text-lg font-medium text-slate-500">
        Выберите или создайте проект для начала работы
      </p>
    </div>
  );
}
