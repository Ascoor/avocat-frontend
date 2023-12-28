import React, { useState } from 'react';
import axios from 'axios';

const FileUploadComponent = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const uploadFiles = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    try {
      const response = await axios.post('api/doc_pdf_upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File(s) uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading file(s):', error);
    }
  };

  return (
    <div className="container mt-5" dir="rtl">
      <section className="mb-4">
        <h2 className="h1-responsive font-weight-bold text-center my-4">Upload PDF Files</h2>
        <div className="row">
          <div className="col-md-9 mb-md-0 mb-5">
            <form>
              <div className="row">
                <div className="col-md-11">
                  <div className="form-group mb-4">
                    <input type="file" multiple className="form-control" onChange={handleFileChange} />
                  </div>
                </div>
                <div className="col-md-1">
                  <button type="button" className="btn btn-primary" onClick={uploadFiles}>Upload</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FileUploadComponent;
