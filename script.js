// привязка чисел к переменным
const hubImg = {
    1: `<img src="./src/first.png" />`,
    2: `<img src="./src/second.png" />`,
    3: `<img src="./src/third.png" />`,
    4: `<img src="./src/fourth.png" />`,
    5: `<img src="./src/fifth.png" />`,
    6: `<img src="./src/sixth.png" />`,
  };
  // привязка переменных к классу
let viewFirstCube = document.querySelector('.firstCube'),
    viewSecondCube = document.querySelector('.secondCube'),
    viewFirstCubeBot = document.querySelector('.firstCubeBot'),
    viewSecondCubeBot = document.querySelector('.secondCubeBot'),
    move = document.querySelector('#move'),
    countMove = document.querySelector('#countMove'),
    heartsPlayer = document.querySelector('.heartsPlayer'),
    heartsBot = document.querySelector('.heartsBot'),
    btn = document.querySelector('button'),
    winner = document.querySelector('#winner'),
    playAgain = document.querySelector('#yes'),
    noPlay = document.querySelector('#no'),
    countPlayer = 0,
    countBot = 0,
    countRound = 1
  // инициализация переменных для привязки к резульату рандома
let firstCube, secondCube, playerCost, botCost;
  

  // запуск
function start() {
  movePlayer();
  countMove.textContent = `Ваш счет: ${playerCost} - Бот: `;

  (setTimeout(() => {
    moveBot();
    countMove.textContent = `Ваш счет: ${playerCost} - Бот: ${botCost}`;
    whoWinner(playerCost, botCost);
    btn.removeAttribute('disabled');
  
    window.showWinner.showModal();
    (setTimeout(() => {
      window.showWinner.close();
    }, 1100));
  }, 1800))

}

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
  move.textContent = "Ход опоннента";
  return playerCost;
}

function moveBot() {
  if (viewFirstCubeBot.children.length > 0 && viewSecondCubeBot.children.length > 0) {
    viewFirstCubeBot.children[0].remove();
    viewSecondCubeBot.children[0].remove();
  };
  random(1, 6);
  botCost = firstCube + secondCube;
  viewFirstCubeBot.innerHTML = (hubImg[firstCube]);
  viewSecondCubeBot.innerHTML = (hubImg[secondCube]);
  return botCost;
}

function whoWinner(player, bot) {
  if (player == bot) {
    winner.textContent = `Раунд ${countRound}: Ничья`;
    countRound++;
  } else {
    player > bot ? 
    winner.textContent = `Раунд ${countRound}: Вы победили!` : 
    winner.textContent = `Раунд ${countRound}: Вы проиграли!`;
    countRound++;
    player > bot ? editHeart(heartsBot) : editHeart(heartsPlayer);
  }
  move.textContent = "Ваш ход";
}

function editHeart(minusHeart) {
  if (minusHeart.classList[0] == 'heartsBot') {
    minusHeart.children[countBot].setAttribute('src', './src/brokenHeart.svg')
    countBot++;
    if (countBot == 3) {endGame()}
  } else {
    minusHeart.children[countPlayer].setAttribute('src', './src/brokenHeart.svg')
    countPlayer++;
    if(countPlayer == 3) {endGame()}
  }
}

function endGame() {
  window.showEndGame.showModal();
}
  // Генерация рандома
function random(min, max) {
  firstCube = Math.floor(Math.random() * (max - min + 1)) + min;
  secondCube = Math.floor(Math.random() * (max - min + 1)) + min;
  return firstCube, secondCube;
}


playAgain.addEventListener('click', () => {
  countBot = 0;
  countPlayer = 0;
  countRound = 1;
  for(let i = 0; i < 3; i++ ) {
    heartsBot.children[i].setAttribute('src', '/src/heart.svg')
    heartsPlayer.children[i].setAttribute('src', '/src/heart.svg')
  }
  countMove.textContent = "Результат хода";
  viewFirstCube.children[0].remove();
  viewSecondCube.children[0].remove();
  viewFirstCubeBot.children[0].remove();
  viewSecondCubeBot.children[0].remove();
  window.showEndGame.close();
})