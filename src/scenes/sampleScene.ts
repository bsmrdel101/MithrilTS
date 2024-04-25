import { clamp } from "../engine/engineUtils";
import Ground from "../gameObjects/Ground";
import Player from "../gameObjects/Player";


export default function sampleScene() {
  update(() => {
    // handleMovement();
  });
  
  render(() => {
    setBackgroundColor('#7dbec9');
    player.draw();
    ground.draw();
  });

  const player = new Player();
  const ground = new Ground();

  const moveSpeed = 1;
  const maxSpeed = 30;
  const jumpStrength = 5;


  const handleMovement = () => {
    // Get player x velocity
    player.velocity.x = clamp(player.velocity.x + moveSpeed, 0, maxSpeed);

    // Move player
    if (keysPressed['a'] || keysPressed['ArrowLeft']) {
      player.sprite.pos.x -= player.velocity.x / player.friction;
    } else if (keysPressed['d'] || keysPressed['ArrowRight']) {
      player.sprite.pos.x += player.velocity.x / player.friction;
    } else {
      player.velocity.x = 0;
    }
  };
};
