// MessageTabs.js
import React, { useState, useContext } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { LogContext } from './LogContext';

function MessageTabs() {
  const [key, setKey] = useState('home');
  const { logMessages } = useContext(LogContext);

  return (
    <Tabs
      id="mein-tab-panel"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mt-5"
    >
      <Tab eventKey="home" title="Log">
        <div className="mt-3" style={{ maxHeight: '200px', overflowY: 'auto', fontFamily: 'monospace' }}>
          {logMessages.length === 0 ? (
            <p>Keine Logeinträge</p>
          ) : (
            logMessages.map((msg, index) => <div key={index}>{msg}</div>)
          )}
        </div>
      </Tab>
      <Tab eventKey="details" title="Details">
        <p className="mt-3">Im Tab „Details“ kannst du tiefergehende Informationen anzeigen lassen.</p>
      </Tab>
      <Tab eventKey="einstellungen" title="Einstellungen">
        <p className="mt-3">Dieser Tab enthält Einstellungen oder Optionen deiner App.</p>
      </Tab>
    </Tabs>
  );
}

export default MessageTabs;
