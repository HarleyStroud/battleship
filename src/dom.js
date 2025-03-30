const mainContainer = document.querySelector('.main-container');

function renderBoard(board, playerName) {
    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game-container');

    const boardTitle = document.createElement('h2');
    boardTitle.textContent = playerName;
    gameContainer.appendChild(boardTitle);

    const gameBoard = document.createElement('div');
    gameBoard.classList.add('game-board');
    gameBoard.textContent = '';
    gameContainer.appendChild(gameBoard);

    mainContainer.appendChild(gameContainer);

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
            gameBoard.appendChild(boardCell);
        }
    }
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

export default { renderBoard };
