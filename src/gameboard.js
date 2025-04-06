export default function GameBoard() {
    const ships = [];
    const missedAttacks = [];

    const getMissedAttacks = () => [...missedAttacks];

    const setBoard = (rows = 10, cols = 10) => {
        return Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => ({
                isHit: false,
                hasShip: false,
                ship: null,
            }))
        );
    };

    let board = setBoard();

    const placeShip = (ship, xCord, yCord, orientation) => {
        if (
            xCord < 0 ||
            yCord < 0 ||
            (orientation === 'horizontal' &&
                yCord + ship.length > board[0].length) ||
            (orientation === 'vertical' && xCord + ship.length > board.length)
        ) {
            throw new Error('Invalid ship placement: out of bounds');
        }

        // Place the ship on the board one cell at a time based on its orientation:
        // - Horizontal: cells to the right of the starting coordinate
        // - Vertical: cells below the starting coordinate
        for (let i = 0; i < ship.length; i++) {
            if (orientation === 'horizontal') {
                board[xCord][yCord + i].hasShip = true;
                board[xCord][yCord + i].ship = ship;
            } else if (orientation === 'vertical') {
                board[xCord + i][yCord].hasShip = true;
                board[xCord + i][yCord].ship = ship;
            }
        }

        ships.push(ship);
    };

    const receiveAttack = (row, col) => {
        if (row < 0 || col < 0 || col > board[0].length || row > board.length) {
            throw new Error('Invalid attack placement: out of bounds');
        }

        const cell = board[row][col];
        if (cell.isHit) {
            return { valid: false, message: 'Already attacked' };
        }

        cell.isHit = true;

        if (cell.hasShip) {
            cell.ship.hit();
            if (cell.ship.isSunk()) {
                return {
                    valid: true,
                    hit: true,
                    sunk: cell.ship.isSunk(),
                    message: 'Ship Sunk!',
                };
            }
            else {
                return {
                    valid: true,
                    hit: true,
                    sunk: cell.ship.isSunk(),
                    message: 'Ship Hit!',
                };
            }
        }
        else {
            missedAttacks.push({ row, col });
        }

        return { valid: true, hit: false, sunk: false, message: "Miss!" };
    };

    const areAllShipsSunk = () => {
        let allSunk = true;
        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].isSunk()) {
                allSunk = false;
                break;
            }
        }
        return allSunk;
    };

    return {
        placeShip,
        receiveAttack,
        areAllShipsSunk,
        board,
        getMissedAttacks,
    };
}
