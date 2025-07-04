import React, { useContext, useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FileContext } from './FileContext';
import { diffWords } from 'diff';
import { LogContext } from './LogContext';

function GridView() {
  const { selectedFile } = useContext(FileContext);
  const { log } = useContext(LogContext);

  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');
  const [diffResult, setDiffResult] = useState([]);

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const isSyncingRef = useRef(false);

  const diffRefs = useRef([]); // Refs zu allen Unterschieden
  const [currentDiffIndex, setCurrentDiffIndex] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedFile) {
        try {
          log(`Datei "${selectedFile.path1}" wurde ausgewählt.`);
          const res1 = await fetch(selectedFile.path1);
          const res2 = await fetch(selectedFile.path2);
          const text1 = await res1.text();
          const text2 = await res2.text();
          setContent1(text1);
          setContent2(text2);

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

  useEffect(() => {
    const syncScroll = (source, target) => {
      if (isSyncingRef.current) return;
      isSyncingRef.current = true;
      target.scrollTop = source.scrollTop;
      setTimeout(() => (isSyncingRef.current = false), 10);
    };

    const left = leftRef.current;
    const right = rightRef.current;

    if (left && right) {
      const handleLeftScroll = () => syncScroll(left, right);
      const handleRightScroll = () => syncScroll(right, left);

      left.addEventListener('scroll', handleLeftScroll);
      right.addEventListener('scroll', handleRightScroll);

      return () => {
        left.removeEventListener('scroll', handleLeftScroll);
        right.removeEventListener('scroll', handleRightScroll);
      };
    }
  }, [diffResult]);

  useEffect(() => {
    diffRefs.current = [];
    setCurrentDiffIndex(-1);
  }, [diffResult]);

  const scrollToDiff = (index) => {
    log(`scrollToDiff index "${index}" "${diffRefs.current[index]}"`);
    if (diffRefs.current[index]) {
      diffRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleNext = () => {
    if (currentDiffIndex < diffRefs.current.length - 1) {
      const newIndex = currentDiffIndex + 1;
      setCurrentDiffIndex(newIndex);
      scrollToDiff(newIndex);
    }
  };

  const handlePrev = () => {
    if (currentDiffIndex > 0) {
      const newIndex = currentDiffIndex - 1;
      setCurrentDiffIndex(newIndex);
      scrollToDiff(newIndex);
    }
  };

  const renderDiff = (diff) => {

    console.log("renderDiff:", diff);
  let refIndex = 0;
  return diff.map((part, index) => {
    const isChanged = part.added || part.removed;
    const isCurrent = part.count === currentDiffIndex;
    console.log(`renderDiff refIndex: "${refIndex}", currentDiffIndex: "${currentDiffIndex}", count: "${part.count}"`);

    const style = {
      backgroundColor: part.added ? '#d4edda' : part.removed ? '#f8d7da' : 'transparent',
      color: part.added ? '#155724' : part.removed ? '#721c24' : 'inherit',
      border: isCurrent ? '2px solid #007bff' : undefined,
      borderRadius: isCurrent ? '4px' : undefined,
      padding: isCurrent ? '2px' : undefined,
      display: 'inline',
    };

    let spanRef = null;
    if (isChanged) {
      spanRef = (el) => {
        if (el) {
          diffRefs.current[refIndex] = el;
        }
        refIndex++;
      };
    }
    
    return (
      <span key={index} style={style} ref={spanRef}>
        {part.value}
      </span>
    );
  });
};

  if (!selectedFile) return null;
  return (
    <>
      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button variant="outline-secondary" size="sm" onClick={handlePrev} disabled={currentDiffIndex <= 0}>
          ⏮ Zurück
        </Button>
        <Button variant="outline-primary" size="sm" onClick={handleNext} >
          ⏭ Weiter
        </Button>
      </div>

      <Row className="mt-2" style={{ height: '650px', overflow: 'hidden' }}>
        <Col md={6}>
          <Card>
            <Card.Header>Version 1</Card.Header>
            <Card.Body
              ref={leftRef}
              style={{
                overflowY: 'scroll',
                height: '600px',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
              }}
            >
              {content1}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Version 2</Card.Header>
            <Card.Body
              ref={rightRef}
              style={{
                overflowY: 'scroll',
                height: '600px',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
              }}
            >
              {renderDiff(diffResult)}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default GridView;
