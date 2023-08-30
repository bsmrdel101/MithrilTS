import { useEffect } from "react";
import { initializeCanvas } from "../scripts/canvas";

export default function App() {
  useEffect(() => {
    initializeCanvas();
  }, []);

  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  );
}
