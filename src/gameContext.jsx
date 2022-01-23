import { createContext, useState, useEffect } from "react";
import { loadGame, moveSnake } from "./gameLogic";

export const gameContext = createContext();

export const GameContextProvider = (props) => {
  const [grid, setGrid] = useState([]);
  const [previousDirection, setpreviousDirection] = useState("right");

  // load grid
  useEffect(() => {
    let grid = loadGame();
    setGrid(grid);
  }, []);

  // move snake on press
  const move = (direction) => {
    let { updatedGrid, actualDirection } = moveSnake(
      grid,
      direction,
      previousDirection
    );
    setGrid(updatedGrid);
    setpreviousDirection(actualDirection);
    console.log(updatedGrid);
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
  // }, [grid]);

  return (
    <gameContext.Provider value={{ grid, move }}>
      {props.children}
    </gameContext.Provider>
  );
};
