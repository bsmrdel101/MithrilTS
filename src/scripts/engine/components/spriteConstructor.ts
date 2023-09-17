import { ctx } from "../../canvas";


export const BoxSprite = (pos: Coord, scale: Scale, color: string): BoxSprite => {
  return {
    pos: pos,
    scale: scale,
    rotation: 0,
    border: { thickness: 0, color: 'black' },
    color: color,
    draw: function() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.pos.x, this.pos.y, this.scale.x, this.scale.y);
    },
    destroy: function() {
      ctx.clearRect(this.pos.x, this.pos.y, this.scale.x, this.scale.y);
      this.pos = { x: 0, y: 0 };
      this.scale = { x: 0, y: 0 };
      this.color = '';
    }
  };
};
