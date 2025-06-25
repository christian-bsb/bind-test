import { useState } from 'react';
import { Container, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';






function MessageTabs() {
    const [key, setKey] = useState('home');
  return (
 <Tabs
                    id="mein-tab-panel"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mt-5"
                  >
                    <Tab eventKey="home" title="Übersicht">
                      <p className="mt-3">
                        Willkommen im Tab „Übersicht“. Hier kannst du beliebige Inhalte einfügen.
                      </p>
                    </Tab>
                    <Tab eventKey="details" title="Details">
                      <p className="mt-3">
                        Im Tab „Details“ kannst du tiefergehende Informationen anzeigen lassen.
                      </p>
                    </Tab>
                    <Tab eventKey="einstellungen" title="Einstellungen">
                      <p className="mt-3">
                        Dieser Tab enthält Einstellungen oder Optionen deiner App.
                      </p>
                    </Tab>
                  </Tabs>
  );
}

export default MessageTabs;