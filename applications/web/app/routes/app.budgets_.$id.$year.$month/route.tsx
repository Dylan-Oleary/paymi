import { json, type LoaderFunctionArgs, redirect } from '@remix-run/node';

import { getSupabaseServerConnection } from '~/supabase/.server';

export type MonthlyBudgetLoaderData = {
  monthlyBudget: {
    id: string;
    budget_id: string;
    year: number;
    month: number;
    categories: {
      id: string;
      amount_cents: number;
      category: {
        id: string;
        label_en: string;
      };
    }[];
  };
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { headers, supabase } = getSupabaseServerConnection({ request });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect('/logout');

  const month = parseInt(params.month ?? '0');
  const year = parseInt(params.year ?? '0');

  // Check if monthly budget exists, create one if not
  const result = await supabase
    .from('monthly_budgets')
    .select(
      `id, budget_id, year, month, categories:monthly_budget_categories (id, amount_cents, category:transaction_categories (id, label_en)) `,
    )
    .eq('budget_id', params.id)
    .eq('year', year)
    .eq('month', month)
    .limit(1);

  if (result.error) {
    return json({ error: result.error.message }, { status: 500, headers });
  }

  if (!result.data || result.data.length === 0) {
    const result = await supabase.rpc(
      'create_monthly_budget_with_default_categories',
      { budget_record_id: params.id, month, year },
    );

    if (result.error) {
      return json({ error: result.error.message }, { status: 500, headers });
    }

    const newResult = await supabase
      .from('monthly_budgets')
      .select(
        `id, budget_id, year, month, categories:monthly_budget_categories (id, amount_cents, category:transaction_categories (id, label_en)) `,
      )
      .eq('budget_id', params.id)
      .eq('year', year)
      .eq('month', month)
      .limit(1);

    if (newResult.error) {
      return json({ error: newResult.error.message }, { status: 500, headers });
    }

    return json({ monthlyBudget: newResult.data[0] });
  }

  return json({ monthlyBudget: result.data[0] });
}
