let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('.reset');
let statusText = document.querySelector('.status');

let turnX = true; // true: X's turn; false: O's turn

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (turnX) {
      box.innerText = 'X';
      statusText.innerText = "Turn for O";
    } else {
      box.innerText = 'O';
      statusText.innerText = "Turn for X";
    }
    box.disabled = true;
    turnX = !turnX;
    checkWin();
    checkDraw();
  });
});

const checkWin = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      // Winner found
      statusText.innerText = `Winner is ${pos1}!`;
      highlightWinner(pattern);
      disableAllBoxes();
      return;
    }
  }
};

const checkDraw = () => {
  let allFilled = Array.from(boxes).every(box => box.innerText !== "");
  let hasWinner = statusText.innerText.includes("Winner");
  if (allFilled && !hasWinner) {
    statusText.innerText = "It's a Draw!";
  }
};

const highlightWinner = (pattern) => {
  pattern.forEach(index => {
    boxes[index].classList.add('winner');
  });
};

const disableAllBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

resetButton.addEventListener('click', () => {
  boxes.forEach(box => {
    box.innerText = '';
    box.disabled = false;
    box.classList.remove('winner');
  });
  statusText.innerText = "Turn for X";
  turnX = true;
});
