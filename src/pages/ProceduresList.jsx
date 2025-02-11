import SectionHeader from '../components/common/SectionHeader';
import { ProcedureIcon } from '../assets/icons';
import ProcedurePlaceTypes from '../components/Procedures/ProcedurePlaceTypes';
import ProcedureTypes from '../components/Procedures/ProcedureTypes';

const Procedures = () => {
  return (
    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full">
      <SectionHeader listName="الإجراءات" icon={ProcedureIcon} />

      {/* جدولان في صف واحد متجاورين في الشاشات الكبيرة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <ProcedureTypes />
        </div>
        <div className="col-span-1">
          <ProcedurePlaceTypes />
        </div>
      </div>
    </div>
  );
};

export default Procedures;
