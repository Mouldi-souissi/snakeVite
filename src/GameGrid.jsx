import { useEffect, React, useContext, useState } from "react";
import { gameContext } from "./gameContext";

const GameGrid = () => {
  const { grid, move, isGameOver, restart } = useContext(gameContext);
  const [touchPosition, setTouchPosition] = useState(null);
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
      if (isGameOver) {
        if (e.code === "Enter") {
          restart();
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [move]);

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouchX = e.touches[0].clientX;
    const currentTouchY = e.touches[0].clientY;
    const diffX = touchDown - currentTouchX;
    const diffY = touchDown - currentTouchY;

    if (diffX > 5) {
      move("right");
    }

    if (diffX < -5) {
      move("left");
    }
    if (diffY > 5) {
      move("down");
    }

    if (diffY < -5) {
      move("up");
    }

    setTouchPosition(null);
  };

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
      <div
        className="grid"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {!isGameOver && squares()}
      </div>
      {isGameOver && (
        <div className="position-absolute top-50 start-50 translate-middle d-flex flex-column">
          <div className="display-5">GameOver</div>
          <button className="btn btn-dark btn-lg" onClick={restart}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default GameGrid;
