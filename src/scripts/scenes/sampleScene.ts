import { canvas, setBackgroundColor } from "../canvas";
import { GameObject } from "../engine/components/gameObject";
import { createSpriteRect } from "../engine/components/spriteConstructor";


export default function sampleScene() {
  update(() => {
    handleMovement();
    handleJumping();
  });
  
  render(() => {
    setBackgroundColor('#7dbec9');
    player.draw();
    ground.draw();
  });


  const player = new GameObject(createSpriteRect({ x: canvas.width / 2, y: canvas.height / 2 }, { w: 10, h: 20 }, 'white'));
  player.hasGravity = true;
  const moveSpeed = 1;
  const ground = new GameObject(createSpriteRect({ x: 0, y: canvas.height - 20 }, { w: canvas.width, h: 20 }, 'green'));
  let keysPressed: { [key: string]: boolean } = {};
  const jumpStrength = 5;
  let isJumping = false;

  onEvent('keydown', (e: Event) => {
    keysPressed[(e as KeyboardEvent).key] = true;
  });

  onEvent('keyup', (e: Event) => {
    keysPressed[(e as KeyboardEvent).key] = false;

    if ((e as KeyboardEvent).key === 'w') {
      isJumping = false;
    }
  });

  const handleMovement = () => {
    if (keysPressed['d']) {
      player.sprite.pos.x += moveSpeed;
    }
    if (keysPressed['a']) {
      player.sprite.pos.x -= moveSpeed;
    }
  };

  const handleJumping = () => {
    // Add player weight
    player.velocity.y += player.weight;
    
    if (keysPressed['w'] && !isJumping) {
      isJumping = true;
      player.velocity.y = -jumpStrength;
    }

    if (checkPlayerOnGround()) {
      player.sprite.pos.y = canvas.height - ground.sprite.scale.h - player.sprite.scale.h;
      player.velocity.y = 0;
    }
  };

  const checkPlayerOnGround = () => {
    return player.sprite.pos.y + player.sprite.scale.h >= canvas.height - ground.sprite.scale.h && !isJumping;
  };
};
