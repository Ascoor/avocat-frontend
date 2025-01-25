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
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">توزيع القضايا حسب المحامي</h3>
      <Pie data={chartData} />
    </div>
  );
}

export default DashboardCard02;
