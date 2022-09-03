const getWidth = function(n) {
  return getHeight(n) * 2;
}

const getHeight = function(n) {
  return Math.pow(3, n);
}

const createBoard = function(w, h) {
  let board = [];
  for (let i = 0; i < h; i++) {
    let row = [];
    for (let j = 0; j < w; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}

const drawSquare = function(board, pos, scale, character) {
  var startX = pos.x - parseInt(getWidth(scale) / 2.0);
  var startY = pos.y - parseInt(getHeight(scale) / 2.0); 
  for (let i = 0; i < getHeight(scale); i++) {
    for (let j = 0; j < getWidth(scale); j++) {
      if (character) {
        board[startY + i][startX + j] = character;
      } else {
        board[startY + i][startX + j] = '\u001b[7m \u001b[0m';
      }
    }
  }
}

const vicsek = function(n, scale, board, pos, diagonal, character) {
  if (n === 0) {
    drawSquare(board, pos, scale, character);
    return;
  }

  if (diagonal) {
    vicsek(n - 1, scale - 1, board, { x: pos.x, y: pos.y }, diagonal, character);
    vicsek(n - 1, scale - 1, board, { x: pos.x + getWidth(scale - 1), y: pos.y + getHeight(scale - 1) }, diagonal, character);
    vicsek(n - 1, scale - 1, board, { x: pos.x - getWidth(scale - 1), y: pos.y - getHeight(scale - 1) }, diagonal, character);
    vicsek(n - 1, scale - 1, board, { x: pos.x + getWidth(scale - 1), y: pos.y - getHeight(scale - 1) }, diagonal, character);
    vicsek(n - 1, scale - 1, board, { x: pos.x - getWidth(scale - 1), y: pos.y + getHeight(scale - 1) }, diagonal, character);
  } else {
    vicsek(n - 1, scale - 1, board, { x: pos.x, y: pos.y }, diagonal, character);
    vicsek(n - 1, scale - 1, board, { x: pos.x, y: pos.y + getHeight(scale - 1) }, diagonal, character);
    vicsek(n - 1, scale - 1, board, { x: pos.x, y: pos.y - getHeight(scale - 1) }, diagonal, character);
    vicsek(n - 1, scale - 1, board, { x: pos.x + getWidth(scale - 1), y: pos.y }, diagonal, character);
    vicsek(n - 1, scale - 1, board, { x: pos.x - getWidth(scale - 1), y: pos.y }, diagonal, character);
  }
}

const draw = function(board) {
  var result = '\n ';
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      result += board[board.length - i - 1][j];
    }
    result += '\n ';
  }
  return result;
}

const create = function(n, config) {
  if (n === undefined || n < 0) {
    return '';
  }

  let scale = n;
  if (config && config.scale && config.scale > n) {
    scale = config.scale;
  }

  const diagonal = config !== undefined && config.diagonal === true;
  const character = config !== undefined && config.character !== undefined && config.character.length === 1 ? config.character : undefined;

  const board = createBoard(getWidth(scale), getHeight(scale));
  vicsek(n, scale, board, { x: parseInt(getWidth(scale) / 2.0), y: parseInt(getHeight(scale) / 2.0) }, diagonal, character);
  return draw(board);
}

module.exports = {
  create: create
};