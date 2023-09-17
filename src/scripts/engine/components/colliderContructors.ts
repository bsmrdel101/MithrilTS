export const BoxCol = (offset?: Coord, scale?: Coord): BoxCol => {
  return {
    type: 'box',
    offset: null,
    scale: null
  };
};

export const CirCol = (offset?: Coord, scale?: Coord): BoxCol => {
  return {
    type: 'cir',
    offset: null,
    scale: null
  };
};

export const PolyCol = (offset?: Coord, scale?: Coord): BoxCol => {
  return {
    type: 'poly',
    offset: null,
    scale: null
  };
};
