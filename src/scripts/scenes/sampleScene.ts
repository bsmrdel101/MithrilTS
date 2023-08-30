import { canvas, onEvent, render, setBackgroundColor, update } from "../canvas";
import { Rect } from "../engine/components/rectComponent";


export default function sampleScene() {
  update(() => {
    
  });

  render(() => {
    setBackgroundColor('#7dbec9');
    const player = new Rect({ x: canvas.width / 2, y: canvas.height / 2 }, { w: 10, h: 20 }, 'white').draw();
  });
};
