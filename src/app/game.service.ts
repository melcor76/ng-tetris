import { Injectable } from '@angular/core';
import { ITetromino } from './tetromino.component';
import { COLS, ROWS, Points } from './constants';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  valid(p: ITetromino, board: number[][]): boolean {
    return p.shape.every((row, y) => {
      return row.every(
        (value, x) =>
          value === 0 ||
          (p.x + x >= 0 &&
            p.x + x < COLS &&
            p.y + y < ROWS &&
            board[p.y + y][p.x + x] === 0)
      );
    });
  }

  rotate(piece: ITetromino): ITetromino {
    let p: ITetromino = JSON.parse(JSON.stringify(piece));
    for (let y = 0; y < p.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
      }
    }
    p.shape.forEach(row => row.reverse());
    return p;
  }

  getLinesClearedPoints(lines: number): number {
    return lines === 1
      ? Points.SINGLE
      : lines === 2
      ? Points.DOUBLE
      : lines === 3
      ? Points.TRIPLE
      : lines === 4
      ? Points.TETRIS
      : 0;
  }
}
