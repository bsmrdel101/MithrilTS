const GameObjectManager = () => {
  const objects: GameObject[] = [];

  const add = (object: GameObject) => {
    objects.push(object);
  }

  const getCollidableObjects = (): GameObject[] => {
    return objects.filter((obj) => obj.canCollide);
  }

  return {
    add: add,
    getCollidableObjects: getCollidableObjects,
  };
};

export const gameObjectManager = GameObjectManager();
