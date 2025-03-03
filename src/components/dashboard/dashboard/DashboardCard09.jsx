import React from 'react';
import Tooltip from '../../common/Tooltip';
import BarChart from '../charts/BarChart02';

import { tailwindConfig } from '../../../utils/Utils';

function DashboardCard09() {
  const chartData = {
    labels: [
      '12-01-2022',
      '01-01-2023',
      '02-01-2023',
      '03-01-2023',
      '04-01-2023',
      '05-01-2023',
    ],
    datasets: [
      {
        label: 'المبيعات',
        data: [6200, 9200, 6600, 8800, 5200, 9200],
        backgroundColor: tailwindConfig().theme.colors.violet[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.violet[600],
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      {
        label: 'المرتجعات',
        data: [-4000, -2600, -5350, -4000, -7500, -2000],
        backgroundColor: tailwindConfig().theme.colors.violet[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.violet[300],
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="bg-gray-200 dark:bg-gradient-night shadow-sm rounded-xl p-5 col-span-full sm:col-span-6 xl:col-span-4 flex flex-col">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          المبيعات مقابل المرتجعات
        </h2>
        <Tooltip className="ml-2" size="lg">
          <div className="text-sm">
            هذا الرسم البياني يوضح مقارنة بين المبيعات والمرتجعات خلال الفترة
            المحددة.
          </div>
        </Tooltip>
      </header>
      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 ml-2">
            +6,796 ريال
          </div>
          <div className="text-sm font-medium text-red-700 px-1.5 bg-red-500/20 rounded-full">
            -34%
          </div>
        </div>
      </div>
      {}
      <div className="grow">
        {}
        <BarChart data={chartData} width={595} height={248} />
      </div>
    </div>
  );
}

export default DashboardCard09;
