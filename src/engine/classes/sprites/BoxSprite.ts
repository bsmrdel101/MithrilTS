import { ctx } from "../../canvas"

export default class BoxSprite {
  pos: Vec2
  scale: Vec2
  rotation: number
  color: string
  border: Border

  constructor(pos: Vec2, scale: Vec2, color: string) {
    this.pos = pos;
    this.scale = scale;
    this.color = color;
    this.rotation = 0;
    this.border = { thickness: 0, color: 'black' };
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.scale.x, this.scale.y);
  }

  destroy() {
    ctx.clearRect(this.pos.x, this.pos.y, this.scale.x, this.scale.y);
    this.pos = { x: 0, y: 0 };
    this.scale = { x: 0, y: 0 };
    this.color = '';
  }
};
