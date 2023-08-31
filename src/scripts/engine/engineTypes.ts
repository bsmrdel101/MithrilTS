export type Coord = {
  x: number
  y: number
};

export type Scale = {
  w: number
  h: number
};

export type Sprite = {
  pos: Coord
  scale: Scale
  color: string
  draw: any
  destroy: any
  img?: string
};
