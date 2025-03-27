import GameBoard from "../src/gameboard";
import Ship from "../src/ship";


test('Places a ship on the board', () => {
    const gameboard = GameBoard();
    const ship = Ship(3);

    gameboard.placeShip(ship, 0, 0, 'up');

    expect(gameboard.board[0][0].hasShip).toBe(true);
});
