import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Settings } from './constants';
import { BoardService } from './board.service';

@Component({
  selector: 'game-board',
  template: `
    <canvas #board style="border: solid"></canvas>
    <button (click)="play()">{{ playing ? 'Stop' : 'Play' }}</button>
  `
})
export class BoardComponent implements OnInit {
  @ViewChild('board', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  playing = false;
  board: number[][];

  constructor(private boardService: BoardService) {}

  ngOnInit() {
    let { COLS, ROWS, BLOCK_SIZE } = Settings;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;
    this.board = this.boardService.getEmptyBoard();
    console.table(this.board);
  }

  play() {
    this.playing = !this.playing;
  }
}
