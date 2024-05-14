'use client';

import { Check, ChevronsUpDown, X } from 'lucide-react';
import { forwardRef, useState, type Dispatch, type SetStateAction } from 'react';
import { cn } from '~/lib/utils';
import { Badge } from './badge';
import { Button } from './button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { UserBlock } from './user-block';

export type UserOptionType = Record<'id' | 'imageUrl' | 'firstName' | 'lastName', string>;

interface UsersMultiSelectProps {
  options: UserOptionType[];
  selected: UserOptionType[];
  onChange: Dispatch<SetStateAction<UserOptionType[]>>;
  className?: string;
  placeholder?: string;
}

// https://github.com/shadcn-ui/ui/issues/66
const UsersMultiSelect = forwardRef<HTMLButtonElement, UsersMultiSelectProps>(
  ({ options, selected, onChange, className, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    const handleUnselect = (item: UserOptionType) => {
      onChange(selected.filter(i => i.id !== item.id));
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className={className}>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`group h-10 w-fit min-w-80 justify-between`}
            onClick={() => setOpen(!open)}
          >
            <div className="flex flex-wrap items-center gap-1">
              {selected.map(i => (
                <Badge
                  key={i.id}
                  variant="outline"
                  className="flex items-center gap-1 group-hover:bg-background"
                >
                  <UserBlock lastName={i.lastName} imageUrl={i.imageUrl} firstName={i.firstName} />

                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="border-none"
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        handleUnselect(i);
                      }
                    }}
                    onMouseDown={e => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleUnselect(i);
                    }}
                  >
                    <X className="h-[16px] w-[16px] text-muted-foreground hover:text-foreground" />
                  </Button>
                </Badge>
              ))}
              {selected.length === 0 && (
                <span className="font-normal text-muted-foreground">
                  {props.placeholder ?? 'Выбрать пользователей'}
                </span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 flex h-[16px] w-[16px] shrink-0 items-center justify-center opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-80 p-0">
          <Command className={className}>
            <CommandInput placeholder="Найти пользователя" />
            <CommandEmpty>Ничего не найдено</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map(option => (
                <CommandItem
                  key={option.id}
                  onSelect={() => {
                    onChange(
                      selected.some(item => item.id === option.id)
                        ? selected.filter(item => item.id !== option.id)
                        : [...selected, option]
                    );
                    setOpen(true);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selected.some(item => item.id === option.id) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <UserBlock
                    lastName={option.lastName}
                    imageUrl={option.imageUrl}
                    firstName={option.firstName}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

UsersMultiSelect.displayName = 'UsersMultiSelect';

export { UsersMultiSelect };
