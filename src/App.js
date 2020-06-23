import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">Welcome to Xavier's Game of Life</header>
      <div className="app-container">
        <div className="canvasSection">
          <h1>Generation :</h1>

          <div className="gameSection">
            <canvas id="game" className="canvas"></canvas>
            <div className="buttonSide">
              <button>Preset 1</button>
              <button>Preset 2</button>
              <button>Preset 3</button>
              <button>Preset 4</button>
            </div>
          </div>

          <div className="buttonBottom">
            <button>Play</button>
            <button>Pause</button>
            <button>Stop</button>
          </div>
        </div>

        <div className="rulesSection">
          <h1>Rules :</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
