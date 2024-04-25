import { smCtx, pxCtx } from "../../canvas"

export default class ImgSprite {
  pos: Vec2
  scale: Vec2
  subPos: Vec2
  subScale: Vec2
  rotation: number
  url: string
  border: Border
  pixel: boolean

  constructor(url: string, pos: Vec2, scale: Vec2, subPos?: Vec2, subScale?: Vec2, pixel = true) {
    this.pos = pos;
    this.scale = scale;
    this.subPos = subPos;
    this.subScale = subScale;
    this.url = url;
    this.rotation = 0;
    this.border = { thickness: 0, color: 'transparent' };
    this.pixel = pixel;
  }

  draw() {
    const img = new Image();
    img.src = this.url;
    if (this.subPos && this.subScale) {
      if (this.pixel) {
        pxCtx.drawImage(img, this.subPos.x, this.subPos.y, this.subScale.x, this.subScale.y, this.pos.x, this.pos.y, this.scale.x, this.scale.y);
      } else {
        smCtx.drawImage(img, this.subPos.x, this.subPos.y, this.subScale.x, this.subScale.y, this.pos.x, this.pos.y, this.scale.x, this.scale.y);
      }
    } else {
      if (this.pixel) {
        pxCtx.drawImage(img, this.pos.x, this.pos.y, this.scale.x, this.scale.y);
      } else {
        smCtx.drawImage(img, this.pos.x, this.pos.y, this.scale.x, this.scale.y);
      }
    }
  }

  destroy() {
    if (this.pixel)
      pxCtx.clearRect(this.pos.x, this.pos.y, this.scale.x, this.scale.y);
    else
      smCtx.clearRect(this.pos.x, this.pos.y, this.scale.x, this.scale.y);
    this.pos = { x: 0, y: 0 };
    this.scale = { x: 0, y: 0 };
    this.url = '';
  }
};
