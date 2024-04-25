import { clamp } from "../utils";
import Ground from "../gameObjects/Ground";
import Player from "../gameObjects/Player";
import Anim from "../engine/classes/animations/Anim";


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
  const playerIdle = new Anim({
    spriteSheet: '/images/player_idle.png',
    frameDuration: 1000,
    frameWidth: 39,
    frameHeight: 28,
    sheetHeightOffset: 0,
    pos: player.sprite.pos,
    scale: { x: 39, y: 28 },
    numFrames: 20
  });
  player.setAnim(playerIdle);

  const moveSpeed = 1;
  const maxSpeed = 30;
  const jumpStrength = 5;


  const handleMovement = () => {
    player.velocity.x = clamp(player.velocity.x + moveSpeed, 0, maxSpeed);

    if (keysPressed['a'] || keysPressed['ArrowLeft']) {
      player.sprite.pos.x -= player.velocity.x / player.friction;
    } else if (keysPressed['d'] || keysPressed['ArrowRight']) {
      player.sprite.pos.x += player.velocity.x / player.friction;
    } else {
      player.velocity.x = 0;
    }
  };
};
