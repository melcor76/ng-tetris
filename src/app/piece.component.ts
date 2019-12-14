import { COLORS, SHAPES } from './constants';

export interface IPiece {
  x: number;
  y: number;
  color: string;
  shape: number[][];
}

export class Piece implements IPiece {
  x: number;
  y: number;
  color: string;
  shape: number[][];

  constructor(private ctx: CanvasRenderingContext2D) {
    this.spawn();
  }

  spawn() {
    const typeId = this.randomizeTetrominoType(COLORS.length - 1);
    this.shape = SHAPES[typeId];
    this.color = COLORS[typeId];
    this.x = typeId === 4 ? 4 : 3;
    this.y = 0;
  }

  private addNextShadow(ctx: CanvasRenderingContext2D, x: number, y: number): void {
   ctx.fillStyle = 'black';
    ctx.fillRect(x, y, 1.025, 1.025);
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }

  drawNext(ctxNext: CanvasRenderingContext2D) {
    ctxNext.clearRect(0, 0, ctxNext.canvas.width, ctxNext.canvas.height);
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.addNextShadow(ctxNext, x, y);
        }
      });
    });

    ctxNext.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          ctxNext.fillRect(x + .025, y + .025, 1-.025, 1 -.025);
        }
      });
    });
  }

  move(p: IPiece) {
    this.x = p.x;
    this.y = p.y;
    this.shape = p.shape;
  }

  randomizeTetrominoType(noOfTypes: number): number {
    return Math.floor(Math.random() * noOfTypes + 1);
  }
}
