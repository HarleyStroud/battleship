import Player from './player.js';
import Ship from './ship.js';

const player = Player('human');
const computerPlayer = Player('computer');

player.gameboard.placeShip(Ship(3), 0, 0, 'horizontal');
player.gameboard.placeShip(Ship(4), 0, 0, 'horizontal');


alert('SCRIPT LINKED');
