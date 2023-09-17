import { ctx } from "../../canvas"

export default class ImgSprite {
  pos: Vec2
  scale: Vec2
  subPos: Vec2
  subScale: Vec2
  rotation: number
  url: string
  border: Border

  constructor(url: string, pos: Vec2, scale: Vec2, subPos?: Vec2, subScale?: Vec2) {
    this.pos = pos;
    this.scale = scale;
    this.subPos = subPos;
    this.subScale = subScale;
    this.url = url;
    this.rotation = 0;
    this.border = { thickness: 0, color: 'transparent' };
  }

  draw() {
    const img = new Image();
    img.src = this.url;
    if (this.subPos && this.subScale) {
      ctx.drawImage(img, this.subPos.x, this.subPos.y, this.subScale.x, this.subScale.y, this.pos.x, this.pos.y, this.scale.x, this.scale.y);
    } else {
      ctx.drawImage(img, this.pos.x, this.pos.y, this.scale.x, this.scale.y);
    }
  
    ctx.beginPath();
    ctx.lineWidth = this.border.thickness;
    ctx.strokeStyle = this.border.color;
    ctx.rect(this.pos.x, this.pos.y, this.scale.x, this.scale.y);
    ctx.stroke();
    ctx.closePath();
  }

  destroy() {
    ctx.clearRect(this.pos.x, this.pos.y, this.scale.x, this.scale.y);
    this.pos = { x: 0, y: 0 };
    this.scale = { x: 0, y: 0 };
    this.url = '';
  }
};
