import React from 'react';
import terminalLogo from './terminal-logo.png';
import reactLogo from './react-logo.svg';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={terminalLogo} className="Terminal-logo" alt="terminal-logo" />
        <span className="Big-plus">+</span>
        <img src={reactLogo} className="React-logo" alt="react-logo" />
        <p>
          React App deployed on IPFS through Terminal
        </p>
        <a
          className="App-link"
          href="https://docs.terminal.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More About Terminal
        </a>
      </header>
    </div>
  );
}

export default App;
