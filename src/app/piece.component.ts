import { COLORS, SHAPES } from './constants';

export class Piece {
  x: number;
  y: number;
  color: string;
  shape: number[][];

  constructor(private ctx: CanvasRenderingContext2D) {
    this.spawn();
  }

  spawn() {
    const typeId = this.randomizeTetrominoType(COLORS.length);
    this.shape = SHAPES[typeId];
    this.color = COLORS[typeId];
    this.x = 4;
    this.y = 0;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }

  move(p: Piece) {
    this.x = p.x;
    this.y = p.y;
    this.shape = p.shape;
    this.draw();
  }

  randomizeTetrominoType(noOfTypes: number): number {
    return Math.floor(Math.random() * noOfTypes);
  }
}
