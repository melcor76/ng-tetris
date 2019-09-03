import { Settings } from './constants';

export class Piece {
  x: number;
  y: number;
  color: string;
  shape: number[][];

  constructor(private ctx: CanvasRenderingContext2D) {
    this.spawn();
  }

  spawn() {
    this.shape = [[0, 2, 0], [0, 2, 0], [2, 2, 0]];
    this.color = 'blue';
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

  move(newX: number, newY: number) { 
    if (this.valid(newX, newY)) {
      this.x = newX;
      this.y = newY;
      this.draw();
    }
  }

  valid(newX: number, newY: number): boolean {
    const {COLS, ROWS} = Settings;
    const length = this.shape.length;
    for (let y = 0; y < length; y++) {
      for (let x = 0; x < length; x++) {
        if (this.shape[y][x] > 0) {     
          if (newX + x < 0) { // Stop left            
            return false;
          }
          if (newX + x >= COLS) { // Stop right            
            return false;
          }
          if (newY + y >= ROWS) { // Stop at bottom            
            return false;
          }
        }
      }
    }
    return true;
  }
}
