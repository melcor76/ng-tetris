import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  HostListener,
  NgZone
} from '@angular/core';
import { COLS, BLOCK_SIZE, ROWS, COLORS } from './constants';
import { Piece, IPiece } from './piece.component';
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
  time = { start: 0, elapsed: 0, level: 1000 };
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
      let p: IPiece = this.moves[event.key](this.piece);
      if (this.pieceService.valid(p, this.board)) {
        this.piece.move(p);
      }
    }
  }

  constructor(private pieceService: PieceService, private ngZone: NgZone) {}

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

    this.time.start = performance.now();

    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }

    // Loop outside of the Angular zone
    // so the UI does not refresh after each cycle
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  animate(now = 0) {
    this.time.elapsed = now - this.time.start;
    if (this.time.elapsed > this.time.level) {
      this.time.start = now;
      if (!this.drop()) {
        this.gameOver();
        return;
      }
    }
    this.draw();
    this.requestId = requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.piece.draw();
    this.drawBoard();
  }

  drop(): boolean {
    let p: IPiece = this.moves['ArrowDown'](this.piece);
    if (this.pieceService.valid(p, this.board)) {
      this.piece.move(p);
    } else {
      this.freeze();
      this.clearLines();
      if (this.piece.y === 0) {
        // Game over
        return false;
      }
      this.piece = new Piece(this.ctx);
    }
    return true;
  }

  clearLines() {
    this.board.forEach((row, y) => {
      if (row.every(value => value !== 0)) {
        this.board.splice(y, 1);
        this.board.unshift(Array(COLS).fill(0));
      }
    });
  }

  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.board[y + this.piece.y][x + this.piece.x] = value;
        }
      });
    });
  }

  drawBoard() {
    this.board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  gameOver() {
    cancelAnimationFrame(this.requestId);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(1, 3, 8, 1.2);
    this.ctx.font = '1px Arial';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('GAME OVER', 1.8, 4);
  }

  getEmptyBoard(): number[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }
}
