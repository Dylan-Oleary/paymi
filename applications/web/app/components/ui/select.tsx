import type { ReactNode } from 'react';
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

import { labelVariants } from './label';

import { cn } from '~/utils';

export type SelectOption = {
  id: string;
  label: string;
  value: string;
};

export interface SelectProps {
  className?: string;
  disabled?: boolean;
  label: ReactNode;
  onChange: (record: SelectOption) => void;
  options: SelectOption[];
  placeholder?: string;
  selected: SelectOption;
}

export function Select({
  className,
  disabled = false,
  label,
  onChange,
  options = [],
  placeholder = 'Select...',
  selected,
}: SelectProps): ReactNode {
  return (
    <Listbox
      disabled={disabled}
      value={selected}
      onChange={(record) =>
        //@ts-expect-error - Shh!
        onChange(options.find(({ id }) => id === record) ?? options[0])
      }
    >
      <div
        className={cn('grid w-full max-w-sm items-center gap-1.5', className)}
      >
        <Label className={cn(labelVariants())}>{label}</Label>
        <div className='relative'>
          <ListboxButton className='flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300'>
            <span className='block truncate'>
              {selected ? selected.label : placeholder}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                aria-hidden='true'
                className='h-5 w-5 text-gray-400'
              />
            </span>
          </ListboxButton>
          <ListboxOptions
            transition
            className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm'
          >
            {options.map(({ id, label, value }) => (
              <ListboxOption
                key={id}
                className='group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white'
                data-selected={selected?.id === id ? 'true' : undefined}
                value={value}
              >
                <span className='block truncate font-normal group-data-[selected]:font-semibold'>
                  {label}
                </span>

                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden'>
                  <CheckIcon aria-hidden='true' className='h-5 w-5' />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </div>
    </Listbox>
  );
}
