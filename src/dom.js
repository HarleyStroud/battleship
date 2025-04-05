import GameController from './index.js';

const mainContainer = document.querySelector('.main-container');

function renderUI(players, currentPlayer) {
    mainContainer.textContent = '';
    renderCurrentTurn(currentPlayer);
    renderBoard(players[0].gameboard.board, 'Player', currentPlayer);
    renderBoard(players[1].gameboard.board, 'Computer', currentPlayer);
}

function renderCurrentTurn(currentPlayer) {
    const currentPlayerTurn = document.createElement('h2');
    currentPlayerTurn.textContent = currentPlayer;
    mainContainer.appendChild(currentPlayerTurn);
}

function renderBoard(board, playerName, currentPlayer) {
    const gameBoard = createGameBoard(mainContainer, playerName);

    const rows = board.length;
    const columns = board[0].length;

    addColumnLabels(gameBoard, columns);
    addRowLabels(gameBoard, rows);

    for (let row = 0; row < rows; row++) {
        let columnsInRow = board[row];
        for (let col = 0; col < columnsInRow.length; col++) {
            const boardCell = document.createElement('div');
            boardCell.style.gridRow = row + 2;
            boardCell.style.gridColumn = col + 2;
            boardCell.classList.add('board-cell');

            if (playerName !== currentPlayer) {
                boardCell.addEventListener('click', () => {
                    handleCellClick(row, col);
                });
            }
            
            if (board[row][col].isHit) {
                if (board[row][col].hasShip) {
                    boardCell.classList.add('board-cell-ship-hit');
                } else {
                    boardCell.classList.add('board-cell-hit');
                }
            } else {
                if (board[row][col].hasShip) {
                    boardCell.classList.add('board-cell-ship');
                }
            }

            gameBoard.appendChild(boardCell);
        }
    }
}

function createGameBoard(mainContainer, playerName) {
    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game-container');

    const boardTitle = document.createElement('h2');
    boardTitle.textContent = playerName;
    gameContainer.appendChild(boardTitle);

    const gameBoard = document.createElement('div');
    gameBoard.classList.add('game-board');
    gameContainer.appendChild(gameBoard);
    mainContainer.appendChild(gameContainer);

    return gameBoard;
}

function addColumnLabels(gameBoard, columns) {
    for (let col = 0; col < columns; col++) {
        const label = document.createElement('div');
        label.classList.add('label');
        label.textContent = col + 1;
        label.style.gridRow = 1;
        label.style.gridColumn = col + 2;
        gameBoard.appendChild(label);
    }
}

function addRowLabels(gameBoard, rows) {
    const letters = 'ABCDEFGHIJ'.split('');
    for (let row = 0; row < rows; row++) {
        const label = document.createElement('div');
        label.className = 'label';
        label.textContent = letters[row];
        label.style.gridRow = row + 2;
        label.style.gridColumn = 1;
        gameBoard.appendChild(label);
    }
}

function handleCellClick(row, col) {
    console.log(`Cell clicked at: ${row}, ${col}`);
    GameController.takeTurn(row, col);
}

export default { renderUI, renderBoard };
