
const SectionHeader = ({
  buttonName,
  listName,
  setShowAddModal,
  icon,
  showBackButton,
}) => {
  return (
    <div className="section-header">
      {icon && <img src={icon} alt="Icon" className="section-icon" />}
      <div className="section-header-title">
        <h2>قائمة {listName}</h2>
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
