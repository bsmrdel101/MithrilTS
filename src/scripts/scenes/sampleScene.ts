import { canvas, setBackgroundColor } from "../canvas";
import { GameObject } from "../engine/components/gameObject";
import { BoxSprite } from "../engine/components/spriteConstructor";


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


  const player = GameObject(BoxSprite({ x: canvas.width / 2, y: canvas.height / 2 }, { x: 10, y: 20 }, 'white'));  
  player.hasGravity = true;
  const moveSpeed = 1;
  const ground = GameObject(BoxSprite({ x: 0, y: canvas.height - 20 }, { x: canvas.width, y: 20 }, 'green'));
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
      player.sprite.pos.y = canvas.height - ground.sprite.scale.y - player.sprite.scale.y;
      player.velocity.y = 0;
    }
  };

  const checkPlayerOnGround = () => {
    return player.sprite.pos.y + player.sprite.scale.y >= canvas.height - ground.sprite.scale.y && !isJumping;
  };
};
