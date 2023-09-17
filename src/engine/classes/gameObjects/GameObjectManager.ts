import GameObject from "./GameObject";

class GameObjectManager {
  private objects: GameObject[] = [];

  add(object: GameObject) {
    this.objects.push(object);
  }

  getCollidableObjects(): GameObject[] {
    return this.objects.filter((object) => object.collider.canCollide && !object.collider.isTrigger);
  }

  getGameObjects(): GameObject[] {
    return this.objects;
  }
}

export const gameObjectManager = new GameObjectManager();
