export class ship {
    constructor(length){ //add length as the part of it
        
    this.length = length;
    this.bombed = 0; //to make sure the status starts from 0
    
    }
    
    hit()
    {
        this.bombed++; // increase the "hits" number
    }
    
    isSunk()
    {
        if(this.bombed == this.length) // if the "hits" match the total length, the ship is sunk
        {
            console.log("SUNK"); 
        }
    }
}


export class gameboard {
    constructor(){
        
        this.board = []; // initialize board as an empty array cause its empty at the start
        this.missedAttack = []; // array to track missed attacks
        this.ships = []; // how many ships defined by an array
    
    }
    
    shipPosition (ship, coordinates) // define ship position by calling ship class
    {
        this.ships.push({ship, coordinates}); // push the coordinates and ship as an object into the this.ships array
    }
    
    receiveAttack(coordinates)
    {
        
        for (let i = 0; i < this.ships.length; i++)
        {
            let {ship, coords} = this.ships[i]; // make sure it pinpoints the matched ship by traversing the array
            if (coords.includes(coordinates)) // if coordinates matches the this.ships coord, it is defined by attacked
            {
                ship.hit(); // call the hit function above
                return;
            }
            else
            {
                this.missedAttack.push(coordinates); // tracked the misses attacks by adding the array
            }
        }
        
    }
    
    allShipsAreDoomed()
    {
        return this.ships.every(({ship}) => ship.isSunk());
           
    }
    
}

export class player {
    constructor(name) {
        this.name = name;
        this.gameboard = new gameboard();
    }
}

export class game {
    constructor (player1, player2) { // to create subject in this function
        
        this.player1 = new player(player1); // create player1 based on the player class before
        this.player2 = new player(player2); // create player2 based on the player class before
        this.currentPlayer = this.player1; // define first turn or current turn
    }
    
    switchTurn() // create switch function
    {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1 ; // means that current player is determined by switching the logic
        
    }
    
    playTurn() // rules why its turning between two players (after player 1 do the attack, it switches to another player)
    {
        
        
        let opponent = this.currentPlayer === this.player1 ? this.player2.gameboard : this.player1.gameboard; // determined the opponent
        
        opponent.receiveAttack(); // opponent getting attacked
        
        if(opponent.allShipsAreDoomed() == true )
        {
            
            console.log(`${this.currentPlayer} WINS`);
            this.endGame()
            
        }
        else
        {
            this.switchTurn();
        }
        
    }
    
    endGame()
    {
        console.log("GAME OVER");
    }
    

}