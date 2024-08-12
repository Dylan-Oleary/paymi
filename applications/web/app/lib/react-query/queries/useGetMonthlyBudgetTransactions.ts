import { useQuery } from '@tanstack/react-query';
import { TransactionTableProps } from '~/components/transaction-table/transaction-table';
import {
  getSupabaseBrowserClient,
  type SupabaseBrowserClientConfig,
} from '~/supabase';

interface UseGetMonthlyBudgetTransactionsArgs {
  params: {
    monthlyBudgetRecordId: string;
  };
  supabaseConfig: SupabaseBrowserClientConfig;
}

export function useGetMonthlyBudgetTransactions({
  params: { monthlyBudgetRecordId },
  supabaseConfig,
}: UseGetMonthlyBudgetTransactionsArgs) {
  return useQuery({
    queryKey: [`${monthlyBudgetRecordId}-transactions`],
    queryFn: async () => {
      const supabase = getSupabaseBrowserClient(supabaseConfig);
      const result = await supabase
        .from('monthly_budget_transactions')
        .select(
          `*,
        monthly_budget_categories!inner(
          id,
          amount_cents,
          monthly_budget_id,
          transaction_categories (
            id,
            label_en,
            name
          )
        )`,
        )
        .eq(
          'monthly_budget_categories.monthly_budget_id',
          monthlyBudgetRecordId,
        );

      if (result.error) {
        throw new Error(result.error.message);
      }

      const data: TransactionTableProps['data'] = [];

      for (const record of result.data) {
        const transaction: TransactionTableProps['data'][number]['transactions'][number] =
          {
            id: record.id,
            amountCents: record.amount_cents,
            paidById: record.paid_by_id,
            paidTo: record.paid_to,
            note: record.note,
            transactionCategory: {
              id: record.monthly_budget_categories.id,
              label_en:
                record.monthly_budget_categories.transaction_categories
                  .label_en,
            },
          };

        const transactionPaidAtDateTime = new Date(record.paid_at);
        const year = transactionPaidAtDateTime.getFullYear();
        const month = String(transactionPaidAtDateTime.getMonth() + 1).padStart(
          2,
          '0',
        );
        const day = String(transactionPaidAtDateTime.getDate()).padStart(
          2,
          '0',
        );
        const formattedDate = `${year}-${month}-${day}`;

        const existingDateRecordIndex = data.findIndex(
          (dataRecord) => dataRecord.dateTime === formattedDate,
        );

        if (existingDateRecordIndex < 0) {
          data.push({
            dateTime: formattedDate,
            transactions: [transaction],
          });

          continue;
        }

        data[existingDateRecordIndex].transactions.push(transaction);
      }

      return data;
    },
  });
}
