import { useState, useEffect } from 'react';
import { JudgeIcon } from '../../assets/icons/index';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import CourtType from './courtTools/CourtType';
import CourtSubType from './courtTools/CourtSubType';
import CourtLevel from './courtTools/CourtLevel';
import Court from './courtTools/Court';
import '../../assets/css/Courts.css';

const CourtSetting = () => {
  // Court Type data (replace with actual data from API or state)
  const [showAddCourtTypeModal, setShowAddCourtTypeModal] = useState(false);
  const [showAddCourtSubTypeModal, setShowAddCourtSubTypeModal] =
    useState(false);
  const [showAddCourtLevelModal, setShowAddCourtLevelModal] = useState(false);
  const [showAddCourtModal, setShowAddCourtModal] = useState(false);

  useEffect(() => {}, []);

  return (
    <div>
      <Row className="justify-content-center">
        <div className="legalcase-card-header">
          إعدادات المحاكم
          <img src={JudgeIcon} alt="Icon" className="court-icon ms-2" />
        </div>

        <Col xs={12} md={10} lg={8} className="text-center">
          <ButtonGroup className="special-button-group">
            <Button
              className="special-button"
              onClick={() => setShowAddCourtTypeModal(true)}
              variant="success"
            >
              إضافة تصنيف المحكمة
            </Button>
            <Button
              className="special-button"
              onClick={() => setShowAddCourtLevelModal(true)}
              variant="warning"
            >
              إضافة درجة المحكمة
            </Button>
            <Button
              className="special-button"
              onClick={() => setShowAddCourtSubTypeModal(true)}
              variant="warning"
            >
              إضافة نوع فرعي للمحكمة
            </Button>
            <Button
              className="special-button"
              onClick={() => setShowAddCourtModal(true)}
              variant="success"
            >
              إضافة محكمة
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="justify-content-around">
        <Col xs={12} sm={6} md={4}>
          <CourtLevel
            show={showAddCourtLevelModal}
            handleClose={() => setShowAddCourtLevelModal(false)}
          />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <CourtType
            show={showAddCourtTypeModal}
            handleClose={() => setShowAddCourtTypeModal(false)}
          />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <CourtSubType
            show={showAddCourtSubTypeModal}
            handleClose={() => setShowAddCourtSubTypeModal(false)}
          />
        </Col>
      </Row>
      <Court
        show={showAddCourtModal}
        handleClose={() => setShowAddCourtModal(false)}
      />
    </div>
  );
};

export default CourtSetting;
