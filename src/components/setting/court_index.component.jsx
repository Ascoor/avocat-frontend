import React, { useState, useEffect } from "react";
import { JudgeIcon } from '../../assets/icons/index';
import {
    Row,
    Col,
    Button,
    ButtonGroup,
} from "react-bootstrap";
import CourtType from './courtTools/CourtType';
import CourtSubType from './courtTools/CourtSubType';
import CourtLevel from "./courtTools/CourtLevel";
import Court from "./courtTools/Court";
import '../../assets/css/Courts.css'

const CourtSetting = () => {
    // Court Type data (replace with actual data from API or state)
    const [showAddCourtTypeModal, setShowAddCourtTypeModal] = useState(false);
    const [showAddCourtSubTypeModal, setShowAddCourtSubTypeModal] =
        useState(false);
    const [showAddCourtLevelModal, setShowAddCourtLevelModal] = useState(false);
    const [showAddCourtModal, setShowAddCourtModal] = useState(false);

    useEffect(() => {
      
    }, []);

    return (
        <div dir="rtl"> 
            <Row className="justify-content-center">

                <Col xs={12} className="text-center mb-3">
                    <div className="court-setting-card-header">
                        إعدادات المحاكم
                        <img src={JudgeIcon} alt="Icon" className="court-icon ms-2" /> {/* Note: ms-2 for RTL */}
                    </div>
                </Col>

                <Col xs={12} md={8} className="text-center mb-3">
                    <ButtonGroup>
                        <Button onClick={() => setShowAddCourtTypeModal(true)} variant="success">
                            إضافة تصنيف المحكمة
                        </Button>

                        <Button onClick={() => setShowAddCourtLevelModal(true)} variant="warning">
                            إضافة درجة المحكمة
                        </Button>

                        <Button onClick={() => setShowAddCourtSubTypeModal(true)} variant="warning">
                            إضافة نوع فرعي للمحكمة
                        </Button>

                        <Button onClick={() => setShowAddCourtModal(true)} variant="success">
                            إضافة محكمة
                        </Button>
                    </ButtonGroup>
                </Col>

            </Row>
            <Row>
  <Col md={4}>
  <CourtLevel show={showAddCourtLevelModal} handleClose={() => setShowAddCourtLevelModal(false)} />
          
  </Col>

  <Col md={4}>
  <CourtType show={showAddCourtTypeModal} handleClose={() => setShowAddCourtTypeModal(false)} />
         
  </Col>

  <Col md={4}>
    <CourtSubType show={showAddCourtSubTypeModal} handleClose={() => setShowAddCourtSubTypeModal(false)} />
          
  </Col>
</Row>

     <Court show={showAddCourtModal} handleClose={() => setShowAddCourtModal(false)} />
        </div>
    );
};

export default CourtSetting;    