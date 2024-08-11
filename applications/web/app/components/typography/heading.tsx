import type { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/utils';

const headingVariant = cva('font-bold leading-tight', {
  defaultVariants: {
    level: 1,
  },
  variants: {
    level: {
      1: 'text-4xl md:text-5xl',
      2: 'text-3xl md:text-4xl',
      3: 'text-2xl md:text-3xl',
      4: 'text-xl md:text-2xl',
      5: 'text-lg md:text-xl',
      6: 'text-base md:text-lg',
    },
  },
});

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariant> {
  level: HeadingLevel;
}

export const Heading = ({ className, level, ...rest }: HeadingProps) => {
  const HeadingElement: `h${HeadingLevel}` = `h${level}`;

  return (
    <HeadingElement
      className={cn(headingVariant({ level }), className)}
      {...rest}
    />
  );
};
Heading.displayName = 'Heading';
