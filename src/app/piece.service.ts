import { Injectable } from '@angular/core';
import { Piece } from './piece.component';
import { Settings } from './constants';

@Injectable({
  providedIn: 'root'
})
export class PieceService {

  valid(p: Piece): boolean {
    const { COLS, ROWS } = Settings;
    const length = p.shape.length;
    for (let y = 0; y < length; y++) {
      for (let x = 0; x < length; x++) {
        if (p.shape[y][x] > 0) {
          if (p.x + x < 0) {
            // Stop left
            return false;
          }
          if (p.x + x >= COLS) {
            // Stop right
            return false;
          }
          if (p.y + y >= ROWS) {
            // Stop at bottom
            return false;
          }
        }
      }
    }
    return true;
  }

  rotate(piece: Piece): Piece {
    let p: Piece = JSON.parse(JSON.stringify(piece));
    for (let y = 0; y < p.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [
          p.shape[x][y], p.shape[y][x]
        ] = [
          p.shape[y][x], p.shape[x][y]
        ];
      }
    }
    p.shape.forEach(row => row.reverse());
    return p;
  }
}
