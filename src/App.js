import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';

import { Container, Navbar, Nav, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';

import { FileProvider } from './FileContext';
import { LogProvider } from './LogContext';
import FileList from './FileList';
import TextContent from './TextContent';
import MessageTabs from './MessageTabs';
import GridView from './GridView';
import NavbarWithSearch from './NavbarWithSearch';

function App() {
  return (
   <>
   <LogProvider>
   <FileProvider>
        <NavbarWithSearch/>
        <Container className="mt-4">
        <FileList />
         <GridView />
          <MessageTabs/>
        </Container>
        </FileProvider>
        </LogProvider>
      </>
  );
}

export default App;
