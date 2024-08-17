import { cn, formatCentsToDollars } from '~/utils';

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
  categories?: {
    id: string;
    amount_cents: number;
    category: {
      name: string;
      label_en: string;
      description_en: string;
    };
  }[];
  className?: string;
  description?: string | null;
  id: string;
  title: string;
}

export function BudgetCard({
  categories = [],
  className,
  description,
  id,
  title,
}: BudgetCardProps) {
  return (
    <Link to={`/app/budgets/${id}/${new Date().getFullYear()}/overview`}>
      <Card className={cn('flex flex-col', className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className='flex-1 pb-0'>
          {categories.map((category) => (
            <div key={category.id} className='flex gap-4'>
              <span>{category.category.label_en}</span>
              <span>{formatCentsToDollars(category.amount_cents)}</span>
            </div>
          ))}
        </CardContent>
        <CardFooter className='flex-col gap-2 text-sm'></CardFooter>
      </Card>
    </Link>
  );
}
