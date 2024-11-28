import { ship, gameboard, player, game } from './gamelogic.js';


export function renderBoard(gameboard, containerId, clickHandler) { //create a board with div inside a function

        let mainBoard = document.getElementById(containerId); //try to call the parameter (the board)
        
        if (!mainBoard) //if the container doesnt exist, auto create the main board
        {
            mainBoard = document.createElement("div");
            mainBoard.id = containerId;
            document.body.appendChild(mainBoard);
        }

        mainBoard.innerHTML = ""; // clear the inner html

        let grid = document.createElement("div"); // create a div as a grid

        for (let i = 0; i < 10; i++)
        {
           for (let j = 0; j < 10; j++)
            {
                let square = document.createElement("div"); //create the square
                square.style.width = "30px";
                square.style.height = "30px";
                square.style.border = "1px solid navy";
                square.style.backgroundColor = "lightblue";

                square.dataset.coordinates = `${i},${j}`; // coordinate per square

                if(gameboard.ships.some(({coordinates})=> coordinates.includes(`${i},${j}`))) // if ships coordinates in gameboard class match the coordinates of the square
                {
                    square.style.backgroundColor = "gray"; // it means the ship will show
                }
                if(gameboard.missedAttack.includes(`${i},${j}`))
                {
                    square.style.backgroundColor = "red"; // it means the attack misses
                }
                square.addEventListener("click",()=> clickHandler(`${i},${j}`));
                grid.appendChild(square);
            } 
        }

        mainBoard.appendChild(grid);
}


document.addEventListener("DOMContentLOaded", () =>
{
    const gameInstance = new Game('Player1', 'Computer');

    const handleAttack = (coordinates) =>
    {
        gameInstance.playTurn(coordinates);
        renderBoard(gameInstance.player1.gameboard,'player1-board',handleAttack);
        renderBoard(gameInstance.player2.gameboard,'player2-board',handleAttack);

    }
    renderBoard(gameInstance.player1.gameboard,'player1-board',handleAttack);
    renderBoard(gameInstance.player2.gameboard,'player2-board',handleAttack);
});

function placeShip(gameboard,ship,coordinates)
{
    gameboard.shipPosition(ship, coordinates);
}

// Example usage (hardcoded positions for now)
const player1Board = new Gameboard();
const player2Board = new Gameboard();

// Place ships for Player 1 and Player 2
placeShip(player1Board, new Ship(4), ['0,0', '0,1', '0,2', '0,3']);
placeShip(player2Board, new Ship(4), ['1,0', '1,1', '1,2', '1,3']);

// Update board rendering accordingly
renderBoard(player1Board, 'player1-board');
renderBoard(player2Board, 'player2-board');

