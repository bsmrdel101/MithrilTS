import { gameObjectManager } from "./engine/components/gameObjectManager";
import sampleScene from "./scenes/sampleScene";

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;
let selectedScene: any;

let updateFunctions: Array<() => void> = [];
let renderFunctions: Array<() => void> = [];
let eventHandlers: { [eventType: string]: Array<(event: Event) => void> } = {};


export const initializeCanvas = () => {
  canvas = document.getElementById('canvas') as HTMLCanvasElement;
  ctx = canvas.getContext('2d');
  setSelectedScene(sampleScene()); // Set initial scene here

  canvas.addEventListener('click', handleCanvasEvent);
  canvas.addEventListener('dblclick', handleCanvasEvent);
  canvas.addEventListener('mousemove', handleCanvasEvent);
  window.addEventListener('keydown', handleCanvasEvent);
  window.addEventListener('keyup', handleCanvasEvent);
  window.addEventListener('wheel', handleCanvasEvent);
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  window.requestAnimationFrame(drawFrame);
};

const drawFrame = () => {
  if (selectedScene) selectedScene.sceneLoader();
  const collidableObjects = gameObjectManager.getCollidableObjects();
  collidableObjects.forEach((object) => object.update(collidableObjects));
  updateFunctions.forEach((fn) => fn());
  renderFunctions.forEach((fn) => fn());
  window.requestAnimationFrame(drawFrame);
};

// Scene functions
export const update = (fn: () => void) => {
  updateFunctions.push(fn);
};

export const render = (fn: () => void) => {
  renderFunctions.push(fn);
};

// Handle event detection
const handleCanvasEvent = (event: Event) => {
  const eventType = event.type;
  if (eventHandlers[eventType]) {
    eventHandlers[eventType].forEach((handler) => handler(event));
  }
};

export const onEvent = (eventType: string, fn: (event: Event) => void) => {
  if (!eventHandlers[eventType]) {
    eventHandlers[eventType] = [];
  }
  eventHandlers[eventType].push(fn);
};

export const setSelectedScene = (scene: any) => selectedScene = scene;

export const setBackgroundColor = (color: string) => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

