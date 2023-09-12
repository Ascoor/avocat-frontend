import React, { useState, useEffect } from "react";
import {JudgeIcon} from '../../assets/icons/index';
import {
    Row,
    Col,
    Button,
    ButtonGroup,
} from "react-bootstrap";
import CourtType from './courtTools/CourtType'
import CourtSubType from './courtTools/CourtSubType'
import CourtLevel from "./courtTools/CourtLevel";

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
        <div>
            <Row>

            <Row>
                <div className="court-setting-card-header">
                    إعدادات المحاكم
                    <img src={JudgeIcon} alt="Icon" className="court-icon" />
                </div>

            </Row>

           
            <Col className="text-center">
                  

                    <ButtonGroup aria-label="Basic example">
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
         <CourtType  show={showAddCourtTypeModal} handleClose={() => setShowAddCourtTypeModal(false)} />
<CourtLevel  show={showAddCourtLevelModal} handleClose={() => setShowAddCourtLevelModal(false)} />
<CourtSubType  show={showAddCourtSubTypeModal} handleClose={() => setShowAddCourtSubTypeModal(false)} />
         
        </div>
    );
};
export default CourtSetting;
