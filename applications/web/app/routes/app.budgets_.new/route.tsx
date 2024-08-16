import { CheckIcon } from '@heroicons/react/24/outline';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect, useFetcher, useLoaderData } from '@remix-run/react';
import { type ReactNode, useState } from 'react';

import {
  Badge,
  Button,
  Heading,
  Input,
  InputWithLabel,
  Label,
  TextareaWithLabel,
} from '~/components';
import { getSupabaseServerConnection } from '~/supabase/.server';

type LoaderData = {
  categories: {
    id: string;
    name: string;
    description_en: string;
    label_en: string;
  }[];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { headers, supabase } = getSupabaseServerConnection({ request });
  const { data: categories } = await supabase
    .from('transaction_categories')
    .select('id, name, label_en, description_en');

  return json<LoaderData>({ categories: categories ?? [] }, { headers });
}

export async function action({ request }: ActionFunctionArgs) {
  const { headers, supabase } = getSupabaseServerConnection({ request });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect('/login');

  const formData = await request.formData();

  // TODO: Serialized data submission. This is PAIN
  const categories: {
    amount_cents: number;
    transaction_category_id: string;
  }[] = [];

  for (const [key] of formData.entries()) {
    const match = key.match(/^category\[(\d+)\]\[(\w+)\]$/);

    if (match) {
      const index = match[1];
      const categoryId = formData.get(`category[${index}][id]`);

      if (
        categories.some(
          (category) => category.transaction_category_id === categoryId,
        )
      ) {
        continue;
      }

      const categoryAmount = formData.get(`category[${index}][amount]`);

      categories.push({
        amount_cents: Number(categoryAmount) * 100,
        transaction_category_id: categoryId as string,
      });
    }
  }

  const { error } = await supabase.rpc(
    'create_budget_with_default_categories',
    {
      budget_description: formData.get('description'),
      budget_name: formData.get('name'),
      budget_owner_id: user.id,
      default_categories: categories,
    },
  );

  if (error) {
    return json({ error: error.message }, { status: 500, headers });
  }

  return redirect('/app/budgets', { headers });
}

export default function CreateNewBudgetPage(): ReactNode {
  const { categories = [] } = useLoaderData<LoaderData>();
  const fetcher = useFetcher();

  const [selectedCategories, setSelectedCategories] = useState<
    LoaderData['categories']
  >([]);

  const onCategoryClick = (category: LoaderData['categories'][number]) => {
    const updatedCategories = [...selectedCategories];
    const existingCategory = updatedCategories.find(
      ({ id }) => id === category.id,
    );

    if (existingCategory) {
      return setSelectedCategories(
        updatedCategories.filter(({ id }) => id !== category.id),
      );
    }

    setSelectedCategories([...updatedCategories, category]);
  };

  return (
    <div>
      <Heading className='mb-4' level={1}>
        Create a new budget
      </Heading>
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
        <Label className='mt-4' htmlFor='categories'>
          Selected Categories
        </Label>
        <div className='mt-4'>
          {selectedCategories.length > 0 ? (
            selectedCategories.map(({ id, label_en }, index) => (
              <div className='flex gap-4 mb-4' key={id}>
                <span className='text-sm'>{label_en}</span>
                <Input
                  id={`category[${index}][id]`}
                  name={`category[${index}][id]`}
                  type='hidden'
                  value={id}
                />
                <Input
                  id={`category[${index}][amount]`}
                  min='0'
                  name={`category[${index}][amount]`}
                  step='0.01'
                  type='number'
                />
              </div>
            ))
          ) : (
            <div>No categories selected</div>
          )}
        </div>
        <Label className='mt-4'>Available Categories</Label>
        <div className='flex gap-2 mt-4'>
          {categories?.map((category) => (
            <Badge key={category.id} asChild>
              <button onClick={() => onCategoryClick(category)} type='button'>
                {selectedCategories.find(({ id }) => id === category.id) && (
                  <CheckIcon aria-hidden='true' className='h-3 w-3 mr-1' />
                )}
                {category.label_en}
              </button>
            </Badge>
          ))}
        </div>
        <Button className='mt-4' type='submit'>
          Submit
        </Button>
      </fetcher.Form>
    </div>
  );
}
