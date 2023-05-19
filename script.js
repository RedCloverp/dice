// привязка чисел к переменным
let hubImg = {
    1: `<img src="./src/first.png"></img>`,
    2: `<img src="./src/second.png"></img>`,
    3: `<img src="./src/third.png"></img>`,
    4: `<img src="./src/fourth.png"></img>`,
    5: `<img src="./src/fifth.png"></img>`,
    6: `<img src="./src/sixth.png"></img>`,
  };
  // привязка переменных к классу
  let viewFirstCube = document.querySelector('.firstCube');
  let viewSecondCube = document.querySelector('.secondCube');
  // инициализация переменных для привязки к резульату рандома
  let firstCube, secondCube;
  
  // запуск
  function start() {
    // проверка и удаление img(Не доделано)
    if (viewFirstCube.children.length > 0 && viewSecondCube.children.length > 0) {
      viewFirstCube.children[0].remove();
      viewSecondCube.children[0].remove();
    };
    //запуск генерации рандома
    random(1, 6);
    //вывод первого кубика
    viewFirstCube.innerHTML = (hubImg[firstCube]);
    //вывод второго кубика
    viewSecondCube.innerHTML = (hubImg[secondCube])
  }
  // Генерация рандома
  function random(min, max) {
    firstCube = Math.floor(Math.random() * (max - min + 1)) + min;
    secondCube = Math.floor(Math.random() * (max - min + 1)) + min;
    return firstCube, secondCube;
  }