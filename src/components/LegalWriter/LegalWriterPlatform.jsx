import React, {useState, useEffect} from 'react';

import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

import {Tabs, Tab, Card, Container} from 'react-bootstrap';
import axios from 'axios';
import UploadLegalDoc from './WriterTools/uploadLegalDoc';
import API_CONFIG from '../../config';
import DocTypeManager from './WriterTools/DocTypeManager';

const LegalWriterPlatform = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty(),
  );
  const [key, setKey] = useState('legalDocWriter');

  const [docTypes, setDocTypes] = useState([]);
  const [docSubTypes, setDocSubTypes] = useState([]);

  // Fetch docTypes from the server
  useEffect(() => {
    const fetchDocTypes = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.baseURL}/api/doc-types`);
        const fetchedDocTypes = response.data.data;
        setDocTypes(fetchedDocTypes);
        // استخراج التصنيفات الفرعية من التصنيفات الرئيسية
        const fetchedDocSubTypes = fetchedDocTypes
          .map((docType) => docType.doc_sub_types)
          .flat();
        setDocSubTypes(fetchedDocSubTypes);
      } catch (error) {
        console.error('Error fetching doc types:', error);
        // Handle error
      }
    };

    fetchDocTypes();
  }, []);

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <Container>
      <Card className="text-center">
        <Card.Body>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="legalDocWriter" title="محرر المستندات">
              <Card className="card-body">
                <Editor
                  editorState={editorState}
                  onChange={setEditorState}
                  textAlignment="right"
                  placeholder="محرر المستندات"
                  spellCheck={true}
                  stripPastedStyles={true}
                  toolbar={{
                    options: [
                      'inline',
                      'blockType',
                      'fontSize',
                      'list',
                      'textAlign',
                      'link',
                      'embedded',
                      'emoji',
                      'image',
                      'remove',
                      'history',
                      'clear',
                      'table',
                      'header',
                      'extra',
                      'inlineToolbar',
                      'uploadImage',
                      'mediaEmbed',
                      'emoji',
                      'wordCount',
                      'code',
                      'quote',
                      'colorize',
                      'inlineStyles'
                    ],
                  }}
                  readOnly={false}
                  onEditorStateChange={handleEditorChange}
                />
              </Card>
            </Tab>
            <Tab eventKey="uploadLegalDoc" title="رفع المستندات">
              <Card className="card-body">
                <UploadLegalDoc docTypes={docTypes} />
              </Card>
            </Tab>
            <Tab eventKey="docTypeManager" title="إعدادت التصنيفات">
              <Card className="card-body">
                <DocTypeManager docTypes={docTypes} docSubTypes={docSubTypes} />
              </Card>
            </Tab>
          </Tabs>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </Container>
  );
};

export default LegalWriterPlatform;
