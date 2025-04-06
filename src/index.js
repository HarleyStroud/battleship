import Player from './player.js';
import Ship from './ship.js';
import dom from './dom.js';

const GameController = (() => {
    const players = [];
    let currentPlayer = '';

    const startGame = () => {
        const player = Player('Player');
        const computerPlayer = Player('Computer');
        players[0] = player;
        players[1] = computerPlayer;
        currentPlayer = players[0];

        player.gameboard.placeShip(Ship(3), 0, 0, 'horizontal');
        player.gameboard.placeShip(Ship(4), 0, 0, 'horizontal');

        computerPlayer.gameboard.placeShip(Ship(5), 5, 7, 'vertical');

        dom.renderUI(players, currentPlayer.playerName);
    };

    const takeTurn = (row, column) => {
        let targetBoard = {};

        if (currentPlayer === players[0]) {
            targetBoard = players[1].gameboard;
        }
        else if (currentPlayer === players[1]) {
            targetBoard = players[0].gameboard;
        }

        const attackResult = targetBoard.receiveAttack(row, column);

        console.log(attackResult);
        if(!attackResult.valid) return;

        switchPlayerTurn();
        dom.renderUI(players, currentPlayer.playerName);
        dom.renderAttackResultMessage(attackResult.message);
    };

    const switchPlayerTurn = () => {
        if (currentPlayer === players[0]) {
            currentPlayer = players[1];
        } else {
            currentPlayer = players[0];
        }
    };

    return { startGame, takeTurn };
})();


GameController.startGame();

export default GameController;
