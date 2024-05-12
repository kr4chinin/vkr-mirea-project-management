import { TaskStatus } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This is used to temporarily suppress default props warning in public packages until maintainers fix it
export function suppressDefaultPropsWarning() {
  const error = console.error;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error = (...args: any[]) => {
    if (args[0] && typeof args[0] === 'string' && /defaultProps/.test(args[0])) return;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    error(...args);
  };
}

export const getReadableTaskStatusLabel = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.CHECKING:
      return 'На проверке';
    case TaskStatus.IN_PROGRESS:
      return 'В процессе';
    case TaskStatus.DONE:
      return 'Завершена';
    case TaskStatus.READY_FOR_WORK:
      return 'Готова к выполнению';
    case TaskStatus.PLAN:
      return 'Запланирована';
    case TaskStatus.REQUIRES_CORRECTION:
      return 'Требуются исправления';
  }
};
