import React, { useState, useEffect } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';  // استيراد مكتبات المخططات
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function DashboardCard07() {
  // البيانات التجريبية للقضايا والاستشارات
  const [data, setData] = useState({
    openCases: 50,   // عدد القضايا المفتوحة
    consultations: 120,  // عدد الاستشارات القانونية
    sessions: 30,  // عدد الجلسات
    caseTrend: [73, 64, 73, 69, 104, 104, 164],  // بيانات القضايا عبر الزمن
    caseStatus: [30, 20, 10], // عدد القضايا حسب الحالة
    lawyerCases: [10, 15, 25], // توزيع القضايا حسب المحامي
  });

  // بيانات المخططات (أرقام تجريبية)
  const caseTrendData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'],
    datasets: [
      {
        label: 'عدد القضايا',
        data: data.caseTrend,
        borderColor: '#4B8BF5',
        backgroundColor: 'rgba(75, 139, 245, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const caseStatusData = {
    labels: ['مفتوحة', 'مغلقة', 'في المحكمة'],
    datasets: [
      {
        data: data.caseStatus,
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        borderWidth: 1,
      },
    ],
  };

  const lawyerCaseData = {
    labels: ['محامي 1', 'محامي 2', 'محامي 3'],
    datasets: [
      {
        label: 'عدد القضايا',
        data: data.lawyerCases,
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* 1. مؤشر عدد القضايا المفتوحة */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 flex justify-center items-center">
        <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">عدد القضايا المفتوحة</h3>
        <div className="text-4xl text-blue-500">{data.openCases}</div>
      </div>

      {/* 2. مؤشر عدد الاستشارات */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 flex justify-center items-center">
        <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">عدد الاستشارات</h3>
        <div className="text-4xl text-green-500">{data.consultations}</div>
      </div>

      {/* 3. مؤشر عدد الجلسات */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 flex justify-center items-center">
        <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">عدد الجلسات</h3>
        <div className="text-4xl text-orange-500">{data.sessions}</div>
      </div>

      {/* 4. مخطط عدد القضايا عبر الزمن */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4">
        <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">عدد القضايا عبر الزمن</h3>
        <Line data={caseTrendData} />
      </div>

      {/* 5. مخطط دائري لتمثيل توزيع القضايا حسب الحالة */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4">
        <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">توزيع القضايا حسب الحالة</h3>
        <Pie data={caseStatusData} />
      </div>

      {/* 6. مخطط عمودي لتمثيل عدد القضايا حسب المحامي */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4">
        <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">عدد القضايا حسب المحامي</h3>
        <Bar data={lawyerCaseData} />
      </div>
    </div>
  );
}

export default DashboardCard07;
