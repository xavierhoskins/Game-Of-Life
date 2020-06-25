import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { randomGrid, buildGrid, neighbors } from './utils';
import { Button } from 'reactstrap';

function App() {
  const canvasRef = useRef();
  const running = useRef();
  const [matrix, setMatrix] = useState(buildGrid);
  const [generation, setGeneration] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1000);
  const [gameColor, setGameColor] = useState({
    background: '#808080',
    color: '#008000',
  });

  // const nextGen = matrix.map((arr) => [...arr]);

  useEffect(() => {
    for (let col = 0; col < matrix.length; col++) {
      for (let row = 0; row < matrix[col].length; row++) {
        const cell = matrix[col][row];
        const ctx = canvasRef.current.getContext('2d');

        ctx.beginPath();
        ctx.rect(col * 16, row * 16, 16, 16);
        ctx.fillStyle = cell ? gameColor.color : gameColor.background;
        ctx.fill();
        ctx.stroke();
      }
    }

    if (running.current) {
      window.setTimeout(() => {
        setGeneration(generation + 1);
        requestAnimationFrame(playClick);
      }, gameSpeed);
    }
  }, [matrix, gameColor]);

  let randomClick = () => {
    pause();

    window.setTimeout(() => {
      setMatrix(randomGrid());
      setGeneration(0);
    }, gameSpeed);
  };

  let clearClick = () => {
    pause();

    window.setTimeout(() => {
      setMatrix(buildGrid());
      setGeneration(0);
    }, gameSpeed);
  };

  let playClick = () => {
    let newMatrix = matrix.map((row, i) => {
      return [...row];
    });

    matrix.forEach((row, i) => {
      row.forEach((column, j) => {
        let cellsAround = neighbors(matrix, i, j);

        if (column === 1 && cellsAround < 2) {
          newMatrix[i][j] = 0;
        } else if (column === 1 && cellsAround > 3) {
          newMatrix[i][j] = 0;
        } else if (column === 0 && cellsAround === 3) {
          newMatrix[i][j] = 1;
        }
      });
    });
    setMatrix(newMatrix);
  };

  let canvasPainter = (event) => {
    const x = Math.floor((event.clientX - canvasRef.current.offsetLeft) / 16);
    const y = Math.floor((event.clientY - canvasRef.current.offsetTop) / 16);

    const newMatrix = matrix.map((row, i) => {
      return row.map((column, j) => {
        if (i === x && j === y) {
          return column === 0 ? 1 : 0;
        }
        return column;
      });
    });

    setMatrix(newMatrix);
  };

  neighbors();

  let play = () => {
    running.current = true;
    requestAnimationFrame(playClick);
    setGeneration(generation + 1);
  };

  let pause = () => {
    running.current = false;
  };

  const speed = (e) => {
    setGameSpeed(e.target.value);
  };

  const color = (e) => {
    setGameColor({ background: e.target.value, color: gameColor.color });
  };

  const pixelColor = (e) => {
    setGameColor({ background: gameColor.background, color: e.target.value });
  };

  return (
    <div className="App">
      <header className="App-header">Welcome to Xavier's Game of Life</header>
      <div className="app-container">
        <div className="canvasSection">
          <h1 className="h1">Generation : {generation} </h1>

          <div className="gameSection">
            <canvas
              width="400"
              height="400"
              ref={canvasRef}
              id="game"
              className="canvas"
              onClick={canvasPainter}
            ></canvas>
            <div className="buttonSide">
              <button>Preset 1</button>
              <button>Preset 2</button>
              <button>Preset 3</button>
              <button>Preset 4</button>
            </div>
          </div>

          <div className="buttonBottom">
            <input
              type="color"
              value={gameColor.background}
              onChange={color}
              placeholder="background"
            ></input>
            <input
              type="color"
              value={gameColor.color}
              onChange={pixelColor}
            ></input>

            <Button color="success" onClick={play}>
              Play
            </Button>
            <Button color="primary" onClick={pause}>
              Pause
            </Button>
            <Button color="warning" onClick={clearClick}>
              Clear
            </Button>
            <Button onClick={randomClick}>Random</Button>
            <select className="speeds" value={gameSpeed} onChange={speed}>
              <option value={1000}>Slow</option>
              <option value={500}>Normal</option>
              <option value={100}>Fast</option>
            </select>
          </div>
        </div>

        <div className="rulesSection">
          <h1 className="h1">Rules :</h1>
          <ul className="ul">
            <li>
              Any live cell with fewer than two live neighbours dies, as if by
              underpopulation.
            </li>
            <li>
              Any live cell with two or three live neighbours lives on to the
              next generation.
            </li>
            <li>
              Any live cell with more than three live neighbours dies, as if by
              overpopulation.
            </li>
            <li>
              Any dead cell with exactly three live neighbours becomes a live
              cell, as if by reproduction.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
