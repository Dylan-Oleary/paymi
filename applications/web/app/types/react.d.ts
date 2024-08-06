import type { ReactNode } from 'react';

declare module 'react' {
  type ComponentWithChildren<T extends Record<string, unknown> = object> = T & {
    children?: ReactNode;
  };
}
