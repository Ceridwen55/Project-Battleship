import {ship,gameboard, player, game } from './gamelogic.js';
import {renderBoard,placeShip} from './platform.js';

//ship class test
test('create a ship with length and base condition on not being bombed 0',()=>
{
    const aShip = new ship(3);
    expect(aShip.length).toBe(3);
    expect(aShip.bombed).toBe(0);
})

test('getting bombed so the bombed count increment',()=>
{
    const aShip = new ship(4);
    aShip.hit();
    aShip.hit();
    expect(aShip.bombed).toBe(2);
    
});

test('sunk when the count of length equal to bombed',()=>
    {
        const aShip = new ship(2);
        aShip.hit();
        aShip.hit();
        expect(aShip.isSunk()).toBe(true);
        
    });

// gameboard test

test('create a new gameboard and check .this are empy array',()=>
{
    const aBoard = new gameboard();
    expect(aBoard.board).toEqual([]);
    expect(aBoard.missedAttack).toEqual([]);
    expect(aBoard.ships).toEqual([]);   
});

test('test ship position',()=>
    {
        const aBoard = new gameboard();
        const aShip = new ship(2);
        aBoard.shipPosition(aShip,3);
        expect(aBoard.ships).toEqual([{ship : aShip, coordinates : [3]}]);
         
    })

test('when attack becomes valid',()=>
    
    {
        const aBoard = new gameboard();
        const aShip = new ship(2);
        aBoard.shipPosition(aShip,3);
        aBoard.receiveAttack(3);
        expect(aShip.bombed).toBe(1);

    });

test('Everything is doomed all the ships i mean',() =>
    {
        const aBoard = new gameboard();
        const aShip = new ship(2);
        const bShip = new ship(2);
        aBoard.shipPosition(aShip,1);
        aBoard.shipPosition(bShip,2);
        aBoard.receiveAttack(1);
        aBoard.receiveAttack(1);
        aBoard.receiveAttack(2);
        aBoard.receiveAttack(2);
        expect(aBoard.allShipsAreDoomed()).toBe(true);
    })

//player test
test('create a player with a given name and an empty gameboard', () => 
    { 
        const playerName = 'John'; 
        const aPlayer = new player(playerName); 
        expect(aPlayer.name).toBe(playerName); 
        expect(aPlayer.gameboard).toBeInstanceOf(gameboard); 
        expect(aPlayer.gameboard.board).toEqual([]); 
        expect(aPlayer.gameboard.missedAttack).toEqual([]); 
        expect(aPlayer.gameboard.ships).toEqual([]); 
    });