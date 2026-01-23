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

let board = document.querySelector('.board'),
    cubes = board.querySelectorAll('.dice'),
    // кубики
    viewFirstCube = document.querySelector('.firstCube'),
    viewSecondCube = document.querySelector('.secondCube'),
    viewFirstCubeBot = document.querySelector('.firstCubeBot'),
    viewSecondCubeBot = document.querySelector('.secondCubeBot'),
    move = document.querySelector('#move'),
    // логи раундов
    hronic = document.querySelector('.hronicle'),
    //  сердца игроков
    heartsPlayer = document.querySelector('.heartsPlayer'),
    heartsBot = document.querySelector('.heartsBot'),
    // отображение победителя
    winner = document.querySelector('#winner'),
    // кнопки рестарта
    playAgain = document.querySelector('#yes'),
    noPlay = document.querySelector('#no'),
    // кнопки броска кубиков
    startBot = document.querySelector('#startBot'),
    startPlayer = document.querySelector('#startPlayer'),
    // кнопки выбора режима игры
    choiceBot = document.querySelector('#choiceBot'),
    choicePlayer = document.querySelector('#choicePlayer'),
    // div игроков
    profilePlayer1 = document.querySelector('.player'),
    profilePlayer2 = document.querySelector('.computer'),
    // счетчики
    countPlayer = 2,
    countBot = 2,
    countRound = 1,
    whoMove = 1,
    resultPlayer = 0,
    audio = new Audio('./src/dice-roll-sound-2.mp3');
  // инициализация переменных для привязки к резульату рандома
let firstCube, secondCube, botCost;
  
audio.loop = true;

// функции ходов с ботом
function movePlayer() {
  return new Promise((resolve) => {
    addClass(true, viewFirstCube, viewSecondCube, startBot);
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
      // Обновляем SVG для каждого кубика
      viewFirstCube.innerHTML = diceSVGs[tempResult[0]];
      viewSecondCube.innerHTML = diceSVGs[tempResult[1]];
      move.textContent = "Ход Бота";
      renderTurn(true);
      addClass(false, viewFirstCube, viewSecondCube, startBot);
      resolve(tempResult[2]);
    }, 1800);
  });
}
function moveBot(playerCost) {
  return new Promise((resolve) => {
    addClass(true, viewFirstCubeBot, viewSecondCubeBot, startBot)
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
      // Обновляем SVG для каждого кубика
      viewFirstCubeBot.innerHTML = diceSVGs[tempResult[0]];
      viewSecondCubeBot.innerHTML = diceSVGs[tempResult[1]];
      addClass(false, viewFirstCubeBot, viewSecondCubeBot, startBot);
      renderTurn(false);
      move.textContent = "Ваш ход";
      botCost = tempResult[2];
      hronic.innerHTML += `<p>Раунд ${countRound}: Ваш счет: ${playerCost} - Бот: ${botCost}</p>`;
      whoWinner(playerCost, botCost, true);
      resolve();
    }, 1800);
  });
}
// Функции ходов с человеком
function movePlayerOne() {
  addClass(true, viewFirstCube, viewSecondCube, startPlayer);

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
    addClass(false, viewFirstCube, viewSecondCube, startPlayer);
      // Обновляем SVG для каждого кубика
    viewFirstCube.innerHTML = diceSVGs[tempResult[0]];
    viewSecondCube.innerHTML = diceSVGs[tempResult[1]];
    move.textContent = "Ход Игрока 2";
    profilePlayer2.style.boxShadow = "5px 5px 50px red";
    profilePlayer1.style.boxShadow = "5px 5px 50px black";
    profilePlayer2.style.transform = 'scale(1.05)';
    profilePlayer1.style.transform = 'scale(0.95)';
    }, 1800);
  whoMove++;
  return tempResult[2];
}
function movePlayerTwo(costPlayerOne) {
  addClass(true, viewFirstCubeBot, viewSecondCubeBot, startPlayer)

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
    addClass(false, viewFirstCubeBot, viewSecondCubeBot, startPlayer);
      // Обновляем SVG для каждого кубика
    viewFirstCubeBot.innerHTML = diceSVGs[tempResult[0]];
    viewSecondCubeBot.innerHTML = diceSVGs[tempResult[1]];
    move.textContent = "Ход Игрока 1";
    profilePlayer1.style.boxShadow = "5px 5px 50px red";
    profilePlayer2.style.boxShadow = "5px 5px 50px black";
    hronic.innerHTML += `<p>Раунд ${countRound}: Счет игрока 1: ${costPlayerOne} - Счет игрока 2: ${tempResult[2]}</p>`;
    profilePlayer1.style.transform = 'scale(1.05)';
    profilePlayer2.style.transform = 'scale(0.95)';
    whoMove++;
    whoWinner(resultPlayer, tempResult[2], false);
  }, 1800);  
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
function addClass(on, cubeOne, cubeTwo, btn) {
  if(on) {
    cubeOne.classList.add('rolling');
    cubeTwo.classList.add('rolling');
    btn.disabled = on;
    audio.play();
  } else {
    cubeOne.classList.remove('rolling');
    cubeTwo.classList.remove('rolling');
    console.log(on);
    btn.disabled = on;
    audio.pause();
  }
}
function renderTurn(firstPlayer) {
  if (firstPlayer) {
    profilePlayer2.style.boxShadow = "5px 5px 50px red";
    profilePlayer1.style.boxShadow = "5px 5px 50px black";
    profilePlayer2.style.transform = 'scale(1.05)';
    profilePlayer1.style.transform = 'scale(0.95)';
  } else {
    profilePlayer1.style.boxShadow = "5px 5px 50px red";
    profilePlayer2.style.boxShadow = "5px 5px 50px black";
    profilePlayer1.style.transform = 'scale(1.05)';
    profilePlayer2.style.transform = 'scale(0.95)';
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

function renderPrevCubes() {
  cubes.forEach((cube) => {
    cube.innerHTML = diceSVGs[random(1, 6)];
  })
}

// Обработчики событий
// выбор режима игры
choiceBot.addEventListener('click', () => {
  startBot.style.display = 'block';
  board.style.display = 'grid';
  renderPrevCubes();
  window.showChoice.close();
  renderTurn(false);
});

choicePlayer.addEventListener('click', () => {
  startPlayer.style.display = 'block';
  board.style.display = 'grid';
  window.showChoice.close();
  move.textContent = "Ход Игрока 1";
  renderPrevCubes();
  renderTurn(false);
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


