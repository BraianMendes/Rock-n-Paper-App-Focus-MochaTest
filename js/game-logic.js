// All code should be written in this file.
let playerOneMoveOneType;
let playerOneMoveTwoType;
let playerOneMoveThreeType;

let playerTwoMoveOneType;
let playerTwoMoveTwoType;
let playerTwoMoveThreeType;

let playerOneMoveOneValue;
let playerOneMoveTwoValue;
let playerOneMoveThreeValue;

let playerTwoMoveOneValue;
let playerTwoMoveTwoValue;
let playerTwoMoveThreeValue;

let playerOneWins, playerTwoWins;

const setPlayerMoves = (player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) => {
    if (!moveOneType || !moveTwoType || !moveThreeType || !moveOneValue || !moveTwoValue || !moveThreeValue){
        return;
    }
    
    if (!isValidMoveType(moveOneType) || !isValidMoveType(moveTwoType) || !isValidMoveType(moveThreeType)) {
        return;
    };

    if (!isValidMoveValue(moveOneValue) || !isValidMoveValue(moveTwoValue) || !isValidMoveValue(moveThreeValue)){
        return;
    }

    if ((moveOneValue + moveTwoValue + moveThreeValue) > 99) {
        return;
    }

    if (player === 'Player One') {
        playerOneMoveOneType = moveOneType;
        playerOneMoveOneValue = moveOneValue;
        playerOneMoveTwoType = moveTwoType;
        playerOneMoveTwoValue = moveTwoValue;
        playerOneMoveThreeType = moveThreeType;
        playerOneMoveThreeValue = moveThreeValue; 
    }

    if (player === 'Player Two') {
        playerTwoMoveOneType = moveOneType;
        playerTwoMoveOneValue = moveOneValue;
        playerTwoMoveTwoType = moveTwoType;
        playerTwoMoveTwoValue = moveTwoValue;
        playerTwoMoveThreeType = moveThreeType;
        playerTwoMoveThreeValue = moveThreeValue; 
    }    
}

function isValidMoveType(moveType) {
    return (moveType === 'rock') || (moveType === 'paper') || (moveType === 'scissors');
}
    
function isValidMoveValue(moveValue){
    return (moveValue >= 1 ) && (moveValue <= 99);
}

const getRoundWinner = (roundNumber) => {
    switch(roundNumber){
        case 1:
            return getMoveWinner(playerOneMoveOneType, playerTwoMoveOneType, playerOneMoveOneValue, playerTwoMoveOneValue);
        case 2:
            return getMoveWinner(playerOneMoveTwoType, playerTwoMoveTwoType, playerOneMoveTwoValue, playerTwoMoveTwoValue);
        case 3:
            return getMoveWinner(playerOneMoveThreeType, playerTwoMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeValue);
        default: return null;
    }
    
}

function getMoveWinner(playerOneMoveType, playerTwoMoveType, playerOneMoveValue, playerTwoMoveValue){

    if(!playerOneMoveType || !playerOneMoveValue || !playerTwoMoveType || !playerTwoMoveValue){
        return null;
    }

    if (playerOneMoveType === playerTwoMoveType) {
        if (playerOneMoveValue > playerTwoMoveValue){
            return 'Player One';
        } else if (playerOneMoveValue < playerTwoMoveValue){
            return 'Player Two';
        } else {
            return 'Tie';
        }
    }

    if (playerOneMoveType === 'rock'){
        if (playerTwoMoveType === 'scissors'){
            return 'Player One';
        } else {
            return 'Player Two';
        }
    } else if (playerOneMoveType === 'paper'){
        if (playerTwoMoveType === 'rock'){
            return 'Player One';
        } else {
            return 'Player Two';
        }
    } else {
        if (playerTwoMoveType === 'paper'){
            return 'Player One';
        } else {
            return 'Player Two';
        }
    }
}

function getGameWinner(){
    if( !playerOneMoveOneType || !playerOneMoveTwoType || !playerOneMoveThreeType ||
        !playerOneMoveOneValue || !playerOneMoveTwoValue || !playerOneMoveThreeValue ||
        !playerTwoMoveOneType || !playerTwoMoveTwoType || !playerTwoMoveThreeType ||
        !playerTwoMoveOneValue || !playerTwoMoveTwoValue || !playerTwoMoveThreeValue){
            return null;
        }

    playerOneWins = 0;
    playerTwoWins = 0;

    const roundOneWinner = getRoundWinner(1);
    const roundTwoWinner = getRoundWinner(2);
    const roundThreeWinner = getRoundWinner(3);

    addWin(roundOneWinner);
    addWin(roundTwoWinner);
    addWin(roundThreeWinner);

    if(playerOneWins > playerTwoWins){
        return 'Player One';
    } else if (playerOneWins < playerTwoWins){
        return 'Player Two';
    } else {
        return 'Tie';
    }
}

function addWin(winner){
    if (winner === 'Player One'){
        playerOneWins = (playerOneWins + 1) || 1;
    } else if (winner === 'Player Two'){
        playerTwoWins = (playerTwoWins + 1) || 1;
    }
}

function setComputerMoves(){
    const moves = ['rock', 'paper', 'scissors'];

    const moveOneType = moves[Math.floor(Math.random() * 3)];
    const moveTwoType = moves[Math.floor(Math.random() * 3)];
    const moveThreeType = moves[Math.floor(Math.random() * 3)];

    const moveOneValue = Math.floor(Math.random() * 96) + 1;
    const moveTwoValue = Math.floor(Math.random() * (97 - moveOneValue)) + 1;
    const moveThreeValue = 99 - moveOneValue - moveTwoValue;

    setPlayerMoves('Player Two', moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue)
}