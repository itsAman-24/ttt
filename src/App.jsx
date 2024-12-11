import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/WinningCombinations";
import GameOver from "./GameOver";

const PLAYERS = {
  X : "Player 1",
  O : "Player 2"
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function derivedActivePlayer(gameTurns) {
    let currentPlayer = "X";

    if(gameTurns.length > 0 && gameTurns[0].player === "X") {
      currentPlayer = "O";
    }

    return currentPlayer;
}

function derivedWinnerPlayer(gameBoard, players) {

  let winner;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol].toUpperCase();
    }
  }

  return winner;

}

//function for the creating gameBoard with every turn player by player
function derivedGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for(const turn of gameTurns) {
    const {square , player} = turn;
    const {row , col} = square;

    gameBoard[row][col] = player;

  }
  return gameBoard;
}


function App() {
  const [gameTurns , setGameTurns] = useState([]);
  const [players , setPlayers] = useState(PLAYERS);

  const activePlayer = derivedActivePlayer(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns);
  

  //calling function to get the actual winner for the game
  const winner = derivedWinnerPlayer(gameBoard, players);

  //checking if the game is draw or not 
  const hasDraw = gameTurns.length === 9 && !winner;


  function handleSelectedSquare(rowIndex, colIndex) {
    // setActivePlayer((currentActivePlayer) => currentActivePlayer === "X" ? "O" : "X" );
    
    setGameTurns(prevTurns => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex}, player: currentPlayer} , ...prevTurns,];
      
      return updatedTurns;
    });

  }

  
  function handleRestart() {
    setGameTurns([]);
  }

  function handleUpdatedPlayerName(symbol, newPlayerName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newPlayerName
      };
    });
  }

  return (
    <main>
    <div id="game-container">
    <ol id="players" className="highlight-player">
      <Player initialPlayerName = {PLAYERS.X} symbol = "X" isActive = {activePlayer === "X"} onChangeName = {handleUpdatedPlayerName}/>
      <Player initialPlayerName = {PLAYERS.O} symbol = "O" isActive = {activePlayer === "O"} onChangeName = {handleUpdatedPlayerName}/>
    </ol>
    {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
    <GameBoard onSquareSelect = {handleSelectedSquare} activePlayerSymbol = {activePlayer} board = {gameBoard}/>
    </div>
    <Log turns = {gameTurns}/>
    </main>
  )
}

export default App;
