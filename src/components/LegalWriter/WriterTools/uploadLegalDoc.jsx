import React, {useState} from 'react';
import {Form, Button, Card} from 'react-bootstrap';
import axios from 'axios';
import API_CONFIG from '../../../config.js';
import EditorViewer from './EditorTools/EditorViewer.jsx';
const UploadLegalDoc = ({docSubTypes, docTypes}) => {
  const [selectedDocType, setSelectedDocType] = useState('');
  const [selectedDocSubType, setSelectedDocSubType] = useState('');
  const [legalDocDiscription, setLegalDocDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadResponse, setUploadResponse] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('docTypeId', selectedDocType);
    formData.append('docSubTypeId', selectedDocSubType);
    formData.append('legalDocDescription', legalDocDiscription);

    try {
      const response = await axios.post(`${API_CONFIG.baseURL}/api/legal-doc-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Document uploaded successfully!');
      setUploadResponse(response.data);
    } catch (error) {
      setError('Error uploading document: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getDocSubTypes = (docTypeId) => {
    const docType = docTypes.find(type => type.id === parseInt(docTypeId, 10));
    return docType ? docType.doc_sub_types : [];
  };

  return (
    <Card size="lg">
      <Card.Header>
        <Card.Title>Upload Legal Document</Card.Title>
      </Card.Header>
      <Card.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Legal Doc Discription</Form.Label>
            <Form.Control
              type="text"
              value={legalDocDiscription}
              onChange={(event) => setLegalDocDescription(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select a Document Type</Form.Label>
            <Form.Select
              value={selectedDocType}
              onChange={(event) => {
                setSelectedDocType(event.target.value);
                setSelectedDocSubType('');
              }}
              required
            >
              <option value="">Select a Document Type</option>
              {docTypes.map((docType) => (
                <option key={docType.id} value={docType.id}>
                  {docType.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select a DocSubType</Form.Label>
            <Form.Select
              value={selectedDocSubType}
              onChange={(event) => setSelectedDocSubType(event.target.value)}
              disabled={!selectedDocType}
              required
            >
              <option value="">Select a DocSubType</option>
              {getDocSubTypes(selectedDocType).map((docSubType) => (
                <option key={docSubType.id} value={docSubType.id}>
                  {docSubType.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Document File</Form.Label>
            <Form.Control as="input" name="file" type="file" onChange={handleFileChange} required />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || !selectedDocType || !file}
          >
            {isLoading ? 'Uploading...' : 'Upload'}
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Card.Title>Uploaded Document</Card.Title>
        <section>
          {uploadResponse && (
            <EditorViewer editorData={uploadResponse.path} />
          )}
        </section>
      </Card.Footer>
    </Card>
  );
};

export default UploadLegalDoc;
