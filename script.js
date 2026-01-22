const diceSVGs = [
    ``,
    // 1
    `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="10" fill="#333"/>
    </svg>`,
    // 2
    `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="10" fill="#333"/>
      <circle cx="75" cy="75" r="10" fill="#333"/>
    </svg>`,
    // 3
    `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="10" fill="#333"/>
      <circle cx="50" cy="50" r="10" fill="#333"/>
      <circle cx="75" cy="75" r="10" fill="#333"/>
    </svg>`,
    // 4
    `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="10" fill="#333"/>
      <circle cx="75" cy="25" r="10" fill="#333"/>
      <circle cx="25" cy="75" r="10" fill="#333"/>
      <circle cx="75" cy="75" r="10" fill="#333"/>
    </svg>`,
    // 5
    `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="10" fill="#333"/>
      <circle cx="75" cy="25" r="10" fill="#333"/>
      <circle cx="25" cy="75" r="10" fill="#333"/>
      <circle cx="75" cy="75" r="10" fill="#333"/>
      <circle cx="50" cy="50" r="10" fill="#333"/>
    </svg>`,
    // 6
    `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="10" fill="#333"/>
      <circle cx="75" cy="25" r="10" fill="#333"/>
      <circle cx="25" cy="50" r="10" fill="#333"/>
      <circle cx="75" cy="50" r="10" fill="#333"/>
      <circle cx="25" cy="75" r="10" fill="#333"/>
      <circle cx="75" cy="75" r="10" fill="#333"/>
    </svg>`
];
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
    cubes = board.querySelectorAll('.dice'),
    viewFirstCube = document.querySelector('.firstCube'),
    viewSecondCube = document.querySelector('.secondCube'),
    viewFirstCubeBot = document.querySelector('.firstCubeBot'),
    viewSecondCubeBot = document.querySelector('.secondCubeBot'),
    move = document.querySelector('#move'),
    hronic = document.querySelector('.hronicle'),
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
    whoMove = 1,
    resultPlayer = 0;
  // инициализация переменных для привязки к резульату рандома
let firstCube, secondCube, playerCost, botCost;
  


// функции ходов с ботом
function movePlayer() {
  return new Promise((resolve) => {
    viewFirstCube.classList.add('rolling');
    viewSecondCube.classList.add('rolling');
    startBot.disabled = true; // Отключаем кнопку на время броска

    // Имитация "броска" для обоих кубиков
    let rollInterval = setInterval(() => {
      random(1, 6);
      viewFirstCube.innerHTML = diceSVGs[firstCube];
      viewSecondCube.innerHTML = diceSVGs[secondCube];
    }, 100);

    let tempResult = random(1, 6, true);
    // Останавливаем анимацию и показываем финальный результат через 2 секунды
    setTimeout(() => {
      clearInterval(rollInterval); // Останавливаем быструю смену цифр
      // Убираем анимацию тряски с обоих кубиков
      viewFirstCube.classList.remove('rolling');
      viewSecondCube.classList.remove('rolling');
      // Обновляем SVG для каждого кубика
      viewFirstCube.innerHTML = diceSVGs[tempResult[0]];
      viewSecondCube.innerHTML = diceSVGs[tempResult[1]];
      btn.disabled = false; // Включаем кнопку обратно
      move.textContent = "Ход Бота";
      profilePlayer2.style.boxShadow = "5px 5px 50px red";
      profilePlayer1.style.boxShadow = "5px 5px 50px black";
      // countMove.textContent = `Ваш счет: ${tempResult[2]} - Бот: `;
      resolve(tempResult[2]);
    }, 2000);
  });
}

function moveBot(playerCost) {
  return new Promise((resolve) => {
    viewFirstCubeBot.classList.add('rolling');
    viewSecondCubeBot.classList.add('rolling');
    startBot.disabled = true; // Отключаем кнопку на время броска

    // Имитация "броска" для обоих кубиков
    let rollInterval = setInterval(() => {
      random(1, 6);
      viewFirstCubeBot.innerHTML = diceSVGs[firstCube];
      viewSecondCubeBot.innerHTML = diceSVGs[secondCube];
    }, 100);

    let tempResult = random(1, 6, true);
    // Останавливаем анимацию и показываем финальный результат через 2 секунды
    setTimeout(() => {
      clearInterval(rollInterval); // Останавливаем быструю смену цифр
      // Убираем анимацию тряски с обоих кубиков
      viewFirstCubeBot.classList.remove('rolling');
      viewSecondCubeBot.classList.remove('rolling');
      // Обновляем SVG для каждого кубика
      viewFirstCubeBot.innerHTML = diceSVGs[tempResult[0]];
      viewSecondCubeBot.innerHTML = diceSVGs[tempResult[1]];
      btn.disabled = false; // Включаем кнопку обратно
      move.textContent = "Ваш ход";
      profilePlayer1.style.boxShadow = "5px 5px 50px red";
      profilePlayer2.style.boxShadow = "5px 5px 50px black";
      botCost = tempResult[2];
      hronic.innerHTML += `<p>Раунд ${countRound}: Ваш счет: ${playerCost} - Бот: ${botCost}</p>`;
      whoWinner(playerCost, botCost, true);
      resolve();
    }, 2000);
  });
}
// Функции ходов с человеком
function movePlayerOne() {
  viewFirstCube.classList.add('rolling');
  viewSecondCube.classList.add('rolling');
  startBot.disabled = true; // Отключаем кнопку на время броска

    // Имитация "броска" для обоих кубиков
  let rollInterval = setInterval(() => {
    random(1, 6);
    viewFirstCube.innerHTML = diceSVGs[firstCube];
    viewSecondCube.innerHTML = diceSVGs[secondCube];
  }, 100);

  let tempResult = random(1, 6, true);
    // Останавливаем анимацию и показываем финальный результат через 2 секунды
  setTimeout(() => {
    clearInterval(rollInterval); // Останавливаем быструю смену цифр
      // Убираем анимацию тряски с обоих кубиков
    viewFirstCube.classList.remove('rolling');
    viewSecondCube.classList.remove('rolling');
      // Обновляем SVG для каждого кубика
    viewFirstCube.innerHTML = diceSVGs[tempResult[0]];
    viewSecondCube.innerHTML = diceSVGs[tempResult[1]];
    btn.disabled = false; // Включаем кнопку обратно
    move.textContent = "Ход Игрока 2";
    profilePlayer2.style.boxShadow = "5px 5px 50px red";
    profilePlayer1.style.boxShadow = "5px 5px 50px black";
    }, 2000);
  whoMove++;
  return tempResult[2];
}
function movePlayerTwo(costPlayerOne) {
  viewFirstCubeBot.classList.add('rolling');
  viewSecondCubeBot.classList.add('rolling');
  startPlayer.disabled = true; // Отключаем кнопку на время броска

    // Имитация "броска" для обоих кубиков
  let rollInterval = setInterval(() => {
    random(1, 6);
    viewFirstCubeBot.innerHTML = diceSVGs[firstCube];
    viewSecondCubeBot.innerHTML = diceSVGs[secondCube];
  }, 100);

  let tempResult = random(1, 6, true);
    // Останавливаем анимацию и показываем финальный результат через 2 секунды
  setTimeout(() => {
    clearInterval(rollInterval); // Останавливаем быструю смену цифр
      // Убираем анимацию тряски с обоих кубиков
    viewFirstCubeBot.classList.remove('rolling');
    viewSecondCubeBot.classList.remove('rolling');
      // Обновляем SVG для каждого кубика
    viewFirstCubeBot.innerHTML = diceSVGs[tempResult[0]];
    viewSecondCubeBot.innerHTML = diceSVGs[tempResult[1]];
    startPlayer.disabled = false; // Включаем кнопку обратно
    move.textContent = "Ход Игрока 1";
    profilePlayer1.style.boxShadow = "5px 5px 50px red";
    profilePlayer2.style.boxShadow = "5px 5px 50px black";
    hronic.innerHTML += `<p>Раунд ${countRound}: Счет игрока 1: ${costPlayerOne} - Счет игрока 2: ${tempResult[2]}</p>`;
    whoMove++;
    whoWinner(resultPlayer, tempResult[2], false);
  }, 2000);  
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
function random(min, max, result) {
  firstCube = Math.floor(Math.random() * (max - min + 1)) + min;
  secondCube = Math.floor(Math.random() * (max - min + 1)) + min;
  if (result) {
    return [firstCube, secondCube, firstCube + secondCube];
  } else {
    return firstCube, secondCube;
  }
  
}

function reset() {
  countBot = 2;
  countPlayer = 2;
  countRound = 1;
  resultPlayer = 0,
  whoMove = 1;
  roundWinner.textContent = "";
  for(let i = 0; i <= 2; i++) {
    heartsBot.children[i].setAttribute('src', './src/heart.svg')
    heartsPlayer.children[i].setAttribute('src', './src/heart.svg')
  }
  hronic.innerHTML = ``;
  window.showEndGame.close();
}

function rollDice(whoseCube, whoseCube2, btn) {
    // Добавляем класс для анимации обоим кубикам
    
    return tempResult;
}

function renderPrevCubes() {
  cubes.forEach((cube) => {
    cube.innerHTML = diceSVGs[random(1, 6)];
  })
}

// Обрабочтики событий
// выбор режима игры
choiceBot.addEventListener('click', () => {
  startBot.style.display = 'block';
  board.style.display = 'grid';
  renderPrevCubes();
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
  renderPrevCubes();
})

// старт с ботом
startBot.addEventListener('click', async () => {
  const playerSum = await movePlayer();
  
  await moveBot(playerSum);
})
// старт 2 игроков
startPlayer.addEventListener('click', () => {
  if (whoMove % 2 == 1) {
    resultPlayer = movePlayerOne();
    console.log(resultPlayer)
  } else {
    movePlayerTwo(resultPlayer);
  }
  
})

// начать новую
playAgain.addEventListener('click',() => {
  reset();
  renderPrevCubes();
})
// выйти
noPlay.addEventListener('click', () => {
  reset();
  renderPrevCubes();
  board.style.display = 'none';
  startBot.style.display = 'none';
  startPlayer.style.display = 'none';
  window.showChoice.show();
})


