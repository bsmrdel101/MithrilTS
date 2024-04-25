import { initializeCanvas } from '../canvas';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');

const loadGame = () => {
  app.innerHTML = `
    <div>
      <canvas id="bg-canvas"></canvas>
      <canvas id="sm-canvas"></canvas>
      <canvas id="px-canvas"></canvas>
    </div>
  `;
  initializeCanvas();
};

app.innerHTML = `
  <div>
    <button class="start-game-button">Play Game</button>
  </div>
`;

const startBtn = document.querySelector<HTMLButtonElement>('.start-game-button');
startBtn.addEventListener('click', loadGame);
