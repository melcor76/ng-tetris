import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  HostListener
} from '@angular/core';
import {
  COLS,
  BLOCK_SIZE,
  ROWS,
  COLORS,
  LINES_PER_LEVEL,
  LEVEL,
  POINTS,
  KEY
} from './constants';
import { Tetromino, ITetromino } from './tetromino.component';
import { GameService } from './game.service';

@Component({
  selector: 'game-board',
  templateUrl: 'board.component.html'
})
export class BoardComponent implements OnInit {
  @ViewChild('board', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  board: number[][];
  tetromino: Tetromino;
  requestId: number;
  time = { start: 0, elapsed: 0, level: 1000 };
  points: number;
  lines: number;
  level: number;
  moves = {
    [KEY.LEFT]:  (t: Tetromino) => ({ ...t, x: t.x - 1 }),
    [KEY.RIGHT]: (t: Tetromino) => ({ ...t, x: t.x + 1 }),
    [KEY.DOWN]:  (t: Tetromino) => ({ ...t, y: t.y + 1 }),
    [KEY.SPACE]: (t: Tetromino) => ({ ...t, y: t.y + 1 }),
    [KEY.UP]:    (t: Tetromino) => this.service.rotate(t)
  };

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY.ESC) {
      this.gameOver();
    } else if (this.moves[event.keyCode]) {
      event.preventDefault();
      // Get new state
      let t: ITetromino = this.moves[event.keyCode](this.tetromino);
      if (event.keyCode === KEY.SPACE) {
        // Hard drop
        while (this.service.valid(t, this.board)) {
          this.points += POINTS.HARD_DROP;
          this.tetromino.move(t);
          t = this.moves[KEY.DOWN](this.tetromino);
        }
      } else if (this.service.valid(t, this.board)) {
        this.tetromino.move(t);
        if (event.keyCode === KEY.DOWN) {
          this.points += POINTS.SOFT_DROP;
        }
      }
    }
  }

  constructor(private service: GameService) {}

  ngOnInit() {
    this.initBoard();
    this.resetGame();
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
    this.resetGame();
    this.tetromino = new Tetromino(this.ctx);
    this.time.start = performance.now();

    // If we have an old game running a game then cancel the old
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }

    this.animate();
  }

  resetGame() {
    this.points = 0;
    this.lines = 0;
    this.level = 0;
    this.board = this.getEmptyBoard();
    this.time.level = LEVEL[this.level];
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
    this.tetromino.draw();
    this.drawBoard();
  }

  drop(): boolean {
    let p: ITetromino = this.moves[KEY.DOWN](this.tetromino);
    if (this.service.valid(p, this.board)) {
      this.tetromino.move(p);
    } else {
      this.freeze();
      this.clearLines();
      if (this.tetromino.y === 0) {
        // Game over
        return false;
      }
      this.tetromino = new Tetromino(this.ctx);
    }
    return true;
  }

  clearLines() {
    let lines = 0;
    this.board.forEach((row, y) => {
      if (row.every(value => value !== 0)) {
        lines++;
        this.board.splice(y, 1);
        this.board.unshift(Array(COLS).fill(0));
      }
    });
    if (lines > 0) {
      this.points += this.service.getLinesClearedPoints(lines, this.level);
      this.lines += lines;
      if (this.lines >= LINES_PER_LEVEL) {
        this.level++;
        this.lines -= LINES_PER_LEVEL;
        this.time.level = LEVEL[this.level];
      }
    }
  }

  freeze() {
    this.tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.board[y + this.tetromino.y][x + this.tetromino.x] = value;
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
