import React from 'react';

import Image01 from '../../../../images/user-36-05.jpg';
import Image02 from '../../../../images/user-36-06.jpg';
import Image03 from '../../../../images/user-36-07.jpg';
import Image04 from '../../../../images/user-36-08.jpg';
import Image05 from '../../../../images/user-36-09.jpg';

function DashboardCard10() {
  const customers = [
    {
      id: '0',
      image: Image01,
      name: 'أحمد الشاطي',
      email: 'ahmad.shati@gmail.com',
      location: '🇸🇦',
      spent: '10,850 ريال',
    },
    {
      id: '1',
      image: Image02,
      name: 'خالد الهادي',
      email: 'khalid.hadi@gmail.com',
      location: '🇪🇬',
      spent: '8,500 ريال',
    },
    {
      id: '2',
      image: Image03,
      name: 'محمد الفيصلي',
      email: 'mohammad.faysali@gmail.com',
      location: '🇦🇪',
      spent: '12,000 ريال',
    },
    {
      id: '3',
      image: Image04,
      name: 'منى السعيد',
      email: 'mona.saeed@cool.design',
      location: '🇶🇦',
      spent: '7,250 ريال',
    },
    {
      id: '4',
      image: Image05,
      name: 'عبدالله الطويل',
      email: 'abdullah.long@gmail.com',
      location: '🇧🇭',
      spent: '9,600 ريال',
    },
  ];

  return (
    <div className='col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl'>
      <header className='px-5 py-4 border-b border-gray-100 dark:border-gray-700/60'>
        <h2 className='font-semibold text-gray-800 dark:text-gray-100'>
          العملاء
        </h2>
      </header>
      <div className='p-3'>
        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='table-auto w-full'>
            {/* Table header */}
            <thead className='text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50'>
              <tr>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-right'>الاسم</div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-right'>
                    البريد الإلكتروني
                  </div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-right'>المبلغ المنفق</div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'>الدولة</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className='text-sm divide-y divide-gray-100 dark:divide-gray-700/60'>
              {customers.map(customer => {
                return (
                  <tr key={customer.id}>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='w-10 h-10 shrink-0 ml-2 sm:ml-3'>
                          <img
                            className='rounded-full'
                            src={customer.image}
                            width='40'
                            height='40'
                            alt={customer.name}
                          />
                        </div>
                        <div className='font-medium text-gray-800 dark:text-gray-100'>
                          {customer.name}
                        </div>
                      </div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-right'>{customer.email}</div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-right font-medium text-green-500'>
                        {customer.spent}
                      </div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-lg text-center'>
                        {customer.location}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard10;
