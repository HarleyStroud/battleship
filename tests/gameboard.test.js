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

test('Should mark a cell as hit and record missed attack when no ship is present', () => {
    const gameboard = GameBoard();
    gameboard.receiveAttack(0, 0);
    
    expect(gameboard.board[0][0].isHit).toBe(true);
    expect(gameboard.getMissedAttacks().some(m => m.row === 0 && m.col === 0)).toBe(true);
});

test('receiveAttack hits ship and marks cell as hit', () => {
    const gameboard = GameBoard();
    const ship = Ship(3);
    gameboard.placeShip(ship, 2, 2, 'horizontal');

    gameboard.receiveAttack(2, 2);

    expect(ship.isSunk()).toBe(false);
    expect(gameboard.board[2][2].isHit).toBe(true);
});

test('Report that all of a gameboard ships have been sunk', () => {
    const gameboard = GameBoard();
    const ship1 = Ship(2);
    const ship2 = Ship(3);

    gameboard.placeShip(ship1, 0, 0, 'horizontal'); // covers (0,0), (0,1)
    gameboard.placeShip(ship2, 1, 0, 'horizontal'); // covers (1,0), (1,1), (1,2)

    // Sink ship1
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);

    // Sink ship2
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(1, 1);
    gameboard.receiveAttack(1, 2);

    expect(gameboard.areAllShipsSunk()).toBe(true);
});

test('Gameboard reports not all ships are sunk if at least one is not sunk', () => {
    const gameboard = GameBoard();
    const ship1 = Ship(2);
    const ship2 = Ship(3);

    gameboard.placeShip(ship1, 0, 0, 'horizontal'); // (0,0), (0,1)
    gameboard.placeShip(ship2, 1, 0, 'horizontal'); // (1,0), (1,1), (1,2)

    // Sink ship1
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);

    // Partially hit ship2
    gameboard.receiveAttack(1, 0);

    expect(gameboard.areAllShipsSunk()).toBe(false); // ✅ not all ships are sunk
});

