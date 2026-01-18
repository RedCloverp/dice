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
    btn = document.querySelector('button')
  // инициализация переменных для привязки к резульату рандома
let firstCube, secondCube, playerCost, botCost;
  

  // запуск
function start() {
  btn.setAttribute('disabled', 'disabled');
  movePlayer();
  move.textContent = "Ход опоннента";
  countMove.textContent = `Ваш счет: ${playerCost} - Бот: `;
  (setTimeout(() => {
    moveBot();
    countMove.textContent = `Ваш счет: ${playerCost} - Бот: ${botCost}`;
    winner();
     btn.removeAttribute('disabled');
     move.textContent = "Ваш ход";
  }, 3000))

  
}

function movePlayer() {
  if (viewFirstCube.children.length > 0 && viewSecondCube.children.length > 0) {
    viewFirstCube.children[0].remove();
    viewSecondCube.children[0].remove();
  };
  random(1, 6);
  viewFirstCube.innerHTML = (hubImg[firstCube]);
  viewSecondCube.innerHTML = (hubImg[secondCube]);
  playerCost = firstCube + secondCube;
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

function winner(player, bot) {
  
}
  // Генерация рандома
function random(min, max) {
  firstCube = Math.floor(Math.random() * (max - min + 1)) + min;
  secondCube = Math.floor(Math.random() * (max - min + 1)) + min;
  return firstCube, secondCube;
}


