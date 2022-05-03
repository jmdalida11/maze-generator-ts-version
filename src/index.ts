import Game from "./Game";

const canvas = document.createElement("canvas");
const SCALE = 0.8;

canvas.width = 500 * SCALE;
canvas.height = 500 * SCALE;
canvas.style.border = "1px solid";
document.body.style.backgroundColor = "#181818";
document.body.append(canvas);

const game = new Game(canvas);

const init = () => {
  game.init();
};

const update = (dt: number) => {
  game.update(dt);
};

const draw = () => {
  game.draw();
};

const gameLoop = (dt: number) => {
  update(dt);
  draw();

  requestAnimationFrame(gameLoop);
};

init();
gameLoop(0);
