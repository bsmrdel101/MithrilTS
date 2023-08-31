import { GameObject } from "./gameObject";


class GameObjectManager {
  private objects: GameObject[] = [];

  add(object: GameObject) {
    this.objects.push(object);
  }

  getCollidableObjects(): GameObject[] {
    return this.objects.filter((object) => object.canCollide);
  }
}

export const gameObjectManager = new GameObjectManager();
  