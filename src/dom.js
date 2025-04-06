import GameController from './index.js';

const gameContainer = document.querySelector('.game-container');

function renderUI(players, currentPlayer) {
    gameContainer.textContent = '';

    renderCurrentTurn(currentPlayer);
    const bothPlayerBoardsContainer = document.createElement('div');
    bothPlayerBoardsContainer.classList.add('both-players-board-container');
    gameContainer.appendChild(bothPlayerBoardsContainer);

    renderBoard(
        bothPlayerBoardsContainer,
        players[0].gameboard.board,
        'Player',
        currentPlayer
    );
    renderBoard(
        bothPlayerBoardsContainer,
        players[1].gameboard.board,
        'Computer',
        currentPlayer
    );
}

function renderCurrentTurn(currentPlayer) {
    const gameStatusContainer = document.createElement('div');
    const currentPlayerTurn = document.createElement('h2');
    gameStatusContainer.classList.add('game-status-container');
    currentPlayerTurn.textContent = `${currentPlayer} Turn`;
    gameStatusContainer.appendChild(currentPlayerTurn);
    gameContainer.appendChild(gameStatusContainer);
}

function renderAttackResultMessage(resultMessage) {
    const gameStatusContainer = document.querySelector('.game-status-container');
    const attackResult = document.createElement("h2");
    attackResult.textContent = resultMessage;
    attackResult.style.order = '1';
    gameStatusContainer.appendChild(attackResult);
}

function renderBoard(
    bothPlayerBoardsContainer, board,
    playerName,
    currentPlayer
) {
    const gameBoard = createGameBoard(bothPlayerBoardsContainer, playerName);

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

function createGameBoard(bothPlayerBoardsContainer, playerName) {
    const gameBoardContainer = document.createElement('div');
    gameBoardContainer.classList.add('game-board-container');

    const boardTitle = document.createElement('h2');
    boardTitle.textContent = playerName;
    gameBoardContainer.appendChild(boardTitle);

    const gameBoard = document.createElement('div');
    gameBoard.classList.add('game-board');
    gameBoardContainer.appendChild(gameBoard);
    bothPlayerBoardsContainer.appendChild(gameBoardContainer);

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

export default { renderUI, renderBoard, renderAttackResultMessage };
