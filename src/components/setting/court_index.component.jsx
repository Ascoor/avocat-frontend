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

  return (
    <div>
      <div className="court-setting-card-header">
        إعدادات المحاكم
        <img src={CourtIcon} alt="Icon" className="court-icon" />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Row>
          <Col lg={3} md={6} sm={12}>
            <Court itemsPerPage={itemsPerPage} />
          </Col>
          <Col lg={3} md={6} sm={12}>
            <CourtLevel itemsPerPage={itemsPerPage} />
          </Col>
          <Col lg={3} md={6} sm={12}>
            <CourtType itemsPerPage={itemsPerPage} />
          </Col>
          <Col lg={3} md={6} sm={12}>
            <CourtSubType itemsPerPage={itemsPerPage} />
          </Col>
        </Row>
      </Suspense>
    </div>
  );
};

export default CourtSetting;
