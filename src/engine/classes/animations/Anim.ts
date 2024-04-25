import { pxCtx, smCtx } from "../../canvas";

interface AnimData {
  spriteSheet: string
  frameRate?: number
  frameDuration?: number
  frameWidth?: number
  frameHeight?: number
  sheetHeightOffset?: number
  pos: Vec2
  scale: Vec2
  numFrames?: number
  pixel?: boolean
}


export default class Anim {
  spriteSheet: HTMLImageElement;
  frameRate: number;
  frameDuration: number;
  frameWidth: number;
  frameHeight: number;
  numFrames: number;
  sheetHeightOffset: number;
  pos: Vec2;
  scale: Vec2;
  currentFrame: number;
  pixel: boolean;

  constructor(animData: AnimData) {
    const { spriteSheet, frameRate, frameDuration, frameWidth, frameHeight, numFrames, sheetHeightOffset, pos, scale, pixel } = animData;
    const img = new Image();
    img.src = spriteSheet;
    this.spriteSheet = img;
    this.frameRate = frameRate || 6;
    this.frameDuration = (frameDuration || 1000) / frameRate;
    this.frameWidth = frameWidth || 86;
    this.frameHeight = frameHeight || 86;
    this.numFrames = numFrames || 0;
    this.currentFrame = numFrames;
    this.sheetHeightOffset = sheetHeightOffset || 0;
    this.pos = pos;
    this.scale = scale;
    this.pixel = pixel || true;
  }
  
  draw() {
    if (this.frameRate) {
      if (this.pixel) {
        pxCtx.clearRect(this.pos.x, this.pos.y, this.scale.x, this.scale.y);
        pxCtx.drawImage(
          this.spriteSheet,
          this.currentFrame * this.frameWidth,
          this.sheetHeightOffset,
          this.frameWidth,
          this.frameHeight,
          this.pos.x,
          this.pos.y,
          this.scale.x,
          this.scale.y
        );
      } else {
        smCtx.clearRect(this.pos.x, this.pos.y, this.scale.x, this.scale.y);
        smCtx.drawImage(
          this.spriteSheet,
          this.currentFrame * this.frameWidth,
          this.sheetHeightOffset,
          this.frameWidth,
          this.frameHeight,
          this.pos.x,
          this.pos.y,
          this.scale.x,
          this.scale.y
        );
      }
    }
    
    this.currentFrame++;
    if (this.currentFrame >= this.numFrames) this.currentFrame = 0;
  }

  destroy() {

  }
}
