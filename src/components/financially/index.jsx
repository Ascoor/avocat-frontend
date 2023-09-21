import React, { useState } from 'react';
import '../../assets/css/FinancialDashboard.css';
import { Card } from 'react-bootstrap';
import ExpenseIndex from './Expence/index';

const FinancialDashboard = () => {
  const [activeTab, setActiveTab] = useState('');

  const renderContent = () => {
    if (activeTab === 'expenses') {
      return <ExpenseIndex />;
    }
    // Add more conditions here for other types of content
  };

  return (
    <div className="financial-dashboard">
      <div className="card-container">
        <div className="financial-card" onClick={() => setActiveTab('revenue')}>
          <p>الإيرادات</p>
        </div>
        <div className="financial-card" onClick={() => setActiveTab('expenses')}>
          <p>المصروفات</p>
        </div>
        <div className="financial-card" onClick={() => setActiveTab('client')}>
          <p>العملاء</p>
        </div>
        <div className="financial-card" onClick={() => setActiveTab('nonClient')}>
          <p>غير العملاء</p>
        </div>
      </div>
      <Card className="content-card">
        <Card.Body>
          {renderContent()}
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
};

export default FinancialDashboard;
