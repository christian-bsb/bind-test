// GridView.js
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FileContext } from './FileContext';
import { LogContext } from './LogContext';
import XmlTree from './XmlTree';
import { compareXmlSideBySide } from './compareXmlSideBySide';

function GridView() {
  const { selectedFile } = useContext(FileContext);
  const { log } = useContext(LogContext);
  const [leftTree, setLeftTree] = useState(null);
  const [rightTree, setRightTree] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedFile) return;
        log(`Lade Datei: ${selectedFile.name}`);
      try {
        const [res1, res2] = await Promise.all([
          fetch(selectedFile.path1),
          fetch(selectedFile.path2),
        ]);
        const [text1, text2] = await Promise.all([res1.text(), res2.text()]);
        const parser = new DOMParser();
        const doc1 = parser.parseFromString(text1, 'application/xml');
        const doc2 = parser.parseFromString(text2, 'application/xml');

        const [left, right] = compareXmlSideBySide(doc1.documentElement, doc2.documentElement);
        setLeftTree(left);
        setRightTree(right);
      } catch (err) {
        console.error('Fehler beim Vergleich:', err);
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
  };

  return (
    <Row className="mt-3">
      <Col md={6}>
        <Card>
          <Card.Header>Version 1</Card.Header>
          <Card.Body style={scrollStyle}>
            {leftTree ? <XmlTree node={leftTree} /> : 'Lade...'}
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <Card.Header>Version 2</Card.Header>
          <Card.Body style={scrollStyle}>
            {rightTree ? <XmlTree node={rightTree} /> : 'Lade...'}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default GridView;
