

export default function GameBoard({onSquareSelect, board}) {
  

  // const[gameBoard , setGameBoard] = useState(initialGameBoard);
  
  // function handleSelectedButton(rowIndex,colIndex) {

  //   setGameBoard((previousGameBoard) => {
  //       const updatedGameBoard = [...previousGameBoard.map(innerBoard => [...innerBoard])];
  //       updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updatedGameBoard;
  //   });

  //   onSquareSelect();

  // }



  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button  onClick={() => onSquareSelect(rowIndex,colIndex)} disabled={playerSymbol!== null}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

// hard Coded dection for gameBoard

{
  /* <li>
                <ol>
                    <li><button></button></li>
                    <li><button></button></li>
                    <li><button></button></li>
                </ol>
            </li>

            <li>
                <ol>
                    <li><button></button></li>
                    <li><button></button></li>
                    <li><button></button></li>
                </ol>
            </li>

            <li>
                <ol>
                    <li><button></button></li>
                    <li><button></button></li>
                    <li><button></button></li>                    
                </ol>
            </li> */
}
