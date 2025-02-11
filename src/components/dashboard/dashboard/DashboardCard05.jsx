import React, { useState, useEffect } from 'react';
import Tooltip from '../../common/Tooltip';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';

function DashboardCard05() {
  // بيانات القضايا المفتوحة والقضايا المغلقة
  const [counter, setCounter] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [range, setRange] = useState(35);

  // بيانات القضايا المفتوحة
  const openCasesData = [
    57, 60, 62, 65, 67, 70, 72, 74, 77, 80, 83, 85, 87, 90, 93, 95, 98, 100,
    103, 105, 107, 110, 113, 115, 118, 120, 123, 125, 128, 130, 133, 135,
  ];

  // بيانات القضايا المغلقة
  const closedCasesData = [
    50, 55, 60, 62, 65, 68, 70, 72, 75, 77, 80, 82, 84, 86, 89, 92, 95, 98, 100,
    102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126,
  ];

  const generateDates = () => {
    const now = new Date();
    return openCasesData.map((_, i) =>
      new Date(now - 2000 - i * 2000).toLocaleTimeString(),
    );
  };

  const [slicedData, setSlicedData] = useState(
    openCasesData.slice(0, range).map((value, index) => ({
      name: generateDates()[index],
      openCases: value,
      closedCases: closedCasesData[index], // إضافة البيانات المغلقة للمقارنة
    })),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIncrement((prev) => prev + 1);
    if (increment + range < openCasesData.length) {
      setSlicedData((prev) => [
        ...prev.slice(1),
        {
          name: new Date().toLocaleTimeString(),
          openCases: openCasesData[increment + range],
          closedCases: closedCasesData[increment + range], // إضافة البيانات المغلقة
        },
      ]);
    } else {
      setIncrement(0);
      setRange(0);
    }
  }, [counter]);

  return (
    <div className="bg-gray-100 dark:bg-gradient-night shadow rounded-lg p-4 col-span-full sm:col-span-6 xl:col-span-1 flex flex-col">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          القضايا المفتوحة والمغلقة مقارنة بالوقت الفعلي
        </h2>
        <Tooltip className="ml-2">
          <div className="text-xs text-center whitespace-nowrap">
            تم بناؤه باستخدام{' '}
            <a
              className="underline"
              href="https://recharts.org/"
              target="_blank"
              rel="noreferrer"
            >
              Recharts
            </a>
          </div>
        </Tooltip>
      </header>

      {/* رسم المخطط باستخدام Recharts */}
      <div className="p-4" style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={slicedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <RechartsTooltip />
            <Line
              type="monotone"
              dataKey="openCases"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="closedCases"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
              strokeDasharray="5 5" // إضافة خط منقط لتمييز البيانات المغلقة
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardCard05;
