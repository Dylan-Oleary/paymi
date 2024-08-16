import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSupabaseBrowserConnection,
  type SupabaseBrowserClientOpts,
} from '~/supabase';

interface UseCreateNewTransactionsArgs {
  params: { monthlyBudgetRecordId: string };
  supabaseOpts: SupabaseBrowserClientOpts;
}

interface MutationFunctionArgs {
  amountCents: number;
  loggedById: string;
  monthlyBudgetCategoryId: string;
  paidById: string;
  paidAt: string;
  paidTo: string;
  note?: string;
}

export function useCreateNewTransaction({
  params: { monthlyBudgetRecordId },
  supabaseOpts,
}: UseCreateNewTransactionsArgs) {
  const client = useQueryClient();

  return useMutation<unknown, Error, MutationFunctionArgs>({
    mutationFn: async ({
      amountCents,
      paidAt,
      paidById,
      paidTo,
      loggedById,
      monthlyBudgetCategoryId,
      note,
    }) => {
      const { supabase } = getSupabaseBrowserConnection(supabaseOpts);
      const result = await supabase.from('monthly_budget_transactions').insert({
        amount_cents: amountCents,
        paid_at: paidAt,
        paid_by_id: paidById,
        paid_to: paidTo,
        logged_by_id: loggedById,
        monthly_budget_category_id: monthlyBudgetCategoryId,
        note,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result.data;
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [`${monthlyBudgetRecordId}-transactions`],
      });
    },
  });
}
