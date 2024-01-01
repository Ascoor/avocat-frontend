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
      setJsonData(response.data); // Assuming response data contains the text from pages
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
          <input
            type="file"
            onChange={handleFileChange}
            accept="application/pdf"
          />
          <Button onClick={uploadFile} className="mt-2">
            Upload PDF
          </Button>

          {error && <Alert variant="danger">{error}</Alert>}

          {fileDetails && (
            <div className="file-details mt-3">
              <p>Filename: {fileDetails.filename}</p>
              <p>Size: {fileDetails.size} bytes</p>
              <p>Pages: {fileDetails.pages}</p>
            </div>
          )}

          {jsonData && jsonData.text_from_pages && (
            <div className="page-texts">
              {jsonData.text_from_pages.map((text, index) => (
                <div key={index}>
                  <h3>Text from Page {index + 1}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PDFUploadComponent;
