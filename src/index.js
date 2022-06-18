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
      board[startY + i][startX + j] = character;
    }
  }
}

const vicsek = function(n, scale, board, pos, drawX, character) {
  if (n === 0) {
    drawSquare(board, pos, scale, character);
    return;
  }

  if (drawX) {
    vicsek(n - 1, scale - 1, board, { x: pos.x, y: pos.y }, drawX, character);
    vicsek(n - 1, scale - 1, board, { x: pos.x + getWidth(scale - 1), y: pos.y + getHeight(scale - 1) }, drawX, character);
    vicsek(n - 1, scale - 1, board, { x: pos.x - getWidth(scale - 1), y: pos.y - getHeight(scale - 1) }, drawX, character);
    vicsek(n - 1, scale - 1, board, { x: pos.x + getWidth(scale - 1), y: pos.y - getHeight(scale - 1) }, drawX, character);
    vicsek(n - 1, scale - 1, board, { x: pos.x - getWidth(scale - 1), y: pos.y + getHeight(scale - 1) }, drawX, character);
  } else {
    vicsek(n - 1, scale - 1, board, { x: pos.x, y: pos.y }, drawX, character);
    vicsek(n - 1, scale - 1, board, { x: pos.x, y: pos.y + getHeight(scale - 1) }, drawX, character);
    vicsek(n - 1, scale - 1, board, { x: pos.x, y: pos.y - getHeight(scale - 1) }, drawX, character);
    vicsek(n - 1, scale - 1, board, { x: pos.x + getWidth(scale - 1), y: pos.y }, drawX, character);
    vicsek(n - 1, scale - 1, board, { x: pos.x - getWidth(scale - 1), y: pos.y }, drawX, character);
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

const create = function(n, scale, drawX = false, character = '\u001b[7m \u001b[0m') {
  if (n === undefined || n < 0) {
    return '';
  }
  if (scale === undefined || scale < n) {
    scale = n;
  }

  if (character && character !== '\u001b[7m \u001b[0m' && character.length > 1) {
    character = '\u001b[7m \u001b[0m';
  }

  const board = createBoard(getWidth(scale), getHeight(scale));
  vicsek(n, scale, board, { x: parseInt(getWidth(scale) / 2.0), y: parseInt(getHeight(scale) / 2.0) }, drawX, character);
  return draw(board);
}

module.exports = {
  create: create
};