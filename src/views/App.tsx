import { useEffect, useState } from "react";
import { initializeCanvas } from "../scripts/canvas";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) initializeCanvas();
  }, [gameStarted]);


  return (
    <>
      {gameStarted ?
        <canvas id="canvas"></canvas>
        :
        <button
          className="start-game-button"
          onClick={() => setGameStarted(true)}
        >
          Play Game
        </button>
      }
    </>
  );
}
