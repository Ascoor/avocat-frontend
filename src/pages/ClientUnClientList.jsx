import React, { useState } from 'react';
import { FaUserTie, FaUserAltSlash } from 'react-icons/fa';
import ClientList from '../components/ClientsAndUnClients/clients';
import UnClientList from '../components/ClientsAndUnClients/unclients';
 
const ClientUnclientList = () => {
  const [activeTab, setActiveTab] = useState('clients'); // ✅ تتبع التبويب النشط

  const tabs = [
    { key: 'clients', label: 'عملاء بوكالة', icon: <FaUserTie /> },
    { key: 'unclients', label: 'عملاء بدون وكالة', icon: <FaUserAltSlash /> },
  ];

  return (
    <section className="flex flex-col items-center justify-start min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      
      {/* ✅ أزرار التبويبات */}
      <div className="flex space-x-4 bg-white dark:bg-gray-800 shadow-md rounded-lg p-2 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              flex items-center px-6 py-3 rounded-lg transition-all duration-300 
              text-lg font-medium cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`
            }
          >
            <span className="text-2xl mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ✅ عرض المكون المناسب حسب التبويب المحدد */}
      <div className="mt-8 w-full max-w-5xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {activeTab === 'clients' ? <ClientList /> : <UnClientList />}
      </div>

    </section>
  );
};

export default ClientUnclientList;
