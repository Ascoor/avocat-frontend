import { useState } from 'react';
import { JudgeIcon } from '../../assets/icons/index';
import CourtType from './courtTools/CourtType';
import CourtSubType from './courtTools/CourtSubType';
import CourtLevel from './courtTools/CourtLevel';
import Court from './courtTools/Court';

const CourtSetting = () => {
  const [showAddCourtTypeModal, setShowAddCourtTypeModal] = useState(false);
  const [showAddCourtSubTypeModal, setShowAddCourtSubTypeModal] = useState(false);
  const [showAddCourtLevelModal, setShowAddCourtLevelModal] = useState(false);
  const [showAddCourtModal, setShowAddCourtModal] = useState(false);

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <div className="flex justify-center items-center space-x-4 text-2xl font-bold text-gray-800">
          إعدادات المحاكم
          <img src={JudgeIcon} alt="Icon" className="w-8 h-8" />
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setShowAddCourtTypeModal(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          إضافة تصنيف المحكمة
        </button>
        <button
          onClick={() => setShowAddCourtLevelModal(true)}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
        >
          إضافة درجة المحكمة
        </button>
        <button
          onClick={() => setShowAddCourtSubTypeModal(true)}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
        >
          إضافة نوع فرعي للمحكمة
        </button>
        <button
          onClick={() => setShowAddCourtModal(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          إضافة محكمة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CourtLevel
          show={showAddCourtLevelModal}
          handleClose={() => setShowAddCourtLevelModal(false)}
        />
        <CourtType
          show={showAddCourtTypeModal}
          handleClose={() => setShowAddCourtTypeModal(false)}
        />
        <CourtSubType
          show={showAddCourtSubTypeModal}
          handleClose={() => setShowAddCourtSubTypeModal(false)}
        />
      </div>

      <Court
        show={showAddCourtModal}
        handleClose={() => setShowAddCourtModal(false)}
      />
    </div>
  );
};

export default CourtSetting;
