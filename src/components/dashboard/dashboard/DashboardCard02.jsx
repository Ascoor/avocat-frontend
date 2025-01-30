import React from 'react';
import { Pie } from 'react-chartjs-2';

function DashboardCard02() {
  const chartData = {
    labels: ['محامي 1', 'محامي 2', 'محامي 3'],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ['#58a6ed4a', '#d1b2f5', '#6040b4'],
        hoverBackgroundColor: ['#ccd3f4', '#FF5722', '#6040b4'],
      },
    ],
  };

  return (
    <div className="bg-gray-100 dark:bg-gradient-night shadow-lg rounded-lg p-4 col-span-full sm:col-span-6 xl:col-span-1 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          توزيع القضايا حسب المحامي
        </h3>
      </div>
      <div className="flex justify-center">
        <Pie data={chartData} />
      </div>
    </div>
  );
}

export default DashboardCard02;
