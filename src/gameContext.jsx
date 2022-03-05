import { createContext, useState, useEffect, useCallback } from "react";
import { loadGame, moveSnake } from "./gameLogic";

export const gameContext = createContext();

export const GameContextProvider = (props) => {
  const [grid, setGrid] = useState([]);
  const [previousDirection, setPreviousDirection] = useState("right");
  const [isGameOver, setGameOver] = useState(false);
  const [limX, setLimX] = useState(4);
  const [limY, setLimY] = useState(4);
  const [snakeLength, setSnakeLength] = useState(2);

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
    let { updatedGrid, snakeLength } = moveSnake(
      grid,
      direction,
      previousDirection
    );
    if (updatedGrid.length) {
      setGrid(updatedGrid);
      setPreviousDirection(direction);
      setSnakeLength(snakeLength);
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
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [previousDirection, move]);

  return (
    <gameContext.Provider
      value={{ grid, isGameOver, snakeLength, move, restart }}
    >
      {props.children}
    </gameContext.Provider>
  );
};
