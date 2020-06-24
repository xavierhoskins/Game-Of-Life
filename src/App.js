import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { randomGrid, buildGrid, neighbors } from './utils';

function App() {
  const canvasRef = useRef();
  const [matrix, setMatrix] = useState(buildGrid);
  const [generation, setGeneration] = useState(0);

  // const nextGen = matrix.map((arr) => [...arr]);

  useEffect(() => {
    console.log('work');
    for (let col = 0; col < matrix.length; col++) {
      for (let row = 0; row < matrix[col].length; row++) {
        const cell = matrix[col][row];
        const ctx = canvasRef.current.getContext('2d');

        ctx.beginPath();
        ctx.rect(col * 40, row * 40, 40, 40);
        ctx.fillStyle = cell ? 'green' : 'grey';
        ctx.fill();
        ctx.stroke();
      }
    }
  }, [matrix]);

  let randomClick = () => {
    setMatrix(randomGrid());
  };

  let clearClick = () => {
    setMatrix(buildGrid());
    setGeneration(0);
  };

  let playClick = () => {
    const newMatrix = matrix.map((row, i) => {
      return [...row];
    });

    matrix.forEach((row, i) => {
      row.forEach((column, j) => {
        let cellsAround = neighbors(matrix, i, j);
        console.log(cellsAround, i, j);
        if (column === 1 && cellsAround < 2) {
          newMatrix[i][j] = 0;
        } else if (column === 1 && cellsAround > 3) {
          newMatrix[i][j] = 0;
        } else if (column === 0 && cellsAround === 3) {
          console.log('hello');
          newMatrix[i][j] = 1;
        }
      });
    });
    setMatrix(newMatrix);
    setGeneration(generation + 1);
  };

  let canvasPainter = (event) => {
    const x = Math.floor((event.clientX - canvasRef.current.offsetLeft) / 40);
    const y = Math.floor((event.clientY - canvasRef.current.offsetTop) / 40);
    console.log('clicked', x, y, matrix);

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

  // useEffect(() => {
  //   for (let col = 0; col < matrix.length; col++) {
  //     for (let row = 0; row < matrix[col].length; row++) {
  //       const cell = matrix[col][row];
  //       let numNeighbours = 0;
  //       for (let i = -1; i < 2; i++) {
  //         for (let j = -1; j < 2; j++) {
  //           if (i === 0 && j === 0) {
  //             continue;
  //           }
  //           const x_cell = col + i;
  //           const y_cell = row + j;

  //           if (x_cell >= 0 && y_cell >= 0 && x_cell < 10 && y_cell < 10) {
  //             const currentNeighbour = matrix[col + i][row + j];
  //             numNeighbours += currentNeighbour;
  //           }
  //         }
  //       }

  //       // rules
  //       if (cell === 1 && numNeighbours < 2) {
  //         nextGen[col][row] = 0;
  //       } else if (cell === 1 && numNeighbours > 3) {
  //         nextGen[col][row] = 0;
  //       } else if (cell === 0 && numNeighbours === 3) {
  //         nextGen[col][row] = 1;
  //       }
  //     }

  //     return nextGen;
  //   }
  // });
  return (
    <div className="App">
      <header className="App-header">Welcome to Xavier's Game of Life</header>
      <div className="app-container">
        <div className="canvasSection">
          <h1>Generation : {generation} </h1>

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
            <button onClick={playClick}>Play</button>
            <button>Pause</button>
            <button onClick={clearClick}>Clear</button>
            <button onClick={randomClick}>Random</button>
          </div>
        </div>

        <div className="rulesSection">
          <h1>Rules :</h1>
          <ul>
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
