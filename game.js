const nextMovePlayer = document.querySelector('.nextMovePlayer');
const gameContainer = document.querySelector('.game');
// button restart game
const restartGameButton = document.createElement('button'); 
restartGameButton.textContent = "Restart Game"
restartGameButton.addEventListener("click", restartGame);
nextMovePlayer.appendChild(restartGameButton);
//how plays
const howPlay = document.createElement('div'); 
howPlay.textContent = "Next Player: ✖"
//restartGameButton.addEventListener("click", restartGame);
nextMovePlayer.appendChild(howPlay);
// next game button
const nextGameButton = document.createElement('button'); // button new game
nextGameButton.textContent = "Next Game"
nextGameButton.addEventListener("click", nextGame);
nextMovePlayer.appendChild(nextGameButton);

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
    howPlay.textContent = "Next Player: ✖"
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
    if (gameBoard.whoPlaysNow() == "x"){
      howPlay.textContent = "Next Player: ✖"
    } 
    else {
      howPlay.textContent = "Next Player: 〇"
    }
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
              howPlay.textContent = `Player ${gameBoard.board[i]} wins`,
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
          howPlay.textContent = `Player ${gameBoard.board[rowIndex]} wins`,
          true   )
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
        howPlay.textContent = `Player ${gameBoard.board[0]} wins`,
        true    )
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
        howPlay.textContent = `Player ${gameBoard.board[2]} wins`,
        true    )
        : false;    
    return secondDiagonalLineChecker;
  }


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
  if (!gameBoard.checkForWinner()){
    let position = e.currentTarget.position;
    if (gameBoard.whoPlaysNow() == "x"){
      playerX.play(position);
      console.log(`somebodyPlay x`);
      howPlay.textContent = "Next Player: 〇"
    } 
    else {
      playerO.play(position);
      console.log(`somebodyPlay o`);
      howPlay.textContent = "Next Player: ✖"
    }
    gameBoard.checkForWinner();  
  } 
  else {
    console.log("There is a Winner Already");
  }
  
}
function restartGame() {
  gameBoard.restartGame();
}

function nextGame() {
  gameBoard.nextGame();
}