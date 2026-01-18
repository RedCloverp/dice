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
    move = document.querySelector('#move'),
    countMove = document.querySelector('#countMove'),
    heartsPlayer = document.querySelector('.heartsPlayer'),
    heartsBot = document.querySelector('.heartsBot'),
    btn = document.querySelector('button')
  // инициализация переменных для привязки к резульату рандома
let firstCube, secondCube;
  

  // запуск
function start() {
  btn.setAttribute('disabled', 'disabled')
    // проверка и удаление img
  if (viewFirstCube.children.length > 0 && viewSecondCube.children.length > 0) {
    viewFirstCube.children[0].remove();
    viewSecondCube.children[0].remove();
  };
  //запуск генерации рандома
  random(1, 6);
  //вывод кубиков
  viewFirstCube.innerHTML = (hubImg[firstCube]);
  viewSecondCube.innerHTML = (hubImg[secondCube]);



  
  (setTimeout(() => {
    btn.removeAttribute('disabled')
  },3500))
}
  // Генерация рандома
function random(min, max) {
  firstCube = Math.floor(Math.random() * (max - min + 1)) + min;
  secondCube = Math.floor(Math.random() * (max - min + 1)) + min;
  return firstCube, secondCube;
}


