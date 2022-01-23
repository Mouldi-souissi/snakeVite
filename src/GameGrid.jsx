import { useEffect, React, useContext } from "react";
import { gameContext } from "./gameContext";

const GameGrid = () => {
  const { grid, move } = useContext(gameContext);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "ArrowRight") {
        move("right");
      }
      if (e.code === "ArrowLeft") {
        move("left");
      }
      if (e.code === "ArrowDown") {
        move("down");
      }
      if (e.code === "ArrowUp") {
        move("up");
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [move]);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="grid">
        {grid.map((square, i) => (
          <div
            key={i}
            className={`square ${square.isSnake && "snake"} ${
              square.isSnake && square.part === "head" && "head"
            } ${square.isFood && "food"}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default GameGrid;
