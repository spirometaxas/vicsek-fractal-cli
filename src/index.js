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

const drawSquare = function(board, pos, size, character) {
  var startX = pos.x - parseInt(getWidth(size) / 2.0);
  var startY = pos.y - parseInt(getHeight(size) / 2.0); 
  for (let i = 0; i < getHeight(size); i++) {
    for (let j = 0; j < getWidth(size); j++) {
      if (character) {
        board[startY + i][startX + j] = character;
      } else {
        board[startY + i][startX + j] = '\u001b[7m \u001b[0m';
      }
    }
  }
}

const vicsek = function(n, size, board, pos, diagonal, character) {
  if (n === 0) {
    drawSquare(board, pos, size, character);
    return;
  }

  if (diagonal) {
    vicsek(n - 1, size - 1, board, { x: pos.x, y: pos.y }, diagonal, character);
    vicsek(n - 1, size - 1, board, { x: pos.x + getWidth(size - 1), y: pos.y + getHeight(size - 1) }, diagonal, character);
    vicsek(n - 1, size - 1, board, { x: pos.x - getWidth(size - 1), y: pos.y - getHeight(size - 1) }, diagonal, character);
    vicsek(n - 1, size - 1, board, { x: pos.x + getWidth(size - 1), y: pos.y - getHeight(size - 1) }, diagonal, character);
    vicsek(n - 1, size - 1, board, { x: pos.x - getWidth(size - 1), y: pos.y + getHeight(size - 1) }, diagonal, character);
  } else {
    vicsek(n - 1, size - 1, board, { x: pos.x, y: pos.y }, diagonal, character);
    vicsek(n - 1, size - 1, board, { x: pos.x, y: pos.y + getHeight(size - 1) }, diagonal, character);
    vicsek(n - 1, size - 1, board, { x: pos.x, y: pos.y - getHeight(size - 1) }, diagonal, character);
    vicsek(n - 1, size - 1, board, { x: pos.x + getWidth(size - 1), y: pos.y }, diagonal, character);
    vicsek(n - 1, size - 1, board, { x: pos.x - getWidth(size - 1), y: pos.y }, diagonal, character);
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

  let size = n;
  if (config && config.size && config.size > n) {
    size = config.size;
  }

  const diagonal = config !== undefined && config.diagonal === true;
  const character = config !== undefined && config.character !== undefined && config.character.length === 1 ? config.character : undefined;

  const board = createBoard(getWidth(size), getHeight(size));
  vicsek(n, size, board, { x: parseInt(getWidth(size) / 2.0), y: parseInt(getHeight(size) / 2.0) }, diagonal, character);
  return draw(board);
}

module.exports = {
  create: create
};