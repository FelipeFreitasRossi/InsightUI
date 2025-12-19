import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>INSIGHT UI Dashboard</h1>
        <p>Sistema de Monitoramento IT</p>
      </header>
      <main>
        <p>Dashboard em construção...</p>
        <button onClick={() => alert('Sistema funcionando!')}>
          Testar
        </button>
      </main>
    </div>
  );
}

export default App;