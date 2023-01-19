const boxes = document.querySelectorAll(".box");
const boxesArray = Array.from(boxes);
boxesArray.map((box, index) => {
  box.position = index;
  box.addEventListener("click", somebodyPlay);
});

const gameBoard = (function () {
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

  const checkBoard = () => {
    let check = false;
    for (let i = 0; i < 3; i++) {
      let rowIndex = i * 3;
      check =
        check ||
        (board[i] === board[i + 3] &&
          board[i] === board[i + 6] &&
          board[i] != undefined)
          ? true
          : false; // check column
      check =
        check ||
        (board[rowIndex] === board[rowIndex + 1] &&
          board[rowIndex] === board[rowIndex + 2] &&
          board[rowIndex] != undefined)
          ? true
          : false; // check row
    }
    return check;
  };

  return { changeValue, nextMove, checkBoard };
})();

const player = (signal) => {
  const play = (position) => {
    console.log({ signal, position });
    gameBoard.changeValue(signal, position);
  };
  return { signal, play };
};

const playerOne = player("✖");
const playerTwo = player("〇");

function somebodyPlay(e) {
  gameBoard.nextMove()
    ? playerOne.play(e.currentTarget.position)
    : playerTwo.play(e.currentTarget.position);
  console.log("---------------------------------------------");
  console.log(`CheckBoard: ${gameBoard.checkBoard()}`);
}
