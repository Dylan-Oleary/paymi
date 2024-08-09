import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect, useFetcher, useLoaderData } from '@remix-run/react';
import type { ReactNode } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  InputWithLabel,
} from '~/components';

import { getSupabaseServerClient } from '~/supabase';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const headers = new Headers();
  const supabase = getSupabaseServerClient({ headers, request });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const { data: budgets = [] } = await supabase
    .from('budgets')
    .select()
    .eq('owner_id', user.id);

  return json({ budgets: budgets ?? [] }, { headers });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const description = formData.get('description');

  // TODO – Handle errors
  const hasError = false;
  if (hasError) {
    return json({ errors: [] });
  }

  const headers = new Headers();
  const supabase = getSupabaseServerClient({ headers, request });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  await supabase
    .from('budgets')
    .insert({ name, description, owner_id: user.id });

  return json({ ok: true }, { headers });
};

export default function BudgetsPage(): ReactNode {
  const { budgets = [] } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <div>
      <div className='grid grid-cols-3 gap-4'>
        {budgets.length > 0 ? (
          budgets.map((record) => (
            <Card key={record.id}>
              <CardHeader>
                <CardTitle>{record.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{record.description}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>No budgets found</div>
        )}
      </div>
      <fetcher.Form
        action='/app/budgets'
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
        <InputWithLabel
          className='mt-4'
          id='description'
          label='Description'
          name='description'
          type='text'
        />
        <Button className='mt-4' type='submit'>
          Submit
        </Button>
      </fetcher.Form>
    </div>
  );
}
