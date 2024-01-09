import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Form, Modal } from 'react-bootstrap';
import API_CONFIG from '../../../config';
import axios from 'axios';

const DocTypeManager = ({ show, onHide, docTypes, fetchDocTypes }) => {
    const [showModal, setShowModal] = useState(false);
    const [currentDocType, setCurrentDocType] = useState(null);
    const [currentDocSubType, setCurrentDocSubType] = useState(null);
    const [newName, setNewName] = useState('');

    useEffect(() => {
        fetchDocTypes();
    }, []);

    const handleAddOrUpdate = async () => {
        const payload = { name: newName };
        const url = currentDocType
            ? `${API_CONFIG.baseURL}/doc-types/${currentDocType.id}`
            : `${API_CONFIG.baseURL}/doc-types`;

        try {
            if (currentDocType) {
                await axios.put(url, payload);
            } else {
                await axios.post(url, payload);
            }
            setShowModal(false);
            setNewName('');
            fetchDocTypes();
        } catch (error) {
            console.error('Operation failed:', error);
        }
    };

    const handleDelete = async (docTypeId, docSubTypeId) => {
        const url = docSubTypeId
            ? `${API_CONFIG.baseURL}/doc-sub-types/${docSubTypeId}`
            : `${API_CONFIG.baseURL}/doc-types/${docTypeId}`;

        try {
            await axios.delete(url);
            fetchDocTypes();
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };
    return (
        <div>
            <Button onClick={() => setShowModal(true)}>Add New DocType</Button>
            <Card>
                <ListGroup>
                    {docTypes.map(docType => (
                        <ListGroup.Item key={docType.id}>
                            {docType.name}
                            <Button onClick={() => { setCurrentDocType(docType); setShowModal(true); }}>Edit</Button>
                            <Button onClick={() => handleDelete(docType.id)}>Delete</Button>
                            <ul>
                                {docType.docSubTypes.map(subType => (
                                    <li key={subType.id}>
                                        {subType.name}
                                        <Button onClick={() => { setCurrentDocSubType(subType); setShowModal(true); }}>Edit</Button>
                                        <Button onClick={() => handleDelete(docType.id, subType.id)}>Delete</Button>
                                    </li>
                                ))}
                            </ul>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentDocType || currentDocSubType ? 'Edit' : 'Add New'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" onClick={handleAddOrUpdate}>
                            {currentDocType || currentDocSubType ? 'Update' : 'Add'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DocTypeManager;
