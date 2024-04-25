import GameObject from "./GameObject";

class GameObjectManager {
  private objects: GameObject[] = [];

  add(object: GameObject) {
    this.objects.push(object);
  }

  getCollidableObjects(): GameObject[] {
    return this.objects.filter((object) => object.col.canCollide && !object.col.isTrigger);
  }

  getGameObjects(): GameObject[] {
    return this.objects;
  }
}

export const gameObjectManager = new GameObjectManager();
