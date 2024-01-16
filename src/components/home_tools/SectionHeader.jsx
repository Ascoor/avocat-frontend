import React from 'react';
import '../../assets/css/SectionHeader.css';

const SectionHeader = ({ buttonName, listName, setShowAddModal, icon, showBackButton }) => {
  return (
    <div className="section-header">
      <div className="section-header-title">
        <h2>قائمة {listName}</h2>
        {icon && <img src={icon} alt="Icon" className="section-icon" />}
      </div>
      <div className="section-header-buttons">
        {showBackButton && (
          <button className="back-btn" onClick={() => window.history.back()}>
            رجوع
          </button>
        )}
        {buttonName && (
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            اضافة {buttonName}
          </button>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
