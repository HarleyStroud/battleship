export default function GameBoard() {
    let missedAttacks = [];

    const setBoard = (rows = 10, cols = 10) => {
        return Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => ({
                isHit: false,
                hasShip: false
            }))
        );
    };

    let board = setBoard();

    const placeShip = (ship, xCord, yCord, orientation) => {
        if (
            xCord < 0 || yCord < 0 ||
            orientation === 'horizontal' && yCord + ship.length > board[0].length ||
            orientation === 'vertical' && xCord + ship.length > board.length
        ) {
            throw new Error('Invalid ship placement: out of bounds');
        }

        // Place the ship on the board one cell at a time based on its orientation:
        // - Horizontal: cells to the right of the starting coordinate
        // - Vertical: cells below the starting coordinate
        for (let i = 0; i < ship.length; i++) {
            if (orientation === 'horizontal') {
                board[xCord][yCord + i].hasShip = true;
            }
            else if (orientation === 'vertical') {
                board[xCord + i][yCord].hasShip = true;
            }
        }
    };

    const receiveAttack = () => {

    };

    const areAllShipsSunk = () => {

    };

    return { placeShip, receiveAttack, areAllShipsSunk, board };
}
