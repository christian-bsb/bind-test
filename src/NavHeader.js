import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FileContext } from './FileContext';

import { Container, Navbar, Nav, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function NavHeader() {
  const { selectedFile, setSelectedFile } = useContext(FileContext);
  const files = ['Datei A', 'Datei B', 'Datei C']; // dein Beispiel-Array

  return (
     <Navbar bg="dark" variant="dark" expand="lg">
              <Container>
                <Navbar.Brand href="#home">Meine App</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="#start">Start</Nav.Link>
                    <Nav.Link href="#funktionen">Funktionen</Nav.Link>
                    <Nav.Link href="#kontakt">Kontakt</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
  );
}

export default NavHeader;