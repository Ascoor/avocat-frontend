import React, { useState } from 'react';
import Lawyers from './LawyerList'; 
import CourtSetting from '../components/Courts/court_index.component';
import Procedures from './ProceduresList';
import ServiceTypes from '../components/Settings/ServiceTypes'; 
import ExpenseCategorys from '../components/Settings/ExpenseCategorys';

const ManagementSettings = () => {
  const [activeTab, setActiveTab] = useState('lawyers');

  const tabs = [
    { label: 'المحامون', value: 'lawyers', icon: '👨‍⚖️' },
    { label: 'المحاكم', value: 'courts', icon: '⚖️' },
    { label: 'الإجراءات', value: 'procedures', icon: '📝' },
    { label: 'تصنيف القضايا', value: 'case-types', icon: '📝' },
    { label: 'أنواع الخدمات', value: 'service-types', icon: '📝' },
    { label: 'أنواع المصروفات', value: 'expense-categories', icon: '📝' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'lawyers':
        return <Lawyers />;
      case 'courts':
        return  <CourtSetting />;
      case 'procedures':
        return <Procedures />;
      case 'case-types':
        return <div>محتوى تصنيف القضايا</div>;
      case 'service-types':
        return <ServiceTypes  />;
      case 'expense-categories':
        return <ExpenseCategorys />;
      default:
        return null;
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center tracking-wide">
        إدارة المكتب
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-6 py-4 transition-transform transform hover:scale-105 ${
              activeTab === tab.value ? 'bg-blue-500 text-white' : ''
            }`}
          >
            <span className="text-3xl mr-3">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="w-full max-w-5xl p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
        {renderTabContent()}
      </div>
    </section>
  );
};

export default ManagementSettings;