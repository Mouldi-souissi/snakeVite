import "./App.css";
import GameGrid from "./GameGrid";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="d-flex align-items-center justify-content-center my-5">
          <h1 className="display-2 text-center">Snake</h1>
        </div>
        <GameGrid />
      </div>
    </div>
  );
}

export default App;
