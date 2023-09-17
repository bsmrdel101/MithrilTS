import { initializeCanvas } from '../canvas';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');

const loadGame = () => {
  app.innerHTML = `
    <div>
      <canvas id="canvas"></canvas>
    </div>
  `;
  initializeCanvas();
};

app.innerHTML = `
  <div>
    <button class="start-game-button">Play Game</button>
    <canvas id="canvas"></canvas>
  </div>
`;

const startBtn = document.querySelector<HTMLButtonElement>('.start-game-button');
startBtn.addEventListener('click', loadGame);
