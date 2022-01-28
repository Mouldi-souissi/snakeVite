import { createContext, useState, useEffect, useCallback } from "react";
import { loadGame, moveSnake } from "./gameLogic";

export const gameContext = createContext();

export const GameContextProvider = (props) => {
  const [grid, setGrid] = useState([]);
  const [previousDirection, setPreviousDirection] = useState("right");
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
    let grid = loadGame(limX, limY);
    setGrid(grid);
  }, []);

  // restart the game
  const restart = () => {
    let grid = loadGame(limX, limY);
    setGrid(grid);
    setGameOver(false);
  };

  // move snake on press
  const move = (direction) => {
    let updatedGrid = moveSnake(grid, direction, previousDirection);
    if (updatedGrid.length) {
      setGrid(updatedGrid);
      setPreviousDirection(direction);
    } else {
      setGameOver(true);
      setPreviousDirection("right");
    }
  };

  // move snake auto
  useEffect(() => {
    const timer = setInterval(() => {
      if (grid.length && previousDirection && !isGameOver) {
        move(previousDirection);
      }
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, [previousDirection, move]);

  return (
    <gameContext.Provider value={{ grid, isGameOver, move, restart }}>
      {props.children}
    </gameContext.Provider>
  );
};
