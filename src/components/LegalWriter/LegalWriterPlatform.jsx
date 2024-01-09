    import React, { useState, useEffect } from 'react';
    import { Editor } from 'react-draft-wysiwyg';
    import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
    import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
    import { Button, Container, Modal } from 'react-bootstrap';
    import axios from 'axios';
    import UploadLegalDoc from './WriterTools/uploadLegalDoc';
    import API_CONFIG from '../../config';
    import DocTypeManager from './WriterTools/DocTypeManager';

    const LegalWriterPlatform = () => {
        const [showDocTypeManager, setShowDocTypeManager] = useState(false);
        const [showUploadModal, setShowUploadModal] = useState(false);
        const [showEditorModal, setShowEditorModal] = useState(false);
        const [editorState, setEditorState] = useState(EditorState.createEmpty());
        const [docTypes, setDocTypes] = useState([]);
        useEffect(() => {
            const fetchDocTypes = async () => {
                try {
                    const response = await axios.get(`${API_CONFIG.baseURL}/api/doc-types`);
                    setDocTypes(response.data.data);
                } catch (error) {
                    console.error('Error fetching document types:', error);
                    // Handle the error appropriately
                }
            };
    
            fetchDocTypes();
        }, []);


const toggleDocTypeManager = () => {
    setShowDocTypeManager(!showDocTypeManager);

}

        const toggleUploadModal = () => {
            setShowUploadModal(!showUploadModal);
        }


        const onEditorStateChange = (newState) => {
            setEditorState(newState);
        };

        const saveDocument = () => {
            const rawContentState = convertToRaw(editorState.getCurrentContent());
            // Implement the logic to save the document here
            console.log('Saved content:', rawContentState);
        };
        return (
            <Container>
            <Button variant="primary" onClick={() => setShowEditorModal(true)}>Open Editor</Button>
                <Button variant="primary" onClick={toggleDocTypeManager}>Manage Document Types</Button>
                <Button variant="primary" onClick={toggleUploadModal}>Upload Legal Document</Button>
{/* 
            <DocTypeManager

                show={showDocTypeManager}
                fetchDocTypes={fetchDocTypes}
                docTypes={docTypes}
                onHide={() => setShowDocTypeManager(false)}
            />

            */}
            <UploadLegalDoc
                show={showUploadModal}
                docTypes={docTypes}
                onHide={() => setShowUploadModal(false)}
            />

<Modal show={showEditorModal} onHide={() => setShowEditorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Legal Document Editor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="editor-wrapper"
                        editorClassName="editor"
                        onEditorStateChange={onEditorStateChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditorModal(false)}>Close</Button>
                    <Button variant="primary" onClick={saveDocument}>Save Document</Button>
                </Modal.Footer>
            </Modal> 
        </Container>
        );
    };

    export default LegalWriterPlatform;
