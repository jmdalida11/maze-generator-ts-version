import GameObject from "./GameObject";

export interface ICellNeighbor {
  top: Cell | null;
  left: Cell | null;
  right: Cell | null;
  bottom: Cell | null;
}

class Cell extends GameObject {
  public sides = {
    top: true,
    left: true,
    right: true,
    bottom: true
  };
  public isVisited: boolean = false;
  public neighbors: ICellNeighbor = {
    top: null,
    left: null,
    right: null,
    bottom: null
  };
  public isCurrentCell = false;

  public getUnvisitedNeighbors() {
    const unvisitedNeighbors: Cell[] = [];

    if (this.neighbors.top && !this.neighbors.top.isVisited)
      unvisitedNeighbors.push(this.neighbors.top);
    if (this.neighbors.right && !this.neighbors.right.isVisited)
      unvisitedNeighbors.push(this.neighbors.right);
    if (this.neighbors.left && !this.neighbors.left.isVisited)
      unvisitedNeighbors.push(this.neighbors.left);
    if (this.neighbors.bottom && !this.neighbors.bottom.isVisited)
      unvisitedNeighbors.push(this.neighbors.bottom);

    return unvisitedNeighbors;
  }

  public update(dt: number) {}

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "blue";
    if (this.sides.top) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.w, this.y);
      ctx.stroke();
    }
    if (this.sides.right) {
      ctx.beginPath();
      ctx.moveTo(this.x + this.w, this.y);
      ctx.lineTo(this.x + this.w, this.y + this.h);
      ctx.stroke();
    }
    if (this.sides.bottom) {
      ctx.beginPath();
      ctx.moveTo(this.x + this.w, this.y + this.h);
      ctx.lineTo(this.x, this.y + this.h);
      ctx.stroke();
    }
    if (this.sides.left) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + this.h);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
    }

    if (this.isVisited) {
      ctx.fillStyle = "green";
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    if (this.isCurrentCell) {
      ctx.fillStyle = "red";
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }
}

export default Cell;
