import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../charts/LineChart01';
import { chartAreaGradient } from '../charts/ChartjsConfig';
import EditMenu from '../../../components/common/DropdownEditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../../utils/Utils';

function DashboardCard01() {
  const chartData = {
    labels: [
      '01-2024',
      '02-2024',
      '03-2024',
      '04-2024',
      '05-2024',
      '06-2024',
      '07-2024',
      '08-2024',
      '09-2024',
      '10-2024',
      '11-2024',
      '12-2024',
      '01-2025',
    ],
    datasets: [
      {
        label: 'القضايا الجديدة',
        data: [50, 60, 70, 80, 90, 100, 120, 150, 130, 140, 160, 180, 200], // عدد القضايا شهريًا
        fill: true,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          return chartAreaGradient(ctx, chartArea, [
            {
              stop: 0,
              color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0)`,
            },
            {
              stop: 1,
              color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0.2)`,
            },
          ]);
        },
        borderColor: tailwindConfig().theme.colors.violet[500],
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointBackgroundColor: tailwindConfig().theme.colors.violet[500],
        clip: 10,
        tension: 0.2,
      },
      {
        label: 'الخدمات الجديدة',
        data: [40, 55, 65, 70, 85, 95, 110, 135, 120, 125, 140, 150, 160], // عدد الخدمات شهريًا
        fill: true,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          return chartAreaGradient(ctx, chartArea, [
            {
              stop: 0,
              color: `rgba(${hexToRGB(tailwindConfig().theme.colors.sky[500])}, 0)`,
            },
            {
              stop: 1,
              color: `rgba(${hexToRGB(tailwindConfig().theme.colors.sky[500])}, 0.2)`,
            },
          ]);
        },
        borderColor: tailwindConfig().theme.colors.sky[500],
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointBackgroundColor: tailwindConfig().theme.colors.sky[500],
        clip: 10,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="bg-gray-100 dark:bg-gradient-night shadow rounded-lg p-4 col-span-full sm:col-span-6 xl:col-span-1 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
          نمو القضايا والخدمات بالمكتب شهريًا
        </h2>
      </div>
      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
        إحصائيات شهريًا
      </div>
      <div className="flex items-center">
        <div className="text-xl font-bold text-gray-800 dark:text-gray-100 mr-2">
          12,000
        </div>
        <div className="text-xs font-medium text-green-600 bg-green-200/50 rounded-full px-2 py-0.5">
          +15%
        </div>
      </div>
      <div className="mt-3 grow h-[100px]">
        <LineChart
          data={chartData}
          width={300}
          height={100}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default DashboardCard01;
