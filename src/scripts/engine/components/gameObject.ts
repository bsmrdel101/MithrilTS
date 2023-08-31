import { Coord, Sprite } from "../engineTypes";
import { gameObjectManager } from "./gameObjectManager";


export class GameObject {
  sprite: Sprite;
  hasGravity = false;
  canCollide = true;
  weight = 0.3;
  velocity: Coord = { x: 0, y: 0 };

  private isColliding = false;

  constructor(sprite: Sprite) {
    this.sprite = sprite;
    gameObjectManager.add(this);
  }

  private applyGravity() {
    if (this.hasGravity && !this.isColliding) {    
      // Update the position based on velocity
      this.sprite.pos.x += this.velocity.x;
      this.sprite.pos.y += this.velocity.y;
      this.velocity.y += this.weight;
    }
  }

  private collidesWith(otherObject: GameObject) {
    if (!this.canCollide || !otherObject.canCollide) {
      return false;
    }

    const thisBoundingBox = {
      x: this.sprite.pos.x,
      y: this.sprite.pos.y,
      width: this.sprite.scale.w,
      height: this.sprite.scale.h
    };

    const otherBoundingBox = {
      x: otherObject.sprite.pos.x,
      y: otherObject.sprite.pos.y,
      width: otherObject.sprite.scale.w,
      height: otherObject.sprite.scale.h
    };

    return (
      thisBoundingBox.x < otherBoundingBox.x + otherBoundingBox.width &&
      thisBoundingBox.x + thisBoundingBox.width > otherBoundingBox.x &&
      thisBoundingBox.y < otherBoundingBox.y + otherBoundingBox.height &&
      thisBoundingBox.y + thisBoundingBox.height > otherBoundingBox.y
    );
  }

  private handleCollision(otherObject: GameObject) {
    if (this.collidesWith(otherObject)) {
      this.velocity.y = -this.velocity.y * 0.5; // Reverse and reduce velocity
    }
  }

  update(objects: GameObject[]) {
    const collidableObjects = objects.filter(object => object !== this && object.canCollide);

    // Check for collisions with other objects
    collidableObjects.forEach((object) => {
      if (object !== this && this.collidesWith(object)) {
        this.handleCollision(object);
        this.isColliding = true;
      } else {
        this.isColliding = false;
      }
    });
  }

  draw() {
    this.applyGravity();
    this.sprite.draw();
  }

  destroy() {
    this.sprite.destroy();
  }
}
