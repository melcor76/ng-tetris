import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  HostListener,
  NgZone
} from '@angular/core';
import { COLS, BLOCK_SIZE, ROWS } from './constants';
import { Piece } from './piece.component';
import { PieceService } from './piece.service';

@Component({
  selector: 'game-board',
  template: `
    <canvas #board class="game-board"></canvas>
    <button (click)="play()" class="play-button">Play</button>
  `
})
export class BoardComponent implements OnInit {
  @ViewChild('board', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  playing = false;
  board: number[][];
  piece: Piece;
  requestId: number;
  moves = {
    ArrowLeft: (piece: Piece) => ({ ...piece, x: piece.x - 1 }),
    ArrowRight: (piece: Piece) => ({ ...piece, x: piece.x + 1 }),
    ArrowDown: (piece: Piece) => ({ ...piece, y: piece.y + 1 }),
    ArrowUp: (piece: Piece) => this.pieceService.rotate(piece)
  };

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.moves[event.key]) {
      event.preventDefault();
      let p: Piece = this.moves[event.key](this.piece);
      if (this.pieceService.valid(p)) {
        this.piece.move(p);
      }
    }
  }

  constructor(
    private pieceService: PieceService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.initBoard();
  }

  initBoard() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    // Calculate size of canvas from constants.
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;

    // Scale so we don't need to give size on every draw.
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  play() {
    this.board = this.getEmptyBoard();
    this.piece = new Piece(this.ctx);
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  animate() {
    this.piece.draw();
    this.requestId = requestAnimationFrame(this.animate.bind(this));
  }

  getEmptyBoard(): number[][] {
    return Array(ROWS).fill(Array(COLS).fill(0));
  }
}
