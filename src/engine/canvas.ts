import { main } from "../game";
import GameObject from "./classes/gameObjects/GameObject";
import { gameObjectManager } from "./classes/gameObjects/GameObjectManager";

export let bgCanvas: HTMLCanvasElement;
export let smCanvas: HTMLCanvasElement;
export let pxCanvas: HTMLCanvasElement;
export let bgCtx: CanvasRenderingContext2D;
export let smCtx: CanvasRenderingContext2D;
export let pxCtx: CanvasRenderingContext2D;
export const globals = (window as any);
let selectedScene: any;

const updateFunctions: Array<() => void> = [];
const renderFunctions: Array<() => void> = [];
const eventHandlers: { [eventType: string]: Array<(event: Event) => void> } = {};
const keysPressed: { [key: string]: boolean } = {};

let lastRenderTime = 0;
const frameRate = 60;
const frameDelay = 1000 / frameRate;


export const initializeCanvas = () => {
  bgCanvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
  smCanvas = document.getElementById('sm-canvas') as HTMLCanvasElement;
  pxCanvas = document.getElementById('px-canvas') as HTMLCanvasElement;
  bgCtx = bgCanvas.getContext('2d');
  smCtx = smCanvas.getContext('2d');
  pxCtx = pxCanvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('click', handleCanvasEvent);
  window.addEventListener('dblclick', handleCanvasEvent);
  window.addEventListener('mousedown', handleCanvasEvent);
  window.addEventListener('mousemove', handleCanvasEvent);
  window.addEventListener('keydown', handleCanvasEvent);
  window.addEventListener('keyup', handleCanvasEvent);
  window.addEventListener('wheel', handleCanvasEvent);
  bgCanvas.addEventListener('contextmenu', (e) => e.preventDefault());

  main();
  window.requestAnimationFrame(drawFrame);
};

const resizeCanvas = () => {
  const aspectRatio = 16 / 9;
  bgCanvas.width *= aspectRatio - bgCanvas.clientWidth;
  bgCanvas.height *= aspectRatio - bgCanvas.clientHeight;
};

const handleCanvasEvent = (event: Event | KeyboardEvent | MouseEvent) => {
  const eventType = event.type;
  if (eventHandlers[eventType]) {
    eventHandlers[eventType].forEach((handler) => {
      event.preventDefault();
      handler(event);
    });
  }
};

const onEvent = (eventType: string, fn: (event: Event) => void) => {
  if (!eventHandlers[eventType]) {
    eventHandlers[eventType] = [];
  }
  eventHandlers[eventType].push(fn);
};

// Scene functions
const update = (fn: () => void) => {
  updateFunctions.push(fn);
};

const render = (fn: () => void) => {
  renderFunctions.push(fn);
};

const drawFrame = (time: number) => {
  const timeSinceLastRender = time - lastRenderTime;
  if (timeSinceLastRender >= frameDelay) {
    if (selectedScene) selectedScene.sceneLoader();
    const collidableObjects = gameObjectManager.getCollidableObjects();
    collidableObjects.forEach((obj: GameObject) => obj.col.checkCollisions(collidableObjects));
    updateFunctions.forEach((fn) => fn());
    renderFunctions.forEach((fn) => fn());
    lastRenderTime = time;
  }
  window.requestAnimationFrame(drawFrame);
};

onEvent('keydown', (e: Event) => {
  keysPressed[(e as KeyboardEvent).key] = true;
});

onEvent('keyup', (e: Event) => {
  keysPressed[(e as KeyboardEvent).key] = false;
});

const setSelectedScene = (scene: any) => selectedScene = scene;

const setBackgroundColor = (color: string) => {
  bgCtx.fillStyle = color;
  smCtx.fillStyle = color;
  pxCtx.fillStyle = color;
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
  smCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
  pxCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
};

const getCenter = () => {
  return { x: bgCanvas.width / 2, y: bgCanvas.height / 2 };
};

const KeyCode = {
  up: [' ', 'ArrowUp', 'w'],
  down: ['s', 'ArrowDown'],
  left: ['a', 'ArrowLeft'],
  right: ['d', 'ArrowRight'],
  space: ' ',
};

globals.update = update;
globals.render = render;
globals.onEvent = onEvent;
globals.setSelectedScene = setSelectedScene;
globals.setBackgroundColor = setBackgroundColor;
globals.getCenter = getCenter;
globals.KeyCode = KeyCode;
globals.keysPressed = keysPressed;
