'use client';

import { formatDate } from 'date-fns';

interface Props {
  createdAt: Date;
}

export function ProjectDatesInfoBlock(props: Props) {
  const { createdAt } = props;

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div>Дата создания: {formatDate(createdAt, 'dd.MM.yyyy в HH:mm')}</div>
    </div>
  );
}
