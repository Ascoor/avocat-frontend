import React from 'react';
import DoughnutChart from '../charts/DoughnutChart';

// استيراد الأدوات
import { tailwindConfig } from '../../../utils/Utils';

function DashboardCard06() {
  const chartData = {
    labels: ['القاهرة', 'الإسكندرية', 'المنصورة'],
    datasets: [
      {
        label: 'المدن الأكثر انتشار في مصر',
        data: [50, 30, 20], // توزيع القيم بين المدن
        backgroundColor: [
          '#58a6ed4a', // القاهرة
          '#995df669', // الإسكندرية
          '#6040b4', // المنصورة
        ],
        hoverBackgroundColor: [
          '#ccd3f4', // القاهرة
          '#FF5722', // الإسكندرية
          '#6040b4', // المنصورة
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-gray-100 dark:bg-gradient-night shadow rounded-lg p-4 col-span-full sm:col-span-6 xl:col-span-1 flex flex-col">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          مقارنة انتشار المدن في مصر
        </h2>
      </header>
      {/* الرسم البياني المبني باستخدام Chart.js 3 */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default DashboardCard06;
