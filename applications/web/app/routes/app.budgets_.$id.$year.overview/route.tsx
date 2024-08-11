import { type LoaderFunctionArgs } from '@remix-run/node';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return null;
};

export default function YearlyBudgetOverviewPage() {
  return <div>Overview</div>;
}
