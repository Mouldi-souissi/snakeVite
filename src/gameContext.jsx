import { createContext, useState, useEffect } from "react";
import { loadGame, moveSnake } from "./gameLogic";

export const gameContext = createContext();

export const GameContextProvider = (props) => {
  const [grid, setGrid] = useState([]);
  const [previousDirection, setpreviousDirection] = useState("right");
  const [isGameOver, setGameOver] = useState(false);
  const [limX, setLimX] = useState(2);
  const [limY, setLimY] = useState(2);

  const checkLim = (position, limInf, limSup) => {
    if (position < limInf || position > limSup) {
      return false;
    } else {
      return true;
    }
  };

  // load grid
  useEffect(() => {
    let grid = loadGame();
    setGrid(grid);
  }, []);

  // restart
  const restart = () => {
    let grid = loadGame();
    setGrid(grid);
    setGameOver(false);
  };

  // move snake on press
  const move = (direction) => {
    let { updatedGrid, actualDirection } = moveSnake(
      grid,
      direction,
      previousDirection
    );
    if (updatedGrid.length && actualDirection) {
      setGrid(updatedGrid);
      setpreviousDirection(actualDirection);
    } else {
      setGameOver(true);
    }
  };

  // move snake auto
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (grid.length && previousDirection) {
  //       move(previousDirection);
  //     }
  //   }, 500);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [previousDirection]);

  return (
    <gameContext.Provider value={{ grid, isGameOver, move, restart }}>
      {props.children}
    </gameContext.Provider>
  );
};
