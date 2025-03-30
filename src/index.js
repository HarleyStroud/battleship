import Player from './player.js';
import Ship from './ship.js';
import dom from './dom.js';

const player = Player('human');
const computerPlayer = Player('computer');

player.gameboard.placeShip(Ship(3), 0, 0, 'horizontal');
player.gameboard.placeShip(Ship(4), 0, 0, 'horizontal');

dom.renderBoard(player.gameboard.board, 'Player');
dom.renderBoard(computerPlayer.gameboard.board, 'Computer');
