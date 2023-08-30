import { ctx } from "../../canvas";
import { Coord, Scale } from "../engineTypes";


export class Rect {
  pos: Coord;
  scale: Scale;
  color: string;
  img: string;

  constructor(pos: Coord, scale: Scale, color: string, img?: string) {
    this.pos = pos;
    this.scale = scale;
    this.color = color;
    this.img = img;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.scale.w, this.scale.h);
  }
}