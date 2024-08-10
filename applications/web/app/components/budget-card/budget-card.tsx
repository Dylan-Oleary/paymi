import { cn } from '~/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components';
import { Link } from '@remix-run/react';

export interface BudgetCardProps {
  className?: string;
  description?: string;
  id: string;
  title: string;
}

export function BudgetCard({
  className,
  description,
  id,
  title,
}: BudgetCardProps) {
  return (
    <Link to={`/app/budgets/${id}`}>
      <Card className={cn('flex flex-col', className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className='flex-1 pb-0'>stuff</CardContent>
        <CardFooter className='flex-col gap-2 text-sm'></CardFooter>
      </Card>
    </Link>
  );
}
