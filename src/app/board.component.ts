import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { COLS, BLOCK_SIZE, ROWS } from './constants';

@Component({
  selector: 'game-board',
  template: `
    <canvas #board class="board"></canvas>
    <button (click)="play()">{{ playing ? 'Stop' : 'Play' }}</button>
  `,
  styles: ['.board: { border: solid }']
})
export class BoardComponent implements OnInit {
  @ViewChild('board', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  playing = false;

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;
  }

  play() {
    this.playing = !this.playing;
  }
}
