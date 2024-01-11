import React, {useState, useEffect} from 'react';
import MyEditor from './WriterTools/MyEditor';
import {Tabs, Tab, Card, Container} from 'react-bootstrap';
import axios from 'axios';
import UploadLegalDoc from './WriterTools/uploadLegalDoc';
import API_CONFIG from '../../config';
import DocTypeManager from './WriterTools/DocTypeManager';

const LegalWriterPlatform = () => {

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
              <MyEditor />
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
