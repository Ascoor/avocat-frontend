import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Alert } from 'react-bootstrap';
import API_CONFIG from '../config';

const PDFUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileDetails, setFileDetails] = useState(null);
  const [jsonData, setJsonData] = useState(null); // Assuming you want to store the response here
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileDetails(null);
    setJsonData(null); // Reset JSON data
    setError('');
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      const response = await axios.post(
        `${API_CONFIG.baseURL}/api/doc_upload`,
        formData,
      );
      setFileDetails(response.data);
      setJsonData(response.data); // Assuming response data is JSON
    } catch (err) {
      setError('Error uploading file: ' + err.message);
    }
  };

  return (
    <Card>
      <Card.Header className="home-text-center">لوحة التحكم</Card.Header>
      <Card.Body>
        <Card.Title className="home-text-center">Upload Files</Card.Title>
        <Card.Text className="home-text-center">
          Please select a file to upload
        </Card.Text>
       
        <div className="mb-4 text-center">
          <input type="file" onChange={handleFileChange} accept="application/pdf" />
          <Button onClick={uploadFile} className="mt-2">Upload PDF</Button>

          {error && <Alert variant="danger">{error}</Alert>}

          {fileDetails && (
            <div className="file-details mt-3">
              <p>Filename: {fileDetails.filename}</p>
              <p>Size: {fileDetails.size} bytes</p>
              <p>Pages: {fileDetails.pages}</p>
            </div>
          )}

          {jsonData && (
            <div className="json-result mt-3">
              <h3>Upload Response (JSON):</h3>
              <pre>{JSON.stringify(jsonData, null, 2)}</pre>
            </div>
          )}
        </div>
      </Card.Body>  
    </Card>
  );
};

export default PDFUploadComponent;
