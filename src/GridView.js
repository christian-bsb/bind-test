import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FileContext } from './FileContext';
import XmlTree from './XmlTree';

function GridView() {
  const { selectedFile } = useContext(FileContext);
  const [doc1, setDoc1] = useState(null);
  const [doc2, setDoc2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedFile) {
        try {
          const [res1, res2] = await Promise.all([
            fetch(selectedFile.path1),
            fetch(selectedFile.path2),
          ]);
          const [text1, text2] = await Promise.all([res1.text(), res2.text()]);
          const parser = new DOMParser();
          const xmlDoc1 = parser.parseFromString(text1, 'application/xml');
          const xmlDoc2 = parser.parseFromString(text2, 'application/xml');
          setDoc1(xmlDoc1.documentElement);
          setDoc2(xmlDoc2.documentElement);
        } catch (err) {
          console.error('Fehler beim Parsen:', err);
        }
      }
    };

    fetchData();
  }, [selectedFile]);

  if (!selectedFile) return null;

  const scrollStyle = {
    maxHeight: '600px',
    overflow: 'auto',
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
  };

  return (
    <Row className="mt-3">
      <Col md={6}>
        <Card>
          <Card.Header>Version 1</Card.Header>
          <Card.Body style={scrollStyle}>
            {doc1 ? <XmlTree node={doc1} diffType="original" /> : 'Lade...'}
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <Card.Header>Version 2 (Strukturvergleich)</Card.Header>
          <Card.Body style={scrollStyle}>
            {doc2 ? <XmlTree node={doc2} diffType="added" /> : 'Lade...'}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default GridView;
