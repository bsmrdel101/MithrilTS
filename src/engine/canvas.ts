import { main } from "../game";
import GameObject from "./classes/gameObjects/GameObject";
import { gameObjectManager } from "./classes/gameObjects/GameObjectManager";

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;
export const globals = (window as any);
let selectedScene: any;

const updateFunctions: Array<() => void> = [];
const renderFunctions: Array<() => void> = [];
const eventHandlers: { [eventType: string]: Array<(event: Event) => void> } = {};
const keysPressed: { [key: string]: boolean } = {};


export const initializeCanvas = () => {
  canvas = document.getElementById('canvas') as HTMLCanvasElement;
  ctx = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('click', handleCanvasEvent);
  window.addEventListener('dblclick', handleCanvasEvent);
  window.addEventListener('mousedown', handleCanvasEvent);
  window.addEventListener('mousemove', handleCanvasEvent);
  window.addEventListener('keydown', handleCanvasEvent);
  window.addEventListener('keyup', handleCanvasEvent);
  window.addEventListener('wheel', handleCanvasEvent);
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());

  main();
  window.requestAnimationFrame(drawFrame);
};

const resizeCanvas = () => {
  const aspectRatio = 16 / 9;
  canvas.width *= aspectRatio - canvas.clientWidth;
  canvas.height *= aspectRatio - canvas.clientHeight;
};

// If it finds the event in the eventHandlers, then run it
const handleCanvasEvent = (event: Event | KeyboardEvent | MouseEvent) => {
  const eventType = event.type;
  if (eventHandlers[eventType]) {
    eventHandlers[eventType].forEach((handler) => {
      event.preventDefault();
      handler(event);
    });
  }
};

// Adds event into eventHandelers
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

const drawFrame = () => {
  if (selectedScene) selectedScene.sceneLoader();
  const collidableObjects = gameObjectManager.getCollidableObjects();
  collidableObjects.forEach((obj: GameObject) => obj.collider.checkCollisions(collidableObjects));
  updateFunctions.forEach((fn) => fn());
  renderFunctions.forEach((fn) => fn());
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
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const getCenter = () => {
  return { x: canvas.width / 2, y: canvas.height / 2 };
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
