import GameObject from "../gameObjects/GameObject"

export default class BoxCol {
  offset: Vec2
  scale: Vec2
  canCollide = true
  isTrigger = false
  parent: GameObject

  constructor(offset?: Vec2, scale?: Vec2) {
    this.offset = offset;
    this.scale = scale;
  }

  checkCollisions(objects: GameObject[]) {
    objects.forEach((obj) => {
      if (this.parent !== obj && !this.parent.isColliding) {
        const colisionPos = this.handleCollision(this.parent, obj);
        if (colisionPos && this.parent.onCol) {
          this.parent.isColliding = true;
          this.parent.onCol(colisionPos, obj);
        }
      }
    });
  }

  private handleCollision(obj1: GameObject, obj2: GameObject): ColDir {
    const sprite1 = obj1.sprite;
    const sprite2 = obj2.sprite;
    let colDir: ColDir = null;
  
    if (
      sprite1.pos.y + sprite1.scale.y >= sprite2.pos.y &&
      sprite1.pos.y <= sprite2.pos.y + sprite2.scale.y &&
      sprite1.pos.x <= sprite2.pos.x + sprite2.scale.x &&
      sprite1.pos.x + sprite1.scale.x >= sprite2.pos.x
    ) {
      return 'B';
    }

    return colDir;
  }
};
