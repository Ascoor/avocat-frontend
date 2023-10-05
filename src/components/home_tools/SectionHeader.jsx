import React from 'react';
const SectionHeader = ({ buttonName, listName, setShowAddModal, icon }) => {
  return (
    <div className="section-card-header">
      <div className="title-row">
        قائمة {listName}
        <img src={icon} alt="Icon" className="court-icon" />
      </div>
      <div className="button-row">
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          اضافة {buttonName}
        </button>
      </div>

      <button className="back-btn" onClick={() => window.history.back()}>
        رجوع
      </button>
    </div>
  );
};

export default SectionHeader;
