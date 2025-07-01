// GridView.js
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FileContext } from './FileContext';
import { diffWords } from 'diff'; // <<< Importiere Vergleichsfunktion

function GridView() {
  const { selectedFile } = useContext(FileContext);
  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');
  const [diffResult, setDiffResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedFile) {
        try {
          const res1 = await fetch(selectedFile.path1);
          const res2 = await fetch(selectedFile.path2);
          const text1 = await res1.text();
          const text2 = await res2.text();
          setContent1(text1);
          setContent2(text2);

          // Vergleich der Inhalte
          const diff = diffWords(text1, text2);
          setDiffResult(diff);
        } catch (err) {
          setContent1('Fehler beim Laden von Version 1');
          setContent2('Fehler beim Laden von Version 2');
        }
      }
    };

    fetchData();
  }, [selectedFile]);

  if (!selectedFile) return null;

  const renderDiff = (diff) =>
    diff.map((part, index) => {
      const style = {
        backgroundColor: part.added ? '#d4edda' : part.removed ? '#f8d7da' : 'transparent',
        color: part.added ? '#155724' : part.removed ? '#721c24' : 'inherit',
      };
      return (
        <span key={index} style={style}>
          {part.value}
        </span>
      );
    });

  return (
    <Row className="mt-3" style={{ height: '500px', overflow: 'auto' }}>
      <Col md={6}>
        <Card>
          <Card.Header>Version 1</Card.Header>
          <Card.Body style={{ overflow: 'auto', height: '400px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
            {content1}
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <Card.Header>Version 2</Card.Header>
          <Card.Body style={{ overflow: 'auto', height: '400px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
            {renderDiff(diffResult)}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default GridView;
