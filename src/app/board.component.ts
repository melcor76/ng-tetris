import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  HostListener,
  NgZone
} from '@angular/core';
import { COLS, BLOCK_SIZE, ROWS } from './constants';
import { BoardService } from './board.service';
import { Piece } from './piece.component';
import { PieceService } from './piece.service';

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
    private boardService: BoardService,
    private pieceService: PieceService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    this.board = this.boardService.getEmptyBoard();
    this.piece = new Piece(this.ctx);
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  play() {
    this.playing = !this.playing;
  }

  animate() {
    this.piece.draw();
    requestAnimationFrame(this.animate.bind(this));
  }
}
