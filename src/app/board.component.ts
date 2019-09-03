import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  HostListener
} from '@angular/core';
import { Settings } from './constants';
import { BoardService } from './board.service';
import { Piece } from './piece.component';

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
  piece: Piece;
  moves = {
    ArrowLeft: (piece: Piece) => ({ ...piece, x: piece.x - 1 }),
    ArrowRight: (piece: Piece) => ({ ...piece, x: piece.x + 1 }),
    ArrowDown: (piece: Piece) => ({ ...piece, y: piece.y + 1 })
  };

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    const newPiece = this.moves[event.key](this.piece);
    if (newPiece) {
      event.preventDefault();
      this.piece.move(newPiece.x, newPiece.y);
    } else if (event.key === 'ArrowUp') {
      //this.piece.rotate();
    }
  }

  constructor(private boardService: BoardService) {}

  ngOnInit() {
    let { COLS, ROWS, BLOCK_SIZE } = Settings;
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    this.board = this.boardService.getEmptyBoard();
    console.table(this.board);
    this.piece = new Piece(this.ctx);
    this.piece.draw();
  }

  play() {
    this.playing = !this.playing;
  }
}
