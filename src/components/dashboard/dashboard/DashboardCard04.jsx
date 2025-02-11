import React from 'react';
import BarChart from '../charts/BarChart01';
import { tailwindConfig } from '../../../utils/Utils';

function DashboardCard04() {
  const chartData = {
    labels: [
      'يناير 2024',
      'فبراير 2024',
      'مارس 2024',
      'أبريل 2024',
      'مايو 2024',
      'يونيو 2024',
    ],
    datasets: [
      {
        label: 'القضايا الجنائية',
        data: [500, 700, 800, 600, 900, 1100], // بيانات تمثل القضايا الجنائية
        backgroundColor: tailwindConfig().theme.colors.red[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.red[600],
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      {
        label: 'القضايا المدنية',
        data: [3000, 2500, 2800, 3500, 3700, 3900], // بيانات تمثل القضايا المدنية
        backgroundColor: tailwindConfig().theme.colors.blue[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[600],
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="bg-gray-100 dark:bg-gradient-night shadow rounded-lg p-4 col-span-full sm:col-span-6 xl:col-span-1 flex flex-col">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          مقارنة القضايا الجنائية والقضايا المدنية
        </h2>
      </header>
      <div className="px-5 py-3">
        {typeof window !== 'undefined' && (
          <BarChart data={chartData} width={595} height={248} />
        )}
      </div>
    </div>
  );
}

export default DashboardCard04;
