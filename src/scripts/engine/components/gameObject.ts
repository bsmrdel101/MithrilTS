import { gameObjectManager } from "./gameObjectManager";

export const GameObject = (sprite: ImgSprite | BoxSprite | CirSprite | TriSprite | LineSprite | PolySprite): GameObject => {
  let hasGravity = false;
  let canCollide = true;
  let canTrigger = false;
  let weight = 0.15;
  let velocity: Coord = { x: 0, y: 0 };
  let isColliding = false;

  const applyGravity = () => {
    if (gameObject.hasGravity && !isColliding) {
      // Update the position based on velocity
      sprite.pos.x += velocity.x;
      sprite.pos.y += velocity.y;
      velocity.y += weight;
    }
  };

  const collidesWith = (otherObject: GameObject) => {
    if (!canCollide || !otherObject.canCollide) {
      return false;
    }

    const thisBoundingBox = {
      x: sprite.pos.x,
      y: sprite.pos.y,
      width: 'scale' in sprite ? sprite.scale.x : 0,
      height: 'scale' in sprite ? sprite.scale.y : 0,
    };

    const otherBoundingBox = {
      x: otherObject.sprite.pos.x,
      y: otherObject.sprite.pos.y,
      width: 'scale' in otherObject.sprite ? otherObject.sprite.scale.x : 0,
      height: 'scale' in otherObject.sprite ? otherObject.sprite.scale.y : 0,
    };

    return (
      thisBoundingBox.x < otherBoundingBox.x + otherBoundingBox.width &&
      thisBoundingBox.x + thisBoundingBox.width > otherBoundingBox.x &&
      thisBoundingBox.y < otherBoundingBox.y + otherBoundingBox.height &&
      thisBoundingBox.y + thisBoundingBox.height > otherBoundingBox.y
    );
  };

  const handleCollision = (otherObject: GameObject) => {
    if (collidesWith(otherObject)) {
      velocity.y = -velocity.y * 0.5; // Reverse and reduce velocity
    }
  };

  const update = (objects: GameObject[]) => {
    const collidableObjects = objects.filter((object) => object !== gameObject && object.canCollide);

    // Check for collisions with other objects
    collidableObjects.forEach((object) => {
      if (object !== gameObject && collidesWith(object)) {
        handleCollision(object);
        isColliding = true;
      } else {
        isColliding = false;
      }
    });
  };

  const draw = () => {
    applyGravity();
    sprite.draw();
  };

  const destroy = () => {
    sprite.destroy();
  };

  const gameObject: GameObject = {
    sprite,
    collider: null,
    hasGravity,
    canCollide,
    canTrigger,
    weight,
    velocity,
    onClick: () => {},
    onCol: () => {},
    onTrig: () => {},
    update,
    draw,
    destroy,
  };

  gameObjectManager.add(gameObject);
  return gameObject;
};
