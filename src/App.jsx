import "./App.css";
import GameGrid from "./GameGrid";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between my-5">
          <h1>Snake</h1>
        </div>
        <GameGrid />
      </div>
    </div>
  );
}

export default App;
