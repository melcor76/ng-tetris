import { Injectable } from '@angular/core';
import { Piece, IPiece } from './piece.component';
import { COLS, ROWS } from './constants';

@Injectable({
  providedIn: 'root'
})
export class PieceService {
  valid(p: IPiece): boolean {
    return p.shape.every((row, y) => {
      return row.every(
        (value, x) =>
          value === 0 || (p.x + x >= 0 && p.x + x < COLS && p.y + y < ROWS)
      );
    });
  }

  rotate(piece: IPiece): Piece {
    let p: Piece = JSON.parse(JSON.stringify(piece));
    for (let y = 0; y < p.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
      }
    }
    p.shape.forEach(row => row.reverse());
    return p;
  }
}
