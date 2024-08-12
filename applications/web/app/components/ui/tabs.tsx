import { Link } from '@remix-run/react';
import { cn } from '~/utils';

export interface TabProps {
  className?: string;
  tabs: {
    href: string;
    isActive: boolean;
    label: string;
  }[];
}

export function Tabs({ className, tabs = [] }: TabProps) {
  return (
    <div className={className}>
      <div className='sm:hidden'>
        <label htmlFor='tabs' className='sr-only'>
          Select a tab
        </label>
        <select
          id='tabs'
          className='block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          defaultValue={tabs.find((tab) => tab.isActive)?.label}
          name='tabs'
        >
          {tabs.map((tab) => (
            <option key={tab.label}>{tab.label}</option>
          ))}
        </select>
      </div>
      <div className='hidden sm:block'>
        <nav aria-label='Tabs' className='flex space-x-4'>
          {tabs.map((tab) => (
            <Link
              aria-current={tab.isActive ? 'page' : undefined}
              key={tab.label}
              to={tab.href}
              className={cn(
                tab.isActive
                  ? 'bg-gray-100 text-gray-700'
                  : 'text-gray-500 hover:text-gray-700',
                'rounded-md px-3 py-2 text-sm font-medium',
              )}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
