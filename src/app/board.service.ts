import { Injectable } from '@angular/core';
import { Settings } from './constants';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  getEmptyBoard(): number[][] {
    let board = [];
    let { ROWS, COLS } = Settings;
    while (ROWS--) {
      board.push(new Array(COLS).fill(0));
    }
    return board;
  }
}
