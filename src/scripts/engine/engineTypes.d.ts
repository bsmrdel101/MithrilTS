declare const update: any;
declare const render: any;
declare const onEvent: any;

type Coord = {
  x: number
  y: number
};

type Scale = {
  w: number
  h: number
};

type Sprite = {
  pos: Coord
  scale: Scale
  color: string
  draw: any
  destroy: any
  img?: string
};
