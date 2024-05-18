'use client';

import { CalendarIcon } from '@radix-ui/react-icons';
import { formatDate } from 'date-fns';
import { cn } from '~/lib/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface Props {
  selected?: Date;
  onSelect: (date?: Date) => void;
}

export function DatePicker(props: Props) {
  const { selected, onSelect } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !selected && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />

          {selected ? formatDate(selected, 'dd.MM.yyyy') : <span>Выберите дату</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={selected} onSelect={onSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
