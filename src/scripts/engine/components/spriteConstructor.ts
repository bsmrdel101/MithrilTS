import { ctx } from "../../canvas";
import { Coord, Scale } from "../engineTypes";


export const createSpriteRect = (pos: Coord, scale: Scale, color: string, img?: string) => {
  return {
    pos: pos,
    scale: scale,
    color: color,
    img: img,
    draw: function() {
      ctx.fillStyle = this.color;
      if (this.img) {
        const img = new Image();
        img.src = this.img;
        ctx.drawImage(img, this.pos.x, this.pos.y, this.scale.w, this.scale.h);
      } else {
        ctx.fillRect(this.pos.x, this.pos.y, this.scale.w, this.scale.h);
      }
    },
    destroy: function() {
      ctx.clearRect(this.pos.x, this.pos.y, this.scale.w, this.scale.h);
      this.pos = { x: 0, y: 0 };
      this.scale = { w: 0, h: 0 };
      this.color = '';
      this.img = '';
    }
  };
};
