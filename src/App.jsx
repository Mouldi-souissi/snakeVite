import { useContext } from "react";
import "./App.css";
import GameGrid from "./GameGrid";
import { gameContext } from "./gameContext";

function App() {
  const { snakeLength, move } = useContext(gameContext);
  const handleClick = (direction) => {
    move(direction);
  };
  return (
    <div className="App">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between my-5">
          <h1 className="display-1">Snake</h1>
          <div className="d-flex align-items-center justify-content-center gap-2 ">
            <button className="btn btn-dark" onClick={() => handleClick("up")}>
              <div className="arrow">&#8593;</div>
            </button>
            {/* <div className="d-flex gap-2"> */}
            <button
              className="btn btn-dark"
              onClick={() => handleClick("left")}
            >
              <div className="arrow">&#x2190;</div>
            </button>
            <button
              className="btn btn-dark"
              onClick={() => handleClick("down")}
            >
              <div className="arrow">&#8595;</div>
            </button>
            <button
              className="btn btn-dark"
              onClick={() => handleClick("right")}
            >
              <div className="arrow">&#8594;</div>
            </button>
            {/* </div> */}
          </div>
          <h1 className="display-4 text-center tomato"> {snakeLength - 2}</h1>
        </div>
        <GameGrid />
      </div>
    </div>
  );
}

export default App;
