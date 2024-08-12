import { Fragment } from 'react';
import { ArrowPathIcon } from '@heroicons/react/20/solid';

import { formatCentsToDollars } from '~/utils';

export interface TransactionTableProps {
  className?: string;
  data: {
    dateTime: string;
    transactions: {
      id: string;
      amountCents: number;
      paidById: string;
      paidTo: string;
      note: string;
      transactionCategory: {
        id: string;
        label_en: string;
      };
    }[];
  }[];
}

export function TransactionTable({ className, data }: TransactionTableProps) {
  return (
    <div className={className}>
      <div className='mt-6 overflow-hidden border-t border-gray-100'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-none'>
            <table className='w-full text-left'>
              <thead className='sr-only'>
                <tr>
                  <th>Amount</th>
                  <th>Paid To</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {data.map(({ dateTime, transactions = [] }) => (
                  <Fragment key={dateTime}>
                    <tr className='text-sm leading-6 text-gray-900'>
                      <th
                        scope='colgroup'
                        colSpan={3}
                        className='relative isolate py-2 font-semibold'
                      >
                        <time dateTime={dateTime}>{dateTime}</time>
                        <div className='absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50' />
                        <div className='absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50' />
                      </th>
                    </tr>
                    {transactions.map(
                      ({
                        id,
                        amountCents,
                        note,
                        paidTo,
                        transactionCategory,
                      }) => (
                        <tr key={id}>
                          <td className='relative py-5 pr-6'>
                            <div className='flex gap-x-6'>
                              <ArrowPathIcon
                                aria-hidden='true'
                                className='hidden h-6 w-5 flex-none text-gray-400 sm:block'
                              />
                              <div className='flex-auto'>
                                <div className='flex items-start gap-x-3'>
                                  <div className='text-sm font-medium leading-6 text-gray-900'>
                                    {formatCentsToDollars(amountCents)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='absolute bottom-0 right-full h-px w-screen bg-gray-100' />
                            <div className='absolute bottom-0 left-0 h-px w-screen bg-gray-100' />
                          </td>
                          <td className='py-5 pr-6'>
                            <div className='text-sm leading-6 text-gray-900'>
                              {paidTo}
                            </div>
                            <div className='mt-1 text-xs leading-5 text-gray-500'>
                              {note}
                            </div>
                          </td>
                          <td className='py-5 text-right'>
                            <div className='flex justify-end'>
                              <div className='text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500'>
                                {transactionCategory.label_en}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ),
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
