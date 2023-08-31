import { canvas, onEvent, render, setBackgroundColor, update } from "../canvas";
import { GameObject } from "../engine/components/gameObject";
import { createSpriteRect } from "../engine/components/spriteConstructor";


export default function sampleScene() {
  update(() => {
    
  });
  
  render(() => {
    setBackgroundColor('#7dbec9');
    player.draw();
    ground.draw();
  });

  const player = new GameObject(createSpriteRect({ x: canvas.width / 2, y: canvas.height / 2 }, { w: 10, h: 20 }, 'white'));
  player.hasGravity = true;
  const ground = new GameObject(createSpriteRect({ x: 0, y: canvas.height - 20 }, { w: canvas.width, h: 20 }, 'green'));
};
