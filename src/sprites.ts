import { canvas } from "./engine/canvas";
import BoxSprite from "./engine/classes/sprites/BoxSprite";
import ImgSprite from "./engine/classes/sprites/ImgSprite";

export const Sprites = (): any => {
  const center = getCenter();
  return {
    player: new ImgSprite('/images/player_idle.png', center, { x: 35, y: 30 }, { x: 0, y: 0 }, { x: 35, y: 28 }),
    ground: new BoxSprite({ x: 15, y: canvas.height - 20}, { x: canvas.width - 30, y: 20 }, 'green'),
  };
};
