import GameBoard from './gameboard.js';

export default function Player(playerType) {
    const gameboard = GameBoard();

    return { gameboard };
}
