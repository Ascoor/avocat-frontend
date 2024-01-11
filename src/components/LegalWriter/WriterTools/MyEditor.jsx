import React, { useState, useRef } from 'react';
import { Container, Button, Nav, Navbar } from 'react-bootstrap';
import Editor from './EditorTools/Editor'; // Import your Editor component
import '../../../assets/css/MyEditor.css';
import Mammoth from 'mammoth';

const MyEditor = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [editorProps, setEditorProps] = useState({});
  const [editorData, setEditorData] = useState(''); // You should have editorData state to store the content.

  const fileInputRef = useRef(null);

  const handleCreateNewDoc = () => {
    setEditorProps({ action: 'createNewDoc' });
    setShowEditor(true);
  };

  const handleExportToDOCX = () => {
    Mammoth.convertToDocx({ html: editorData }) // Pass editorData here
      .then((result) => {
        // Handle the generated DOCX file here, e.g., save or download it
        const blob = new Blob([result], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const url = URL.createObjectURL(blob);
        window.open(url);
      })
      .catch((error) => {
        console.error('Error exporting to DOCX:', error);
      });
  };

  const handleFileInputChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.name.endsWith('.docx')) {
        // Handle .docx files
        const arrayBuffer = await selectedFile.arrayBuffer();
        try {
          const result = await Mammoth.convertToHtml({ arrayBuffer });
          setEditorProps({
            action: 'importDoc',
            importedDocContent: result.value, // This is your HTML content
          });
          setEditorData(result.value); // Set editorData with the imported content
          setShowEditor(true);
        } catch (error) {
          console.error('Error converting .docx to HTML:', error);
        }
      } else if (selectedFile.name.endsWith('.doc')) {
        // Handle .doc files (consider server-side processing or conversion to .docx)
        alert('The .doc format is not supported in this editor.');
      } else {
        alert('Unsupported file format.');
      }
    }
  };

  const handleImportDoc = () => {
    fileInputRef.current.click();
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  return (
    <Container>
      <Navbar bg="light" expand="lg" className="my-editor-toolbar">
        <Nav className="mr-auto">
          <Button variant="primary" onClick={handleCreateNewDoc}>
            {showEditor ? 'Hide Editor' : 'Create New Doc'}
          </Button>
          <Button variant="secondary" onClick={handleImportDoc}>
            Import Doc
          </Button>
          <Button variant="success" onClick={handleExportToDOCX}>
            Export Doc
          </Button>
        </Nav>
      </Navbar>

      {showEditor && (
        <>
          <Editor importedDocContent={editorProps.importedDocContent} editorData={editorData} />

          <div className="button-container">
            <Button variant="danger" onClick={handleCloseEditor}>
              Close Editor
            </Button>
          </div>
        </>
      )}

      <input
        type="file"
        accept=".doc, .docx, .pdf"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
    </Container>
  );
};

export default MyEditor;
