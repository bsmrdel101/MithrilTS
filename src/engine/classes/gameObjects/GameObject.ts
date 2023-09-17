import BoxCol from "../colliders/BoxCol"
import BoxSprite from "../sprites/BoxSprite"
import ImgSprite from "../sprites/ImgSprite"
import { gameObjectManager } from "./GameObjectManager"

export default class GameObject {
  sprite: ImgSprite | BoxSprite
  collider: BoxCol
  hasGravity = false
  weight = 0.15
  friction = 15
  velocity: Vec2 = { x: 0, y: 0 }
  isColliding = false;
  readonly tags: string[]
  onCol: (colisionPos: 'T' | 'B' | 'L' | 'R', obj: GameObject) => void

  constructor(sprite: ImgSprite | BoxSprite, collider?: BoxCol) {
    this.sprite = sprite;
    this.collider = collider || new BoxCol();
    this.collider.parent = this;
    gameObjectManager.add(this);
  }

  private applyGravity() {
    if (!this.hasGravity || this.isColliding) return;
    this.sprite.pos.y += this.velocity.y;
    this.sprite.pos.x += this.velocity.x;
    this.velocity.y += this.weight;
  }

  draw() {
    this.applyGravity();
    this.sprite.draw();
  };

  destroy() {
    this.sprite.destroy();
  };
};
