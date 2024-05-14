'use client';

import { differenceInDays, formatDate } from 'date-fns';

interface Props {
  createdAt: Date;
}

export function ProjectDatesInfoBlock(props: Props) {
  const { createdAt } = props;

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <p>
        Дата создания:{' '}
        <span className="font-medium">{formatDate(createdAt, 'dd.MM.yyyy в HH:mm')}</span>
      </p>

      <p>
        Проект в работе (дней):{' '}
        <span className="font-medium">{differenceInDays(createdAt, new Date()) + 1}</span>
      </p>
    </div>
  );
}
