import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'paymi' },
    { name: 'description', content: "Yeah, it's a stupid name" },
  ];
};

export default function IndexPage() {
  return <div className='font-sans p-4'>paymi</div>;
}
