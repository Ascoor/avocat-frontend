    import React, { useState, useEffect } from 'react';
    import API_CONFIG from '../../config';
    import axios from 'axios';
    import CourtType from './courtTools/CourtType';
    import Court from './courtTools/Court';
    import CourtSubType from './courtTools/CourtSubType';
    import CourtLevel from './courtTools/CourtLevel';
    const CourtSetting = () => {
    const initialState = {
        showAlert: false,
        alertMessage: '',
        deleteSuccess: false,
        deleteError: false,
        deleteItem: {},
        showConfirmationModal: false,
        showMessage: false,
        message: '',
        selectedCourtTypeId: '',
        showAddCourtTypeModal: false,
        showAddCourtSubTypeModal: false,
        showAddCourtLevelModal: false,
        showAddCourtModal: false,
        courtTypes: [],
        courtSubTypes: [],
        courtLevels: [],
        courts: [],
        error: null,
        itemsPerPage: 5,

    } = state;
    const [state, setState] = useState(initialState);

    useEffect(() => {
        fetchCourtTypes();
        fetchCourtSubTypes();
        fetchCourtLevels();
        fetchCourts();
    }, []);

    const fetchData = async (apiEndpoint, stateKey, errorMessage) => {
        try {
        const response = await axios.get(`${API_CONFIG.baseURL}/${apiEndpoint}`);
        setState((prevState) => ({
            ...prevState,
            [stateKey]: response.data,
            error: null,
        }));
        } catch (error) {
        setState((prevState) => ({
            ...prevState,
            error: errorMessage,
        }));
        console.error(errorMessage, error);
        }
    };

    const handleCourtTypeChange = (e) => {
        const selectedCourtTypeId = e.target.value;
        setState((prevState) => ({
        ...prevState,
        selectedCourtTypeId,
        }));
    };

    const fetchCourtTypes = async () => {
        try {
        const response = await axios.get(
            `${API_CONFIG.baseURL}/api/court_types/`
        );
        setCourtTypes(response.data);
        } catch (error) {
        setError('حدث خطأ في استرجاع أنواع المحاكم');
        console.error('حدث خطأ في استرجاع أنواع المحاكم: ', error);
        }
    };
    const fetchcourtSubTypes = async (selectedCourtTypeId) => { // Add selectedCourtTypeId as a parameter
        try {
        const response = await axios.get(
            `${API_CONFIG.baseURL}/api/court-types/${selectedCourtTypeId}`
        );
        setcourtSubTypes(response.data);
        } catch (error) {
        setError('حدث خطأ في استرجاع أنواع المحاكم الفرعية');
        console.error('حدث خطأ في استرجاع أنواع المحاكم الفرعية: ', error);
        }
    };
    
    useEffect(() => {
        if (selectedCourtTypeId !== '') {
        fetchcourtSubTypes(selectedCourtTypeId); // Pass selectedCourtTypeId as an argument
        } else {
        setCourtSubTypes([]);
        }
    }, [selectedCourtTypeId]); // Make sure to include selectedCourtTypeId as a dependency
    

    const fetchCourtLevels = async () => {
        try {
        const response = await axios.get(
            `${API_CONFIG.baseURL}/api/court_levels/`
        );
        setCourtLevels(response.data);
        } catch (error) {
        setError('حدث خطأ في استرجاع مستويات المحاكم');
        console.error('حدث خطأ في استرجاع مستويات المحاكم: ', error);
        }
    };

    const fetchCourts = async () => {
        try {
        const response = await axios.get(`${API_CONFIG.baseURL}/api/courts/`);
        setCourts(response.data);
        } catch (error) {
        setError('حدث خطأ في استرجاع المحاكم');
        console.error('حدث خطأ في استرجاع المحاكم: ', error);
        }
    };

    // Pagination Component
    const CustomPagination = ({
        totalCount,
        itemsPerPage,
        currentPage,
        onPageChange,
    }) => {
        // ...
    };

    const handleCourtLevelsPageChange = (page) => {
        setCourtLevelsPage(page);
    };

    const handleCourtSubTypesPageChange = (page) => {
        setCourtSubTypesPage(page);
    };

    const handleCourtsPageChange = (page) => {
        setCourtsPage(page);
    };

    const handleAddCourtSubType = () => {
        fetch(`${API_CONFIG.baseURL}/api/court_sub_types/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            court_type_id: newCourtTypeId,
            name: newCourtSubTypeName,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            fetchCourtSubTypes();
            setShowAddCourtSubTypeModal(false);
            setNewCourtSubTypeName('');
            setNewCourtTypeId('');
            setShowAlert(true);
            setAlertMessage('تمت إضافة نوع المحكمة الفرعية بنجاح.');
            setTimeout(() => {
            setShowAlert(false);
            }, 5000);
        })
        .catch((error) => {
            setError('حدث خطأ في إضافة نوع المحكمة الفرعية');
            console.error('حدث خطأ في إضافة نوع المحكمة الفرعية: ', error);
            setShowAlert(true);
            setAlertMessage('فشل في إضافة نوع المحكمة الفرعية.');
            setTimeout(() => {
            setShowAlert(false);
            }, 5000);
        });
    };

    const handleAddCourtLevel = () => {
        fetch(`${API_CONFIG.baseURL}/api/court_levels`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: newCourtLevelName,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            fetchCourtLevels();
            setShowAddCourtLevelModal(false);
            setNewCourtLevelName('');
            setShowAlert(true);
            setAlertMessage('تمت إضافة مستوى المحكمة بنجاح.');
            setTimeout(() => {
            setShowAlert(false);
            }, 5000);
        })
        .catch((error) => {
            setError('حدث خطأ في إضافة مستوى المحكمة');
            console.error('حدث خطأ في إضافة مستوى المحكمة: ', error);
            setShowAlert(true);
            setAlertMessage('فشل في إضافة مستوى المحكمة.');
            setTimeout(() => {
            setShowAlert(false);
            }, 5000);
        });
    };

    const handleAddCourt = () => {
        fetch(`${API_CONFIG.baseURL}/api/courts/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            courtTypeId: newCourtTypeId,
            courtSubTypeId: newCourtSubTypeId,
            courtLevelId: newCourtLevelId,
            name: newCourtName,
            address: newCourtAddress,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            fetchCourts();
            setShowAddCourtModal(false);
            setNewCourtName('');
            setNewCourtTypeId('');
            setNewCourtSubTypeId('');
            setNewCourtLevelId('');
            setNewCourtAddress('');
            setShowAlert(true);
            setAlertMessage('تمت إضافة المحكمة بنجاح.');
            setTimeout(() => {
            setShowAlert(false);
            }, 5000);
        })
        .catch((error) => {
            setError('حدث خطأ في إضافة المحكمة');
            console.error('حدث خطأ في إضافة المحكمة: ', error);
            setShowAlert(true);
            setAlertMessage('فشل في إضافة المحكمة.');
            setTimeout(() => {
            setShowAlert(false);
            }, 5000);
        });
    };

    const handleAddCourtType = () => {
        fetch(`${API_CONFIG.baseURL}/api/court_types/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: newCourtTypeName,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            fetchCourtTypes();
            setShowAddCourtTypeModal(false);
            setNewCourtTypeName('');
            setShowAlert(true);
            setAlertMessage('تمت إضافة نوع المحكمة بنجاح.');
            setTimeout(() => {
            setShowAlert(false);
            }, 5000);
        })
        .catch((error) => {
            setError('حدث خطأ في إضافة نوع المحكمة');
            console.error('حدث خطأ في إضافة نوع المحكمة: ', error);
            setShowAlert(true);
            setAlertMessage('فشل في إضافة نوع المحكمة.');
            setTimeout(() => {
            setShowAlert(false);
            }, 5000);
        });
    };

    const handleDelete = (id, value, tableName) => {
        let message = '';
        switch (tableName) {
        case 'court_types':
            message = 'تصنيف المحاكم';
            break;
        case 'court_sub_types':
            message = 'التصنيف الفرعى';
            break;
        case 'court_levels':
            message = 'درجة المحكمة';
            break;
        case 'courts':
            message = 'المحكمة';
            break;
        default:
            break;
        }

        const item = {
        id,
        value,
        tableName,
        message,
        };
        setDeleteItem(item);
        setShowConfirmationModal(true);
    };
    const handleConfirmDelete = () => {
        const { id, value, tableName, message } = deleteItem;

        fetch(`${API_CONFIG.baseURL}/api/${tableName}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            value: value,
        }),
        })
        .then((response) => {
            if (response.ok) {
            setDeleteSuccess(true);
            setDeleteError(false);

            fetchCourts();
            fetchCourtTypes();
            fetchCourtSubTypes();
            fetchCourtLevels();

            setMessage(`Successfully deleted ${message}.`);
            setShowMessage(true);
            } else {
            throw new Error('فشل في عملية الDelete');
            }
        })
        .catch((error) => {
            console.error('فشل في عملية الDelete', error);
            setDeleteSuccess(false);
            setDeleteError(true);

            setMessage('Failed to delete the item.');
            setShowMessage(true);
        })
        .finally(() => {
            setTimeout(() => {
            setShowMessage(false);
            }, 5000);
            setShowConfirmationModal(false);
        });
    };

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
    };

    return (
        <div>
        <Row className="py-4">
            {showAlert && (
            <div className="alert alert-success" role="alert">
                {alertMessage}
                {showMessage}
                {message}
            </div>
            )}
            {deleteSuccess && (
            <Alert
                variant="success"
                onClose={() => setDeleteSuccess(false)}
                dismissible
            >
                تم حذف {deleteItem.tableName} "{deleteItem.value}" بنجاح.
            </Alert>
            )}
            {deleteError && (
            <Alert
                variant="danger"
                onClose={() => setDeleteError(false)}
                dismissible
            >
                فشل في حذف {deleteItem.tableName} "{deleteItem.value}". الرجاء
                المحاولة مرة أخرى لاحقًا.
            </Alert>
            )}
        </Row>
        <Row>
            <Col className="text-center">
            <h1>إعدادات المحاكم</h1>
            {error && <Alert variant="danger">{error}</Alert>}

            <ButtonGroup aria-label="Basic example">
                <Button
                onClick={() => setShowAddCourtTypeModal(true)}
                variant="success"
                >
                إضافة تصنيف المحكمة
                </Button>

                <Button
                onClick={() => setShowAddCourtLevelModal(true)}
                variant="warning"
                >
                إضافة درجة المحكمة
                </Button>
                <Button
                onClick={() => setShowAddCourtSubTypeModal(true)}
                variant="warning"
                >
                إضافة نوع فرعي للمحكمة
                </Button>
                <Button
                onClick={() => setShowAddCourtModal(true)}
                variant="success"
                >
                إضافة محكمة
                </Button>
            </ButtonGroup>
            </Col>
        </Row>
        <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
            <Modal.Header closeButton>
            <Modal.Title>تأكيد الحذف</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {deleteItem && (
                <p>
                هل أنت متأكد من حذف {deleteItem.message} "{deleteItem.value}"؟
                </p>
            )}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirmationModal}>
                إلغاء
            </Button>
            <Button variant="primary" onClick={handleConfirmDelete}>
                موافق
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
    };
    export default CourtSetting;
