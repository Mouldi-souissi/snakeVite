import { useContext } from "react";
import "./App.css";
import GameGrid from "./GameGrid";
import { gameContext } from "./gameContext";

function App() {
  const { snakeLength } = useContext(gameContext);
  return (
    <div className="App">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between my-5">
          <h1 className="display-2">Snake</h1>
          <h1 className="display-4 text-center tomato"> {snakeLength - 2}</h1>
        </div>
        <GameGrid />
      </div>
    </div>
  );
}

export default App;
