import Grid from "./Grid";

class Game {
  private grid: Grid;
  private readonly context: CanvasRenderingContext2D;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.grid = new Grid(this.canvas.width, this.canvas.height);
  }

  public init() {
    this.grid.init();
  }

  public update(dt: number) {
    this.grid.update(dt);
  }

  public draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.grid.draw(this.context);
  }
}

export default Game;
