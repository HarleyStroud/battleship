import GameBoard from './gameboard.js';

export default function Player(playerName) {
    const gameboard = GameBoard();

    return { gameboard, playerName };
}
