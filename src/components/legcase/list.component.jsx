import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Table, Pagination, Row, Col, Button, Alert } from "react-bootstrap";
import { FcPlus } from "react-icons/fc";
import { TiArrowBackOutline } from "react-icons/ti";

import API_CONFIG from "../../config";
import {LegCaseIcon} from "../../assets/icons";

const LegCaseList = () => {
    const [legCases, setLegCases] = useState([]);
    const [legCasesPage, setLegCasesPage] = useState(1);
    const itemsPerPage = 20;
    const [showAlert, setShowAlert] = useState(false);
    const [currentAlertMessage, setCurrentAlertMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredLegCases, setFilteredLegCases] = useState([]);

    const handleLegCasesPageChange = (page) => {
        setLegCasesPage(page);
    };

    const PaginationComponent = ({
        items,
        itemsPerPage,
        currentPage,
        onPageChange,
    }) => {
        const totalPages = Math.ceil(items.length / itemsPerPage);

        const handleClick = (page) => {
            if (typeof onPageChange === "function") {
                onPageChange(page);
            }
        };

        return (
            <Pagination>
                <Pagination.Prev
                    onClick={() => handleClick(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handleClick(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => handleClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        );
    };

    useEffect(() => {
        fetchLegCases();
    }, []);

    const fetchLegCases = async () => {
        try {
            const response = await axios.get(`${API_CONFIG.baseURL}/api/leg_cases`);
            setLegCases(response.data);
            setFilteredLegCases(response.data);
        } catch (error) {
            console.log("Failed to fetch leg cases");
        }
    };

    const handleSearch = () => {
        const filteredCases = legCases.filter((legCase) => {
            return (
                legCase.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                legCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                legCase.case_sub_type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                legCase.clients.some((client) =>
                    client.name.toLowerCase().includes(searchQuery.toLowerCase())
                ) ||
                legCase.courts.some((court) =>
                    court.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        });
        setFilteredLegCases(filteredCases);
    };

    const deleteLegCase = async (id) => {
        try {
            await axios.delete(`${API_CONFIG.baseURL}/api/leg_cases/${id}`);
            setShowAlert(true);
            setCurrentAlertMessage("تم حذف الحالة القانونية بنجاح");
            fetchLegCases();
            setFilteredLegCases(filteredLegCases.filter((legCase) => legCase.id !== id));
        } catch (error) {
            console.log("فشل في حذف الحالة القانونية");
        }
    };

    return (
        <>
            <Card>
                <div className="court-setting-card-header">
                    قائمة القضايا
                    <img src={LegCaseIcon} alt="Icon" className="leg-case-icon" />
                </div>

                <Row className="add-case-row">
                    <Col xs={12} md={6} lg={6} className="text-center text-md-start mb-md-0">
                        <Link className="btn btn-lg btn-primary btn-add" to={"/legcases/create"}>
                            <FcPlus size={20} />
                            إضافة قضية
                        </Link>
                    </Col>

                    <Col xs={12} md={6} lg={6} className="text-center text-md-end">
                        <Button variant="warning" className="btn-back btn-lg" type="button" onClick={() => window.history.back()}>
                            <TiArrowBackOutline size={25} style={{ marginRight: "0.5rem" }} />
                            رجوع
                        </Button>
                    </Col>
                </Row>

                {showAlert && <Alert variant="success" className="text-center">{currentAlertMessage}</Alert>}
                <div className="text-center">
                    <Row className="justify-content-center"> {/* Add justify-content-center class */}
                        <Col xs={6} md={6} lg={6} className="text-center text-md">
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="ابحث..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            <button className="btn btn-primary btn-search" onClick={handleSearch}>
                                بحث
                            </button>
                        </Col>
                    </Row>
                </div>
                <Card.Body>


                    <Table striped bordered hover responsive>
                        <thead className="info">
                            <tr>
                                <th className="header-cell">رقم الملف</th>
                                <th className="header-cell"> الموكل</th>
                                <th className="header-cell">صفة</th>
                                <th className="header-cell">الموضوع </th>
                                <th className="header-cell">نوع القضية</th>
                                <th className="header-cell">المحكمة</th>
                                <th className="header-cell">الحالة</th>
                                <th className="header-cell">التحكم</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredLegCases
    .slice((legCasesPage - 1) * itemsPerPage, legCasesPage * itemsPerPage)
    .map((legCase) => (
      <tr key={legCase.id}> {/* Use legCase.id as the key */}
                                      <td>{legCase.slug}</td>
                                        <td>
                                        {legCase.clients.map((client) => (
            <div key={client.id}>
           
                                                    <small>{client.name}</small>
                                                </div>
                                            ))}
                                        </td>
                                        <td>{legCase.client_capacity}</td>
                                        <td>{legCase.title}</td>
                                        <td>{legCase.case_sub_type.name}</td>
                                        <td>
                                            {legCase.courts.map((court) => (
                                                <div key={court.id}>
                                                    <small>{court.name}</small>
                                                </div>
                                            ))}
                                        </td>
                                        <td>{legCase.status}</td>
                                        <td>
                                            <div className="button-container">
                                                <Link className="btn btn-secondary mb-2 float-end" to={`/legcases/show/${legCase.id}`}>
                                                    عرض
                                                </Link>
                                                <Link className="btn btn-danger mb-2 float-end" onClick={() => deleteLegCase(legCase.id)}>
                                                    حذف
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>

                </Card.Body>
                <Card.Footer>

                    <PaginationComponent
                        items={filteredLegCases}
                        itemsPerPage={itemsPerPage}
                        currentPage={legCasesPage}
                        onPageChange={handleLegCasesPageChange}
                    />

                </Card.Footer>
            </Card>
        </>
    );
};

export default LegCaseList;
