export class Settings {
  static readonly COLS = 10;
  static readonly ROWS = 20;
  static readonly BLOCK_SIZE = 30;
  static readonly BOARD_COLOR = 'white';
}

export class Tetromino {
  static readonly COLORS = [
    'cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'
  ];
  static readonly SHAPES = [
   [
     [0, 0, 0, 0],
     [1, 1, 1, 1],
     [0, 0, 0, 0],
     [0, 0, 0, 0]
    ],
    [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0]
    ],
    [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0]
    ],
    [
      [4, 4],
      [4, 4]
    ],
    [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0]
    ],
    [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0]
    ],
    [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0]
    ]
  ]
}
