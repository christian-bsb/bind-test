// NavbarWithSearch.js
import React, { useState, useContext } from 'react';
import { Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import { FileContext } from './FileContext';

function NavbarWithSearch() {
  const { setFileList, setSelectedFile } = useContext(FileContext);
  const [inputId, setInputId] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    // hier ein echter API-Call oder Mock-Daten
    const files = [
      {
        name: `${inputId}_bind.xml`,
        path1: `/data/v1/${inputId}_bind.xml`,
        path2: `/data/v2/${inputId}_bind.xml`,
        type: 'text/xml',
      },
      {
        name: 'Beispieldatei 2',
        path1: `/version1/${inputId}_2_v1.txt`,
        path2: `/version2/${inputId}_2_v2.txt`,
        type: 'text/plain',
      },
    ];

    setFileList(files);
    setSelectedFile(null); // Reset Auswahl bei neuer Suche
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">Meine App</Navbar.Brand>
        <Form className="d-flex ms-auto" onSubmit={handleSearch}>
          <FormControl
            type="search"
            placeholder="ID eingeben"
            className="me-2"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
          />
          <Button type="submit" variant="outline-info">Laden</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavbarWithSearch;
