// AddDocSubType.js
import React, { useState } from 'react';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';
import API_CONFIG from '../../../config.js';
const AddDocSubType = ({ onAddDocSubType, docTypes }) => {
    const [name, setName] = useState('');
    const [selectedDocType, setSelectedDocType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_CONFIG.baseURL + '/api/doc-sub-types', { name, docTypeId: selectedDocType });
            onAddDocSubType(response.data); 
            setName('');
            setSelectedDocType('');
        } catch (error) {
            console.error('Error adding DocSubType:', error);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Add DocSubType</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="docSubTypeName" className="form-label">DocSubType Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="docSubTypeName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="docTypeSelect" className="form-label">DocType</label>
                        <select
                            className="form-select"
                            id="docTypeSelect"
                            value={selectedDocType}
                            onChange={(e) => setSelectedDocType(e.target.value)}
                        >
                            <option value="">Select a DocType</option>
                            {docTypes.map((docType) => (
                                <option key={docType.id} value={docType.id}>{docType.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
            <Card.Footer>
                <h5>Doc Types and Sub Types</h5>
                <ListGroup>
                    {docTypes.map((docType) => (
                        <ListGroup.Item key={docType.id}>
                            <strong>{docType.name}</strong>
                            <ul>
                                {docType.docSubTypes.map((subType) => (
                                    <li key={subType.id}>{subType.name}</li>
                                ))}
                            </ul>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Footer>
        </div>
    );
};

export default AddDocSubType;
