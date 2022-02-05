import { useEffect, React, useContext } from "react";
import { gameContext } from "./gameContext";

const GameGrid = () => {
  const { grid, move, isGameOver, restart } = useContext(gameContext);
  // handle direction key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isGameOver) {
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
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [move]);

  const squares = () => {
    return grid.map((square, i) => (
      <div
        key={i}
        className={`square ${square.isSnake && "snake"} ${
          square.isSnake && square.part === 1 && "head"
        } ${square.isFood && "food"}`}
      ></div>
    ));
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="grid">{!isGameOver && squares()}</div>
      {isGameOver && (
        <div className="position-absolute top-50 start-50 translate-middle d-flex flex-column">
          <div className="display-4">GameOver</div>
          <button className="btn btn-dark btn-lg" onClick={restart}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default GameGrid;
