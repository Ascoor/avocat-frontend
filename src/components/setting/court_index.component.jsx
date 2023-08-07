import React,{ useState } from "react";
import { CourtIcon } from "../../assets/icons";
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
        <>

            <div className="court-setting-card-header">
                إعدادات المحاكم
                <img src={CourtIcon} alt="Icon" className="court-icon" />
            </div>


            <div>
                <Row>
                    <Col>
                        <Court itemsPerPage={itemsPerPage} />
                    </Col>
                </Row>
                <Row>

                    <Col>
                        <CourtLevel itemsPerPage={itemsPerPage} />
                    </Col>

                    <Col>
                        <CourtType itemsPerPage={itemsPerPage} />
                    </Col>
                    <Col>
                        <CourtSubType itemsPerPage={itemsPerPage} />
                    </Col>

                </Row>
            </div>
        </>
    );
};
export default CourtSetting;
