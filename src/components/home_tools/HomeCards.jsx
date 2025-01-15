import { useEffect, useState } from 'react';
import fakeData from '../../Data';
import { FaBullhorn, FaClock, FaTasks, FaFileAlt, FaBell } from 'react-icons/fa';

// ✅ أنماط البطاقات محسّنة مع تجاوب أفضل
const cardStyle =
  'bg-gradient-to-br from-white via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 border border-gray-200 dark:border-gray-700';

// ✅ تحسين تصميم الجدول ليتناسب مع جميع الأجهزة
const tableStyle = 'w-full text-center border-collapse rounded-lg overflow-x-auto shadow-xl';

// ✅ رأس الجدول مع تحسين التباين للعرض في الوضعين الفاتح والداكن
const theadStyle =
  'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 dark:from-orange-600 dark:via-orange-700 dark:to-orange-800 text-white uppercase tracking-wider font-bold text-sm md:text-lg';

const thTdStyle =
  'px-4 md:px-6 py-3 md:py-4 border-b border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-medium text-sm md:text-lg';

const rowHoverStyle =
  'hover:bg-gradient-to-r hover:from-pink-200 hover:to-pink-400 dark:hover:from-orange-700 dark:hover:to-orange-900 transition-all duration-300 transform hover:scale-105 rounded-md';

// ✅ جدول الإجراءات
const ProceduresTable = () => {
  const [procedures, setProcedures] = useState([]);

  useEffect(() => {
    setProcedures(fakeData.procedures);
  }, []);

  return (
    <div className={`${cardStyle} hover:bg-gradient-to-r hover:from-orange-100 hover:to-orange-200 dark:hover:from-orange-700 dark:hover:to-orange-800`}>
      <h3 className="text-base md:text-lg font-semibold mb-4 text-avocat-orange dark:text-green-400 flex items-center gap-2">
        📋 قائمة الإجراءات
      </h3>
      <div className="overflow-x-auto">
        <table className={tableStyle}>
          <thead>
            <tr className={theadStyle}>
              <th className={thTdStyle}>العنوان</th>
              <th className={thTdStyle}>الوصف</th>
            </tr>
          </thead>
          <tbody>
            {procedures.length > 0 ? (
              procedures.map((procedure, index) => (
                <tr key={index} className={rowHoverStyle}>
                  <td className={thTdStyle}>{procedure.title}</td>
                  <td className={thTdStyle}>{procedure.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className={`${thTdStyle} text-center`}>لا توجد بيانات متاحة</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ✅ جدول الإعلانات
const AnnouncementsTable = () => {
  return (
    <div className={`${cardStyle} hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-700 dark:hover:to-blue-800`}>
      <h2 className="text-base md:text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
        <FaBullhorn /> مواعيد الإعلانات
      </h2>
      <div className="overflow-x-auto">
        <table className={tableStyle}>
          <thead>
            <tr className={theadStyle}>
              <th className={thTdStyle}>التاريخ</th>
              <th className={thTdStyle}>الوصف</th>
            </tr>
          </thead>
          <tbody>
            {fakeData.announcement_dates.map((announcement, index) => (
              <tr key={index} className={rowHoverStyle}>
                <td className={thTdStyle}>{announcement.date}</td>
                <td className={thTdStyle}>{announcement.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ✅ جدول الجلسات
const SessionsTable = () => {
  return (
    <div className={`${cardStyle} hover:bg-gradient-to-r hover:from-green-100 hover:to-green-200 dark:hover:from-green-700 dark:hover:to-green-800`}>
      <h2 className="text-base md:text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
        <FaClock /> الجلسات القادمة
      </h2>
      <div className="overflow-x-auto">
        <table className={tableStyle}>
          <thead>
            <tr className={theadStyle}>
              <th className={thTdStyle}>التاريخ</th>
              <th className={thTdStyle}>الوقت</th>
              <th className={thTdStyle}>الوصف</th>
            </tr>
          </thead>
          <tbody>
            {fakeData.sessions.map((session, index) => (
              <tr key={index} className={rowHoverStyle}>
                <td className={thTdStyle}>{session.date}</td>
                <td className={thTdStyle}>{session.time}</td>
                <td className={thTdStyle}>{session.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ✅ جدول المهام
const TasksTable = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(fakeData.tasks);
  }, []);

  return (
    <div className={cardStyle}>
      <h2 className="text-base md:text-lg font-bold flex items-center gap-2">
        <FaTasks /> المهام اليومية
      </h2>
      <div className="overflow-x-auto">
        <table className={tableStyle}>
          <thead>
            <tr className={theadStyle}>
              <th className={thTdStyle}>المهمة</th>
              <th className={thTdStyle}>تاريخ الاستحقاق</th>
              <th className={thTdStyle}>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className={rowHoverStyle}>
                <td className={thTdStyle}>{task.task}</td>
                <td className={thTdStyle}>{task.dueDate}</td>
                <td className={thTdStyle}>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { ProceduresTable, TasksTable, AnnouncementsTable, SessionsTable };
