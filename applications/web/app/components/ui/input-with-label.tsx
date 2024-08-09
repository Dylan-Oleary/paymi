import { forwardRef, ReactNode } from 'react';
import { cn } from '~/utils';

import { Input, type InputProps, Label } from '~/components';

export interface InputWithLabelProps extends InputProps {
  inputClassName?: string;
  labelClassName?: string;
  label: ReactNode;
}

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ className, id, inputClassName, label, labelClassName, ...rest }, ref) => {
    return (
      <div
        className={cn('grid w-full max-w-sm items-center gap-1.5', className)}
      >
        <Label className={labelClassName} htmlFor={id}>
          {label}
        </Label>
        <Input className={inputClassName} id={id} ref={ref} {...rest} />
      </div>
    );
  },
);
InputWithLabel.displayName = 'InputWithLabel';
