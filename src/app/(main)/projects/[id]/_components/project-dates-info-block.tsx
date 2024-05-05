'use client';

import dayjs from 'dayjs';

interface Props {
  createdAt: Date;
}

export function ProjectDatesInfoBlock(props: Props) {
  const { createdAt } = props;

  return (
    <div className="flex items-center  justify-between gap-2">
      <div>Дата создания: {dayjs(createdAt).format('DD.MM.YYYY')}</div>
    </div>
  );
}
