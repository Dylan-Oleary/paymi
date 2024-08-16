import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getSupabaseBrowserConnection } from '~/supabase';

import type { RQOperationWithSupabase } from '../types';

interface UseDeleteTransactionArgs extends RQOperationWithSupabase {
  params: { monthlyBudgetRecordId: string };
}

export function useDeleteTransaction({
  params: { monthlyBudgetRecordId },
  supabaseOpts,
}: UseDeleteTransactionArgs) {
  const client = useQueryClient();

  return useMutation<unknown, Error, { id: string }>({
    mutationFn: async ({ id }) => {
      const { supabase } = getSupabaseBrowserConnection(supabaseOpts);
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
