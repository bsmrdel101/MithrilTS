import Anim from "../animations/Anim"
import BoxCol from "../colliders/BoxCol"
import { gameObjectManager } from "./GameObjectManager"

export default class GameObject {
  sprite?: Sprite;
  col: BoxCol;
  hasGravity = false;
  weight = 0.15;
  friction = 15;
  velocity: Vec2 = { x: 0, y: 0 };
  isColliding = false;
  anim: Anim;
  readonly tags: string[];
  onCol: (colisionPos: ColDir, obj: GameObject) => void;

  constructor(sprite?: Sprite, col?: BoxCol) {
    this.sprite = sprite;
    this.col = col || new BoxCol();
    this.col.parent = this;
    gameObjectManager.add(this);
  }

  private applyGravity() {
    if (!this.hasGravity || this.isColliding) return;
    this.sprite.pos.y += this.velocity.y;
    this.sprite.pos.x += this.velocity.x;
    this.velocity.y += this.weight;
  }

  setAnim(anim: Anim) {
    this.anim = anim;
  }

  draw() {
    this.applyGravity();
    if (this.anim) {
      this.anim.draw();
    } else {
      this.sprite.draw();
    }
  };

  destroy() {
    this.sprite.destroy();
  };
};
