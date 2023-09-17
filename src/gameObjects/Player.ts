import GameObject from "../engine/classes/gameObjects/GameObject";
import { Sprites } from "../sprites";


export default class Player extends GameObject {
  constructor() {
    const sprites = Sprites();
    super(sprites.player);
    this.hasGravity = true;
    
    this.onCol = (side: string, obj: GameObject) => {
      this.handleCollision(side, obj);
    }
  }

  private handleCollision(side: string, obj: GameObject) {
    console.log('collide');
    if (side === 'B') {
      this.sprite.pos.y = obj.sprite.pos.y - this.sprite.scale.y;
      this.velocity.y = 0;
    }
  }
}
