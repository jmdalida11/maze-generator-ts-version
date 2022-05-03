import Cell from "./Cell";

class Grid {
  private static readonly CELL_COUNT = 20;
  private readonly cells: Cell[] = [];
  private stack: Cell[] = [];
  private cellWidth: number = 0;
  private cellHeight: number = 0;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.cellWidth = canvasWidth / Grid.CELL_COUNT;
    this.cellHeight = canvasHeight / Grid.CELL_COUNT;
  }

  private generateCells() {
    for (let y = 0; y < Grid.CELL_COUNT; y++) {
      for (let x = 0; x < Grid.CELL_COUNT; x++) {
        const cell = new Cell();
        cell.w = this.cellWidth;
        cell.h = this.cellHeight;
        cell.x = this.cellWidth * x;
        cell.y = this.cellHeight * y;
        this.cells.push(cell);
      }
    }
    this.cells[0].isVisited = true;
    this.stack.push(this.cells[0]);
  }

  private addCellNeighbor() {
    for (let y = 0; y < Grid.CELL_COUNT; y++) {
      for (let x = 0; x < Grid.CELL_COUNT; x++) {
        this.cells[Grid.CELL_COUNT * y + x].neighbors = {
          top:
            y === 0
              ? null
              : this.cells[Grid.CELL_COUNT * y + x - Grid.CELL_COUNT],
          left: x === 0 ? null : this.cells[Grid.CELL_COUNT * y + x - 1],
          right:
            x === Grid.CELL_COUNT - 1
              ? null
              : this.cells[Grid.CELL_COUNT * y + x + 1],
          bottom:
            y === Grid.CELL_COUNT - 1
              ? null
              : this.cells[Grid.CELL_COUNT * y + x + Grid.CELL_COUNT]
        };
      }
    }
  }

  public init() {
    this.generateCells();
    this.addCellNeighbor();
  }

  public update(dt: number) {
    this.generateMaze();

    for (const cell of this.cells) {
      cell.update(dt);
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    for (const cell of this.cells) {
      cell.draw(ctx);
    }
  }

  private generateMaze() {
    if (this.stack.length === 0) return;

    const currentCell = this.stack[this.stack.length - 1];
    const unvisitedNeighbors = currentCell.getUnvisitedNeighbors();

    if (unvisitedNeighbors.length === 0) {
      this.stack.pop();
      return;
    }

    const randomNumber = Math.floor(Math.random() * unvisitedNeighbors.length);

    const nextCell = unvisitedNeighbors[randomNumber];

    if (nextCell === currentCell.neighbors.top) {
      currentCell.sides.top = false;
      nextCell.sides.bottom = false;
    } else if (nextCell === currentCell.neighbors.right) {
      currentCell.sides.right = false;
      nextCell.sides.left = false;
    } else if (nextCell === currentCell.neighbors.bottom) {
      currentCell.sides.bottom = false;
      nextCell.sides.top = false;
    } else if (nextCell === currentCell.neighbors.left) {
      currentCell.sides.left = false;
      nextCell.sides.right = false;
    }

    nextCell.isVisited = true;
    this.stack.push(nextCell);
  }
}

export default Grid;
