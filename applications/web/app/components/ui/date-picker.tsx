import type { ReactNode } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import {
  Button,
  Calendar,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components';
import { cn } from '~/utils';
import { DayPickerSingleProps } from 'react-day-picker';

export interface DatePickerProps extends Omit<DayPickerSingleProps, 'mode'> {
  className?: string;
  label: ReactNode;
  onChange: (date?: Date) => void;
  value: Date;
}

export function DatePicker({
  className,
  label,
  onChange,
  value = new Date(),
  ...rest
}: DatePickerProps): ReactNode {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn('grid w-full max-w-sm items-center gap-1.5', className)}
        >
          <Label>{label}</Label>
          <Button
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground',
            )}
            type='button'
            variant='outline'
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {value ? format(value, 'PPP') : <span>Pick a date</span>}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          initialFocus
          mode='single'
          onSelect={(date) => onChange(date)}
          selected={value}
          {...rest}
        />
      </PopoverContent>
    </Popover>
  );
}
