import { forwardRef, ReactNode } from 'react';
import { cn } from '~/utils';

import { Label, Textarea, type TextareaProps } from '~/components';

export interface TextareaWithLabelProps extends TextareaProps {
  labelClassName?: string;
  label: ReactNode;
  textareaClassName?: string;
}

export const InputWithLabel = forwardRef<
  HTMLTextAreaElement,
  TextareaWithLabelProps
>(
  (
    { className, id, label, labelClassName, textareaClassName, ...rest },
    ref,
  ) => {
    return (
      <div
        className={cn('grid w-full max-w-sm items-center gap-1.5', className)}
      >
        <Label className={labelClassName} htmlFor={id}>
          {label}
        </Label>
        <Textarea className={textareaClassName} id={id} ref={ref} {...rest} />
      </div>
    );
  },
);
InputWithLabel.displayName = 'InputWithLabel';
