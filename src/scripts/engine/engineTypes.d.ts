declare const update: any;
declare const render: any;
declare const onEvent: any;


type Coord = {
  x: number
  y: number
};

type Scale = {
  x: number
  y: number
};

type Border = {
  thickness: number
  color: string
};

type GameObject = {
  sprite: ImgSprite | BoxSprite | CirSprite | TriSprite | LineSprite | PolySprite
  collider: BoxCol | CirCol | PolyCol
  hasGravity: boolean
  canCollide: boolean
  canTrigger: boolean
  weight: number
  velocity: Coord
  onClick: () => void
  onCol: (obj: GameObject) => void
  onTrig: (obj: GameObject) => void
  draw: () => void
  destroy: () => void
  update: (objects: GameObject[]) => void
};

type ImgSprite = {
  pos: Coord
  scale: Scale
  rotation: number
  color: string
  border: Border
  draw: any
  destroy: any
  img: string
};

type BoxSprite = {
  pos: Coord
  scale: Scale
  rotation: number
  color: string
  border: Border
  draw: any
  destroy: any
};

type CirSprite = {
  pos: Coord
  scale: Scale
  startAngle: number
  color: string
  border: Border
  draw: any
  destroy: any
};

type TriSprite = {
  pos: Coord
  scale: Scale
  points: [Coord, Coord, Coord]
  rotation: number
  color: string
  border: Border
  draw: any
  destroy: any
};

type LineSprite = {
  pos: Coord
  scale: Scale
  points: [Coord, Coord]
  rotation: number
  thickness: number
  color: string
  draw: any
  destroy: any
};

type PolySprite = {
  pos: Coord
  scale: Scale
  points: Coord[]
  rotation: number
  thickness: number
  color: string
  draw: any
  destroy: any
};

type BoxCol = {
  type: 'box' | 'cir' | 'poly'
  offset: Coord
  scale: Scale
};

type CirCol = {
  type: 'box' | 'cir' | 'poly'
  offset: Coord
  radius: number
};

type PolyCol = {
  type: 'box' | 'cir' | 'poly'
  offset: Coord
  points: Coord[]
};
