import type { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '~/utils';

export interface BadgeProps {
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Badge({
  asChild = false,
  className,
  ...rest
}: BadgeProps): ReactNode {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      className={cn(
        'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10',
        className,
      )}
      {...rest}
    />
  );
}
