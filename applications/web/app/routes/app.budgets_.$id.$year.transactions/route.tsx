import { type LoaderFunctionArgs } from '@remix-run/node';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return null;
};

export default function YearlyBudgetTransactionsPage() {
  return <div>Transactions</div>;
}
