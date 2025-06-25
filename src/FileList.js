// FileList.js
import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FileContext } from './FileContext';

function FileList() {
  const { fileList, selectedFile, setSelectedFile } = useContext(FileContext);

  return (
    <ListGroup className="mt-3">
      {fileList.map((file) => (
        <ListGroup.Item
          key={file.name}
          active={selectedFile?.name === file.name}
          onClick={() => setSelectedFile(file)}
          action
        >
          {file.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default FileList;
