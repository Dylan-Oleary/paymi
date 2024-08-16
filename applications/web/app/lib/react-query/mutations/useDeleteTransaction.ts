import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSupabaseBrowserClient,
  type SupabaseBrowserClientConfig,
} from '~/supabase';

interface UseDeleteTransactionArgs {
  params: { monthlyBudgetRecordId: string };
  supabaseConfig: SupabaseBrowserClientConfig;
}

export function useDeleteTransaction({
  params: { monthlyBudgetRecordId },
  supabaseConfig,
}: UseDeleteTransactionArgs) {
  const client = useQueryClient();

  return useMutation<unknown, Error, { id: string }>({
    mutationFn: async ({ id }) => {
      const supabase = getSupabaseBrowserClient(supabaseConfig);
      const result = await supabase
        .from('monthly_budget_transactions')
        .delete()
        .eq('id', id);

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
