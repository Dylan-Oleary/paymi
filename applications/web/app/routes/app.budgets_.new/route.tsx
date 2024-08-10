import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect, useFetcher, useLoaderData } from '@remix-run/react';
import type { ReactNode } from 'react';

import {
  Button,
  Heading,
  InputWithLabel,
  TextareaWithLabel,
} from '~/components';

import { getSupabaseServerClient } from '~/supabase';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const headers = new Headers();
  const supabase = getSupabaseServerClient({ headers, request });
  const { data: categories } = await supabase
    .from('transaction_categories')
    .select('id, name, label_en, description_en');

  return json({ categories: categories ?? [] }, { headers });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const description = formData.get('description');

  const headers = new Headers();
  const supabase = getSupabaseServerClient({ headers, request });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const { data: categories = [] } = await supabase
    .from('transaction_categories')
    .select('id, name, label_en, description_en');
  const { error } = await supabase.rpc(
    'create_budget_with_default_categories',
    {
      budget_description: description,
      budget_name: name,
      budget_owner_id: user.id,
      default_categories: categories?.map((category) => ({
        amount_cents: 10000,
        transaction_category_id: category.id,
      })),
    },
  );

  if (error) {
    return json({ error: error.message }, { status: 500, headers });
  }

  return json({ ok: true }, { headers });
};

export default function CreateNewBudgetPage(): ReactNode {
  const { categories = [] } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <div>
      <Heading className='mb-4' level={1}>
        Create a new budget
      </Heading>
      {categories.map((category) => category.name)}
      <fetcher.Form
        action='/app/budgets/new'
        className='flex flex-col items-start'
        method='POST'
      >
        <InputWithLabel
          className='mt-4'
          id='name'
          label='Name'
          name='name'
          type='text'
        />
        <TextareaWithLabel
          className='mt-4'
          id='description'
          label='Description'
          name='description'
        />
        <Button className='mt-4' type='submit'>
          Submit
        </Button>
      </fetcher.Form>
    </div>
  );
}
