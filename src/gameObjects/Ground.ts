import GameObject from "../engine/classes/gameObjects/GameObject";
import { Sprites } from "../sprites";


export default class Ground extends GameObject {
  constructor() {
    const sprites = Sprites();
    super(sprites.ground);
  }
}
