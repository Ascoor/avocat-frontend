// استيراد الأدوات
import React, { useState, useEffect } from 'react';
import Tooltip from '../../../Tools/Tooltip';
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
  // بيانات تجريبية للوقت الفعلي
  const [counter, setCounter] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [range, setRange] = useState(35);

  const data = [
    57.81, 57.75, 55.48, 54.28, 53.14, 52.25, 51.04, 52.49, 55.49, 56.87, 53.73,
    56.42, 58.06, 55.62, 58.16, 55.22, 58.67, 60.18, 61.31, 63.25, 65.91, 64.44,
    65.97, 62.27, 60.96, 59.34, 55.07, 59.85, 53.79, 51.92, 50.95, 49.65, 48.09,
    49.81, 47.85, 49.52, 50.21, 52.22, 54.42, 53.42, 50.91, 58.52, 53.37, 57.58,
    59.09, 59.36, 58.71, 59.42, 55.93, 57.71, 50.62, 56.28, 57.37, 53.08, 55.94,
    55.82, 53.94, 52.65, 50.25,
  ];

  const generateDates = () => {
    const now = new Date();
    return data.map((_, i) =>
      new Date(now - 2000 - i * 2000).toLocaleTimeString()
    );
  };

  const [slicedData, setSlicedData] = useState(
    data.slice(0, range).map((value, index) => ({
      name: generateDates()[index],
      value,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIncrement(prev => prev + 1);
    if (increment + range < data.length) {
      setSlicedData(prev => [
        ...prev.slice(1),
        {
          name: new Date().toLocaleTimeString(),
          value: data[increment + range],
        },
      ]);
    } else {
      setIncrement(0);
      setRange(0);
    }
  }, [counter]);

  return (
    <div className='flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl'>
      <header className='px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center'>
        <h2 className='font-semibold text-gray-800 dark:text-gray-100'>
          القيمة في الوقت الفعلي
        </h2>
        <Tooltip className='ml-2'>
          <div className='text-xs text-center whitespace-nowrap'>
            تم بناؤه باستخدام{' '}
            <a
              className='underline'
              href='https://recharts.org/'
              target='_blank'
              rel='noreferrer'
            >
              Recharts
            </a>
          </div>
        </Tooltip>
      </header>

      {/* رسم المخطط باستخدام Recharts */}
      <div className='p-4' style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={slicedData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <RechartsTooltip />
            <Line
              type='monotone'
              dataKey='value'
              stroke='#8884d8'
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardCard05;
