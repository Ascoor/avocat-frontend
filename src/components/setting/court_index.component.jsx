
import { CourtIcon } from "../../assets/icons";
import React, { Suspense } from 'react';
import {
    Row,
    Col

} from "react-bootstrap";

const CourtLevel = React.lazy(() => import('./courtTools/CourtLevel'));
const CourtType = React.lazy(() => import('./courtTools/CourtType'));
const CourtSubType = React.lazy(() => import('./courtTools/CourtSubType'));
const Court = React.lazy(() => import('./courtTools/Court'));
const CourtSetting = () => {
    const itemsPerPage = 10;

    return (   <div>
        <div className="court-setting-card-header">
          إعدادات المحاكم
          <img src={CourtIcon} alt="Icon" className="court-icon" />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
        <Court itemsPerPage={itemsPerPage} />
          <CourtLevel itemsPerPage={itemsPerPage} />
          <CourtType itemsPerPage={itemsPerPage} />
          <CourtSubType itemsPerPage={itemsPerPage} />
        </Suspense>
      </div>
    );
};
export default CourtSetting;
