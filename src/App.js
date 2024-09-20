import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <div className="top-bar">
        <h1 className="title">My Application</h1>
      </div>
      <Dashboard showMainnet={true} />
    </div>
  );
}

export default App;
