import { canvas, setBackgroundColor } from "../canvas";
import { BoxCol } from "../engine/components/colliderContructors";
import { GameObject } from "../engine/components/gameObject";
import { BoxSprite, CirSprite } from "../engine/components/spriteConstructors";


export default function sampleScene() {
  update(() => {

  });
  
  render(() => {
    setBackgroundColor('#7dbec9');
    player.draw();
    ball.draw();
    ground.draw();
  });
  

  const player = GameObject(
    BoxSprite({ x: canvas.width / 2, y: canvas.height / 2 }, { x: 10, y: 20 }, 'white'),
    BoxCol()
  );
  player.hasGravity = true;
  const ball = GameObject(
    CirSprite({ x: 30, y: canvas.height / 2 }, { x: 10, y: 10 }, 'orange'),
    BoxCol()
  );
  ball.hasGravity = true;
  
  const ground = GameObject(
    BoxSprite({ x: 0, y: canvas.height - 10 }, { x: canvas.width, y: 20 }, 'green'),
    BoxCol()
  );
};
