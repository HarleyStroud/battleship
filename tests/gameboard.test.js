import GameBoard from "../src/gameboard";
import Ship from "../src/ship";

test('Places a ship horizontally on the board', () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    gameboard.placeShip(ship, 0, 0, 'horizontal');

    expect(gameboard.board[0][0].hasShip).toBe(true);
    expect(gameboard.board[0][1].hasShip).toBe(true);
    expect(gameboard.board[0][2].hasShip).toBe(true);
});

test('Places a ship vertically on the board', () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    gameboard.placeShip(ship, 0, 0, 'vertical');

    expect(gameboard.board[0][0].hasShip).toBe(true);
    expect(gameboard.board[1][0].hasShip).toBe(true);
    expect(gameboard.board[2][0].hasShip).toBe(true);
});

test('Rejects ship with negative x coordinate', () => {
    const gameboard = GameBoard();
    const ship = Ship(3);

    expect(() => {
        gameboard.placeShip(ship, -1, 0, 'horizontal');
    }).toThrow('Invalid ship placement: out of bounds');
});

test('Rejects ship with negative y coordinate', () => { 
    const gameboard = GameBoard();
    const ship = Ship(3);

    expect(() => {
        gameboard.placeShip(ship, 1, -2, 'horizontal');
    }).toThrow('Invalid ship placement: out of bounds');
 });

test('Rejects ship that extends beyond right edge', () => { 
    const gameboard = GameBoard();
    const ship = Ship(5);

    expect(() => {
        gameboard.placeShip(ship, 0, 8, 'horizontal');
    }).toThrow('Invalid ship placement: out of bounds');
 });

test('Rejects ship that extends beyond bottom edge', () => { 
    const gameboard = GameBoard();
    const ship = Ship(5);

    expect(() => {
        gameboard.placeShip(ship, 8, 0, 'vertical');
    }).toThrow('Invalid ship placement: out of bounds');
 });
