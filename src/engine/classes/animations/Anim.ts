import { pxCanvas, pxCtx, smCanvas, smCtx } from "../../canvas";

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

  constructor(spriteSheet: string, frameRate = 6, frameDuration = 1000, frameWidth = 86, frameHeight = 86, sheetHeightOffset = 0, pos: Vec2, scale: Vec2, numFrames = 0, pixel = true) {
    const img = new Image();
    img.src = spriteSheet;
    this.spriteSheet = img;
    this.frameRate = frameRate;
    this.frameDuration = frameDuration / frameRate;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.numFrames = numFrames;
    this.currentFrame = numFrames;
    this.pixel = pixel;
    this.sheetHeightOffset = sheetHeightOffset;
    this.pos = pos;
    this.scale = scale;
  }

  private drawFrame() {
    pxCtx.clearRect(0, 0, pxCanvas.width, pxCanvas.height);
    smCtx.clearRect(0, 0, smCanvas.width, smCanvas.height);

    if (this.pixel) {
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
    
    this.currentFrame++;
    if (this.currentFrame >= this.numFrames) this.currentFrame = 0;
    setTimeout(this.drawFrame, this.frameDuration);
  };

  draw() {
    window.requestAnimationFrame(this.drawFrame);
  }
}
