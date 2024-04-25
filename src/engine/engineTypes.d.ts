declare const update: any;
declare const render: any;
declare const onEvent: any;
declare const setSelectedScene: any;
declare const setBackgroundColor: any;
declare const getCenter: any;
declare const KeyCode: any;
declare const keysPressed: any;

type Sprite = ImgSprite | BoxSprite;
type ColDir = 'T' | 'B' | 'L' | 'R' | null;

type Vec2 = {
  x: number
  y: number
};

type Border = {
  thickness: number
  color: string
};

type Collision = {
  point: Vec2
};
