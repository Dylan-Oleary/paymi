import type { LoaderFunctionArgs } from '@remix-run/node';
import { json, Link, useLoaderData } from '@remix-run/react';
import type { ReactNode } from 'react';

import { BudgetCard, Button, Heading } from '~/components';
import { authenticatedLoader } from '~/server';

export async function loader(args: LoaderFunctionArgs) {
  return authenticatedLoader(args, async ({ headers, supabase, user }) => {
    const { data: budgets = [] } = await supabase
      .from('budgets')
      .select(
        `
      id,
      name,
      description,
      owner_id,
      category_defaults:budget_default_categories (
        id,
        amount_cents,
        category:transaction_categories (
          name,
          label_en,
          description_en
        )
      )
      `,
      )
      .eq('owner_id', user.id);

    return json({ budgets: budgets ?? [] }, { headers });
  });
}

export default function BudgetsPage(): ReactNode {
  const { budgets = [] } = useLoaderData<typeof loader>();

  return (
    <div>
      <Heading className='mb-4' level={1}>
        Budgets
      </Heading>
      <div className='grid grid-cols-4 gap-4'>
        {budgets.length > 0 ? (
          budgets.map(({ category_defaults, description, id, name }) => (
            <BudgetCard
              key={id}
              //@ts-expect-error: Fix when applying types from Supabase
              categories={category_defaults}
              description={description}
              id={id}
              title={name}
            />
          ))
        ) : (
          <div>No budgets found</div>
        )}
      </div>
      <Button asChild className='mt-4'>
        <Link to='/app/budgets/new'>Create new budget</Link>
      </Button>
    </div>
  );
}
