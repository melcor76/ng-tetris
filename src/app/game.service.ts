import { Injectable } from '@angular/core';
import { ITetromino } from './tetromino.component';
import { COLS, ROWS, POINTS } from './constants';

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
            board[p.y + y] &&
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

  getLinesClearedPoints(lines: number, level: number): number {
    const lineClearPoints = lines === 1
      ? POINTS.SINGLE
      : lines === 2
      ? POINTS.DOUBLE
      : lines === 3
      ? POINTS.TRIPLE
      : lines === 4
      ? POINTS.TETRIS
      : 0;

      return (level + 1) * lineClearPoints;
  }
}
