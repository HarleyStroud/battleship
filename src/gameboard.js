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


    const placeShip = (ship, xCord, yCord) => {
        board[xCord][yCord].hasShip = true;
    };

    const receiveAttack = () => {

    };

    const areAllShipsSunk = () => {

    };

    return { placeShip, receiveAttack, areAllShipsSunk, board };
}