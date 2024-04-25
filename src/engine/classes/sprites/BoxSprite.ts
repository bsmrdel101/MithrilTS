import { smCtx, pxCtx } from "../../canvas"

export default class BoxSprite {
  pos: Vec2
  scale: Vec2
  rotation: number
  color: string
  border: Border
  pixel: boolean

  constructor(pos: Vec2, scale: Vec2, color: string, pixel = true) {
    this.pos = pos;
    this.scale = scale;
    this.color = color;
    this.rotation = 0;
    this.border = { thickness: 0, color: 'black' };
    this.pixel = pixel;
  }

  draw() {
    if (this.pixel) {
      pxCtx.fillStyle = this.color;
      pxCtx.fillRect(this.pos.x, this.pos.y, this.scale.x, this.scale.y);
    } else {
      smCtx.fillStyle = this.color;
      smCtx.fillRect(this.pos.x, this.pos.y, this.scale.x, this.scale.y);
    }
  }

  destroy() {
    if (this.pixel)
      pxCtx.clearRect(this.pos.x, this.pos.y, this.scale.x, this.scale.y);
    else
      smCtx.clearRect(this.pos.x, this.pos.y, this.scale.x, this.scale.y);
    this.pos = { x: 0, y: 0 };
    this.scale = { x: 0, y: 0 };
    this.color = '';
  }
};
