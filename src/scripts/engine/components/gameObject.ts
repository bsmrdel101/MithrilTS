import { gameObjectManager } from "./gameObjectManager";

export const GameObject = (
  sprite: ImgSprite | BoxSprite | CirSprite | TriSprite | LineSprite | PolySprite,
  collider: BoxCol | CirCol | PolyCol | null
): GameObject => {
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

  const collidingWith = (otherObject: GameObject) => {
    if (!canCollide || !otherObject.canCollide) {
      return false;
    }

    // Use the provided collider for collision detection
    if (collider && otherObject.collider) {
      if (collider.type === 'box') {
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
      }
    }

    return false;
  };

  const handleCollision = (otherObject: GameObject) => {
    if (collidingWith(otherObject)) {
      // Calculate the overlap between the player and the collider
      const overlapX = Math.min(sprite.pos.x + sprite.scale.x - otherObject.sprite.pos.x, otherObject.sprite.pos.x + otherObject.sprite.scale.x - sprite.pos.x);
      const overlapY = Math.min(sprite.pos.y + sprite.scale.y - otherObject.sprite.pos.y, otherObject.sprite.pos.y + otherObject.sprite.scale.y - sprite.pos.y);
  
      // Resolve the collision by moving the player out of the collider
      if (overlapX < overlapY) {
        // Resolve horizontally
        if (sprite.pos.x < otherObject.sprite.pos.x) {
          sprite.pos.x -= overlapX;
        } else {
          sprite.pos.x += overlapX;
        }
        velocity.x = 0;
      } else {
        // Resolve vertically
        if (sprite.pos.y < otherObject.sprite.pos.y) {
          sprite.pos.y -= overlapY;
        } else {
          sprite.pos.y += overlapY;
        }
        velocity.y = 0;
      }
    }
  };

  const update = (objects: GameObject[]) => {
    const collidableObjects = objects.filter((object) => object !== gameObject && object.canCollide);

    // Check for collisions with other objects
    collidableObjects.forEach((object) => {
      if (object !== gameObject && collidingWith(object)) {
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
    collider,
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
