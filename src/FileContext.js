// FileContext.js
import { createContext, useState } from 'react';

export const FileContext = createContext();

export function FileProvider({ children }) {
  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <FileContext.Provider value={{ fileList, setFileList, selectedFile, setSelectedFile }}>
      {children}
    </FileContext.Provider>
  );
}
