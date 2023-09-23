import React, { useState } from 'react';
import '../../assets/css/FinancialDashboard.css';
import { Card } from 'react-bootstrap';
import ExpenseIndex from './Expence/index';
import ClientAccounttIndex from './ClientAccount/index';

const FinancialDashboard = () => {
  const [activeTab, setActiveTab] = useState('');

  const renderContent = () => {
    switch (activeTab) {
      case 'revenue':
        return <div>الإيرادات - Add your revenue content here</div>;
      case 'expenses':
        return <ExpenseIndex />;
      case 'client': // Corrected to 'client' with a lowercase 'c'
        return <ClientAccounttIndex />;
      case 'nonClient':
        return <div>العملاء - Add your client content here</div>;
      default:
        return null; // Default content when no tab is selected
    }
  };
  
  return (
    <div className="financial-dashboard">
      <div className="card-container">
        <div className="financial-card" onClick={() => setActiveTab('revenue')}>
          <p>الإيرادات</p>
        </div>
        <div
          className="financial-card"
          onClick={() => setActiveTab('expenses')}
        >
          <p>المصروفات</p>
        </div>
        <div className="financial-card" onClick={() => setActiveTab('client')}>
          <p>العملاء</p>
        </div>
        <div
          className="financial-card"
          onClick={() => setActiveTab('nonClient')}
        >
          <p>غير العملاء</p>
        </div>
      </div>
      <Card className="content-card">
        <Card.Body>{renderContent()}</Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
};

export default FinancialDashboard;
