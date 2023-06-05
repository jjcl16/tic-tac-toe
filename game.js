const gameContainer = document.querySelector('.game');
for (let index = 0; index < 9; index++) { //create the 9 boxes, and assign the event
  const box = document.createElement('div');
  box.classList.add('box');
  box.position = index;
  box.addEventListener("click", somebodyPlay);
  gameContainer.appendChild(box);  
}

const boxes = document.querySelectorAll(".box");
const boxesArray = Array.from(boxes);
const line1 =  document.createElement('div');
const line2 =  document.createElement('div');
const line3 =  document.createElement('div');
// boxesArray.map((box, index) => {
//   box.position = index;
//   box.addEventListener("click", somebodyPlay);
// });

const gameBoard = (function () {
  let games = 0;
  let moves = 0;
  let board = new Array(9);

  const whoPlaysNow = () => {
    if(gameBoard.games % 2 == 0 && gameBoard.moves % 2 == 0 ){ //even games and even moves
      return "x";
    }
    else if(gameBoard.games % 2 == 0 && gameBoard.moves % 2) { // even games and odd moves
      return "o";
    }
    else if(gameBoard.games % 2 && gameBoard.moves % 2 == 0 ){ //odd games and even moves
      return "o";
    }
    else if(gameBoard.games % 2 && gameBoard.moves % 2) { // odd games and odd moves
      return "x";
    }
  }
  const newGame = () => {
    gameBoard.games++;
    return gameBoard.games;
  }
  const newMove = () => {
    gameBoard.moves++;
    return gameBoard.moves;
  }
  const restartMoves = () => {
    gameBoard.moves = 0;
  }
  const writeOnBoard = (position, signal) => {
    if (gameBoard.board[position] == undefined) {
      gameBoard.board[position] = signal;
      console.log(`writeBoard ${signal} movida  ${gameBoard.moves} `);
      gameBoard.moves++;
      
    }
    boxesArray[position].textContent = gameBoard.board[position];
  }
  const restartGame = () => {
    gameBoard.games = 0;
    gameBoard.moves = 0;
    gameBoard.board = [];
    gameBoard.board = new Array(9);
    clearBoard();

  }
  const clearBoard = () => {
    boxesArray.map((box) => {
      box.textContent = "";
      box.classList.remove("verticalLine");
      box.classList.remove("horizontalLine");
      box.classList.remove("boxForHorizontalLine"); // Box for horizontal lines 
      clearLines();
    });
  }
  const clearLines = () => {
    //horizontal Lines
    line1.classList.remove('horizontalLine');
    line2.classList.remove('horizontalLine');
    line3.classList.remove('horizontalLine');
    // Vertical lines
    line1.classList.remove('verticalLine');
    line2.classList.remove('verticalLine');
    line3.classList.remove('verticalLine');
    // Diagonal 1 lines 
    line1.classList.remove('diagonalLine1');
    line2.classList.remove('diagonalLine1');
    line3.classList.remove('diagonalLine1');
    // Diagonal 2 Lines
    line1.classList.remove('diagonalLine2');
    line2.classList.remove('diagonalLine2');
    line3.classList.remove('diagonalLine2');
  }
  const nextGame = () => {
    gameBoard.games++;
    gameBoard.moves = 0;
    gameBoard.board = [];
    gameBoard.board = new Array(9);
    clearBoard();
  }
  const checkForWinner = () => {
    let check = false;
    check ||= verticalCheck();
    check ||= horizontalCheck();
    check ||= firstDiagonalLineCheck();
    check ||= secondDiagonalLineCheck();
    return check;
  }
  const verticalCheck = () => {
    let verticalChecker = false;
    for (let i = 0; i < 3; i++) {
      // check column
      verticalChecker ||=
        gameBoard.board[i] === gameBoard.board[i + 3] &&
        gameBoard.board[i] === gameBoard.board[i + 6] &&
        gameBoard.board[i] != undefined
            ? ( //return true to check and mark the line
              boxesArray[i].appendChild(line1),
              line1.classList.add('verticalLine'),
              boxesArray[i+3].appendChild(line2),
              line2.classList.add('verticalLine'),
              boxesArray[i+6].appendChild(line3),
              line3.classList.add('verticalLine'),
              true  )        
            : false;
    }
    return verticalChecker;
  }
  const horizontalCheck = () => {
    let horizontalChecker = false;
    for (let i = 0; i < 3; i++) {
    let rowIndex = i * 3;
    horizontalChecker ||=
      gameBoard.board[rowIndex] === gameBoard.board[rowIndex + 1] &&
      gameBoard.board[rowIndex] === gameBoard.board[rowIndex + 2] &&
      gameBoard.board[rowIndex] != undefined
          ? ( //return true to check and mark the line 
          line1.classList.add('horizontalLine'),
          boxesArray[rowIndex].classList.add('boxForHorizontalLine'),
          boxesArray[rowIndex].appendChild(line1),
          line2.classList.add('horizontalLine'),
          boxesArray[rowIndex+1].classList.add('boxForHorizontalLine'),
          boxesArray[rowIndex+1].appendChild(line2),
          line3.classList.add('horizontalLine'),
          boxesArray[rowIndex+2].classList.add('boxForHorizontalLine'),
          boxesArray[rowIndex+2].appendChild(line3),
          true  )
          : false;
    }
    return horizontalChecker;
  }
  const firstDiagonalLineCheck = () => {
    let firstDiagonalLineChecker = false;
    firstDiagonalLineChecker =
      (gameBoard.board[0] === gameBoard.board[4] && gameBoard.board[0] === gameBoard.board[8] && gameBoard.board[0] != undefined)
        ? ( //return true to check and mark the line 
        line1.classList.add('diagonalLine1'),
        boxesArray[0].classList.add('boxForHorizontalLine'),
        boxesArray[0].appendChild(line1),
        line2.classList.add('diagonalLine1'),
        boxesArray[4].classList.add('boxForHorizontalLine'),
        boxesArray[4].appendChild(line2),
        line3.classList.add('diagonalLine1'),
        boxesArray[8].classList.add('boxForHorizontalLine'),
        boxesArray[8].appendChild(line3),
        true  )
        : false;
    return firstDiagonalLineChecker;
  }
  const secondDiagonalLineCheck = () => {
    let secondDiagonalLineChecker = false;
    secondDiagonalLineChecker =
      (gameBoard.board[2] === gameBoard.board[4] && gameBoard.board[2] === gameBoard.board[6] && gameBoard.board[2] != undefined)
        ? ( //return true to check and mark the line 
        line1.classList.add('diagonalLine2'),
        boxesArray[2].classList.add('boxForHorizontalLine'),
        boxesArray[2].appendChild(line1),
        line2.classList.add('diagonalLine2'),
        boxesArray[4].classList.add('boxForHorizontalLine'),
        boxesArray[4].appendChild(line2),
        line3.classList.add('diagonalLine2'),
        boxesArray[6].classList.add('boxForHorizontalLine'),
        boxesArray[6].appendChild(line3),
        true  )
        : false;    
    return secondDiagonalLineChecker;
  }
  /*
  let whoPlay = false;
  const board = new Array(9);
  const changeValue = (signal, position) => {
    if (board[position] == undefined) {
      board[position] = signal;
    } else {
      whoPlay = !whoPlay;
    }
    boxesArray[position].textContent = board[position];
  };
  const nextMove = () => {
    console.log(whoPlay);
    return (whoPlay = !whoPlay);
  };

  const thereIsAWinner = () => {    
    let check = false;
    for (let i = 0; i < 3; i++) {
      // check column
      check ||=
        board[i] === board[i + 3] &&
        board[i] === board[i + 6] &&
        board[i] != undefined
          ? ( //return true to check and mark the line
            boxesArray[i].appendChild(line1),
            line1.classList.add('verticalLine'),
            boxesArray[i+3].appendChild(line2),
            line2.classList.add('verticalLine'),
            boxesArray[i+6].appendChild(line3),
            line3.classList.add('verticalLine'),
            true  )        
          : false;
      // check row
      let rowIndex = i * 3;
      check ||=
        board[rowIndex] === board[rowIndex + 1] &&
        board[rowIndex] === board[rowIndex + 2] &&
        board[rowIndex] != undefined
          ? ( //return true to check and mark the line 
          line1.classList.add('horizontalLine'),
          boxesArray[rowIndex].classList.add('boxForHorizontalLine'),
          boxesArray[rowIndex].appendChild(line1),
          line2.classList.add('horizontalLine'),
          boxesArray[rowIndex+1].classList.add('boxForHorizontalLine'),
          boxesArray[rowIndex+1].appendChild(line2),
          line3.classList.add('horizontalLine'),
          boxesArray[rowIndex+2].classList.add('boxForHorizontalLine'),
          boxesArray[rowIndex+2].appendChild(line3),
          true  )
          : false;
    }
    // check diagonal 1
    check ||=
      (board[0] === board[4] && board[0] === board[8] && board[0] != undefined)
        ? ( //return true to check and mark the line 
        line1.classList.add('diagonalLine1'),
        boxesArray[0].classList.add('boxForHorizontalLine'),
        boxesArray[0].appendChild(line1),
        line2.classList.add('diagonalLine1'),
        boxesArray[4].classList.add('boxForHorizontalLine'),
        boxesArray[4].appendChild(line2),
        line3.classList.add('diagonalLine1'),
        boxesArray[8].classList.add('boxForHorizontalLine'),
        boxesArray[8].appendChild(line3),
        true  )
        : false;
    // check diagonal 2
    check ||=
      (board[2] === board[4] && board[2] === board[6] && board[2] != undefined)
        ? ( //return true to check and mark the line 
        line1.classList.add('diagonalLine2'),
        boxesArray[2].classList.add('boxForHorizontalLine'),
        boxesArray[2].appendChild(line1),
        line2.classList.add('diagonalLine2'),
        boxesArray[4].classList.add('boxForHorizontalLine'),
        boxesArray[4].appendChild(line2),
        line3.classList.add('diagonalLine2'),
        boxesArray[6].classList.add('boxForHorizontalLine'),
        boxesArray[6].appendChild(line3),
        true  )
        : false;    
    return check;
  };

  const newGame = () =>{
    whoPlay = false;
    line1.className = "";
    line2.className = "";
    line3.className = "";
    board.length = 0;
    board.length = 9;
    boxesArray.map((box) => {
      box.textContent = "";
      box.classList.remove('boxForHorizontalLine');
    });
  }

  return { changeValue, nextMove, thereIsAWinner, newGame, board };

  */

  return {whoPlaysNow, newGame, newMove,restartMoves, writeOnBoard, restartGame, nextGame, checkForWinner, games, moves, board };
})();

const player = (signal) => {
  const play = (position) => {
    console.log(`player.play ${signal}`);    
    gameBoard.writeOnBoard(position, signal);
  };
  return { play };
};

const playerX = player("✖");
const playerO = player("〇");


function somebodyPlay(e) {
  let position = e.currentTarget.position;
  if (gameBoard.whoPlaysNow() == "x"){
    playerX.play(position);
    console.log(`somebodyPlay x`);
  } 
  else {
    playerO.play(position);
    console.log(`somebodyPlay o`);
  }
  gameBoard.checkForWinner();
  /*gameBoard.nextMove()
    ? playerX.play(e.currentTarget.position)
    : playerO.play(e.currentTarget.position);
    let whoWins = "none";
  if (gameBoard.thereIsAWinner()){
    whoWins = !gameBoard.nextMove() ? "✖" : "〇";
    alert (`The ${whoWins} wins.`);
  }*/
/*
  for (let indexgames = 0; indexgames < 10; indexgames++) {
    console.log(`Game: ${indexgames+1}`);
    gameBoard.games = indexgames;
    for (let indexmoves = 0; indexmoves < 9; indexmoves++) {
      console.log(`Move ${indexmoves+1}: ${gameBoard.whoPlaysNow(indexgames,indexmoves)}`);
      gameBoard.moves++;
    }
    
  }*/

  //console.log(e.currentTarget.position)
  /*do {
    console.log(`Game: ${gameBoard.games}`);    
    do {
      console.log(`Move ${gameBoard.moves+1}: ${gameBoard.whoPlaysNow()}`);
      gameBoard.newMove()
    } while (gameBoard.moves<10);
    gameBoard.newGame()
    gameBoard.restartMoves()
  } while (gameBoard.games<10);
  */
  
}
