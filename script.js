// обьект с кубиками png
const hubImg = {
    1: `<img src="./src/first.png" />`,
    2: `<img src="./src/second.png" />`,
    3: `<img src="./src/third.png" />`,
    4: `<img src="./src/fourth.png" />`,
    5: `<img src="./src/fifth.png" />`,
    6: `<img src="./src/sixth.png" />`,
};

let board = document.querySelector('.board'),
    viewFirstCube = document.querySelector('.firstCube'),
    viewSecondCube = document.querySelector('.secondCube'),
    viewFirstCubeBot = document.querySelector('.firstCubeBot'),
    viewSecondCubeBot = document.querySelector('.secondCubeBot'),
    roundWinner = document.querySelector('#roundWinner'),
    move = document.querySelector('#move'),
    countMove = document.querySelector('#countMove'),
    heartsPlayer = document.querySelector('.heartsPlayer'),
    heartsBot = document.querySelector('.heartsBot'),
    btn = document.querySelector('button'),
    winner = document.querySelector('#winner'),
    playAgain = document.querySelector('#yes'),
    noPlay = document.querySelector('#no'),
    startBot = document.querySelector('#startBot'),
    startPlayer = document.querySelector('#startPlayer'),
    choiceBot = document.querySelector('#choiceBot'),
    choicePlayer = document.querySelector('#choicePlayer'),
    playerOne = document.querySelector('#player1'),
    playerTwo = document.querySelector('#player2'),
    profilePlayer1 = document.querySelector('.player'),
    profilePlayer2 = document.querySelector('.computer'),
    countPlayer = 2,
    countBot = 2,
    countRound = 1,
    whoMove = 1;
  // инициализация переменных для привязки к резульату рандома
let firstCube, secondCube, playerCost, botCost;
  


// функции ходов с ботом
function movePlayer() {
  btn.setAttribute('disabled', 'disabled');
  if (viewFirstCube.children.length > 0 && viewSecondCube.children.length > 0) {
    viewFirstCube.children[0].remove();
    viewSecondCube.children[0].remove();
  };
  if (viewFirstCubeBot.children.length > 0 && viewSecondCubeBot.children.length > 0) {
    viewFirstCubeBot.children[0].remove();
    viewSecondCubeBot.children[0].remove();
  };
  random(1, 6);
  viewFirstCube.innerHTML = (hubImg[firstCube]);
  viewSecondCube.innerHTML = (hubImg[secondCube]);
  playerCost = firstCube + secondCube;
  move.textContent = "Ход Бота";
  profilePlayer2.style.boxShadow = "5px 5px 50px red";
    profilePlayer1.style.boxShadow = "5px 5px 50px black";
  return playerCost;
}

function moveBot() {
  if (viewFirstCubeBot.children.length > 0 && viewSecondCubeBot.children.length > 0) {
    viewFirstCubeBot.children[0].remove();
    viewSecondCubeBot.children[0].remove();
  };
  random(1, 6);
  botCost = firstCube + secondCube;
  btn.removeAttribute('disabled');
  viewFirstCubeBot.innerHTML = (hubImg[firstCube]);
  viewSecondCubeBot.innerHTML = (hubImg[secondCube]);
  move.textContent = "Ваш ход";
  console.log("Ход бота с ботом");
  whoWinner(playerCost, botCost, true);
  profilePlayer1.style.boxShadow = "5px 5px 50px red";
  profilePlayer2.style.boxShadow = "5px 5px 50px black";
  return botCost;
}
// Функции ходов с человеком
function movePlayerOne() {
  startPlayer.setAttribute('disabled', 'disabled');
  if (viewFirstCube.children.length > 0 && viewSecondCube.children.length > 0) {
    viewFirstCube.children[0].remove();
    viewSecondCube.children[0].remove();
  };
  if (viewFirstCubeBot.children.length > 0 && viewSecondCubeBot.children.length > 0) {
    viewFirstCubeBot.children[0].remove();
    viewSecondCubeBot.children[0].remove();
  };
  random(1, 6);
  playerCost = firstCube + secondCube;
  whoMove++;
  (setTimeout(() => {
    viewFirstCube.innerHTML = (hubImg[firstCube]);
    viewSecondCube.innerHTML = (hubImg[secondCube]);
    startPlayer.removeAttribute('disabled')
    move.textContent = "Ход Игрока 2";
    profilePlayer2.style.boxShadow = "5px 5px 50px red";
    profilePlayer1.style.boxShadow = "5px 5px 50px black";
  }, 1000))
  return playerCost;
}
function movePlayerTwo() {
  startPlayer.setAttribute('disabled', 'disabled');
  if (viewFirstCubeBot.children.length > 0 && viewSecondCubeBot.children.length > 0) {
    viewFirstCubeBot.children[0].remove();
    viewSecondCubeBot.children[0].remove();
  };
  random(1, 6);
 
  btn.removeAttribute('disabled');
  botCost = firstCube + secondCube;
  whoMove++;
  (setTimeout(() => {
    move.textContent = "Ход Игрока 1";
    viewFirstCubeBot.innerHTML = (hubImg[firstCube]);
    viewSecondCubeBot.innerHTML = (hubImg[secondCube]);
    countMove.textContent = `Игрок 1: ${playerCost} - Игрок 2: ${botCost}`;
    profilePlayer1.style.boxShadow = "5px 5px 50px red";
    profilePlayer2.style.boxShadow = "5px 5px 50px black";
    startPlayer.removeAttribute('disabled');
    whoWinner(playerCost, botCost, false);
  },1000))
  return botCost;
}

function whoWinner(player, bot, playing) {
  if (playing) {
    if (player == bot) {
    roundWinner.textContent = `Раунд ${countRound}: Ничья`
    countRound++;
  } else {
    player > bot ? 
    roundWinner.textContent = `Раунд ${countRound}: Вы победили!` : 
    roundWinner.textContent = `Раунд ${countRound}: Вы проиграли!`;
    countRound++;
    player > bot ? editHeart(heartsBot) : editHeart(heartsPlayer);
  }
  } else {
    if (player == bot) {
    roundWinner.textContent = `Раунд ${countRound}: Ничья`
    countRound++;
  } else {
    player > bot ? 
    roundWinner.textContent = `Раунд ${countRound}: Победил Игрок 1!` : 
    roundWinner.textContent = `Раунд ${countRound}: Победил Игрок 2!`;
    countRound++;
    player > bot ? editHeart(heartsBot) : editHeart(heartsPlayer);
  }
  }
  
  
}

function editHeart(minusHeart) {
  if (minusHeart.classList[0] == 'heartsBot') {
    minusHeart.children[countBot].setAttribute('src', './src/brokenHeart.svg')
    countBot--;
    if (countBot == -1) {endGame("Игрок 2")} // временно значение жизней изменено на 1
  } else {
    minusHeart.children[countPlayer].setAttribute('src', './src/brokenHeart.svg')
    countPlayer--;
    if(countPlayer == -1) {endGame("Игрок 1")} // временно значение жизней изменено на 1
  }
}

function endGame(playerWinner) {
  winner.textContent = `Победил ${playerWinner}!!!`
  window.showEndGame.showModal();

}
  // Генерация рандома
function random(min, max) {
  firstCube = Math.floor(Math.random() * (max - min + 1)) + min;
  secondCube = Math.floor(Math.random() * (max - min + 1)) + min;
  return firstCube, secondCube;
}

function reset() {
  countBot = 2;
  countPlayer = 2;
  countRound = 1;
  for(let i = 0; i < 3; i++ ) {
    heartsBot.children[i].setAttribute('src', './src/heart.svg')
    heartsPlayer.children[i].setAttribute('src', './src/heart.svg')
  }
  countMove.textContent = "";
  roundWinner.textContent = "";
  viewFirstCube.children[0].remove();
  viewSecondCube.children[0].remove();
  viewFirstCubeBot.children[0].remove();
  viewSecondCubeBot.children[0].remove();
  playerOne.textContent = 'Игрок 1';
  playerTwo.textContent = 'Игрок 2';
  window.showEndGame.close();
}
// выбор режима игры
choiceBot.addEventListener('click', () => {
  startBot.style.display = 'block';
  board.style.display = 'grid';
  window.showChoice.close();
  playerTwo.textContent = "Бот";
  profilePlayer1.style.boxShadow = "5px 5px 50px red";
});

choicePlayer.addEventListener('click', () => {
  startPlayer.style.display = 'block';
  board.style.display = 'grid';
  window.showChoice.close();
  move.textContent = "Ход Игрока 1";
  profilePlayer1.style.boxShadow = "5px 5px 50px red";
})

// старт с ботом
startBot.addEventListener('click', () => {
  movePlayer();
  countMove.textContent = `Ваш счет: ${playerCost} - Бот: `;

  (
    setTimeout(() => {
      moveBot();  
      countMove.textContent = `Ваш счет: ${playerCost} - Бот: ${botCost}`;
    },1500)
  )
})
// старт 2 игроков
startPlayer.addEventListener('click', () => {
  
  if (whoMove % 2 == 1) {
    movePlayerOne();
    countMove.textContent = `Игрок 1: ${playerCost} - Игрок 2: `;
  } else {
    movePlayerTwo();
    
  }
  
})

// начать новую
playAgain.addEventListener('click', reset)
// выйти
noPlay.addEventListener('click', () => {
  reset();
  board.style.display = 'none';
  startBot.style.display = 'none';
  startPlayer.style.display = 'none';
  window.showChoice.show();
  
})