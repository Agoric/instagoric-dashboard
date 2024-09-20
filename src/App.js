import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="top-bar">
      <h1 className="title">My Application</h1>
    </div>
    <div className="App">
      <Dashboard showMainnet={true} />
    </div>
  );
}

export default App;
