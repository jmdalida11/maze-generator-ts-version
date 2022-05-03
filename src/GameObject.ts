abstract class GameObject {
  x: number = 0;
  y: number = 0;
  w: number = 0;
  h: number = 0;
  abstract update(dt: number): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
}

export default GameObject;
