import { Injectable } from '@angular/core';
import { ROWS, COLS } from './constants';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  getEmptyBoard(): number[][] {
    return Array(ROWS).fill(Array(COLS).fill(0));
  }
}
