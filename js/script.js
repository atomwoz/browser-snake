// Snake class
class Snake {
  constructor() {
    this.body = [{ x: 0, y: 0, direction: "right", realDirection:"right"}, { x: 1, y: 0, direction: "right", realDirection: "right" }, { x: 2, y: 0, direction: "right", realDirection: "right" }, { x: 3, y: 0, direction: "right", realDirection: "right", invisible: true }];
    this.direction = 'right';
    this.oldDirection = '';
    this.realDirection = this.direction;
  }

  directionToNumber(direction) {
    switch (direction) {
      case 'up':
        return 0;
      case 'right':
        return 90;
      case 'down':
        return 180;
      case 'left':
        return -90;
    }
  }

  move() {
    const head = { x: this.body[0].x, y: this.body[0].y, direction: this.direction, invisible: this.body[0].invisible };
    switch (this.direction) {
      case 'up':
        if (this.realDirection !== 'down') {
          head.y--;
        } else {
          head.y++;
          this.direction = 'down';
        }
        break;
      case 'down':
        if (this.realDirection !== 'up') {
          head.y++;
        } else {
          head.y--;
          this.direction = 'up';
        }
        break;
      case 'left':
        if (this.realDirection !== 'right') {
          head.x--;
        }
        else {
          head.x++;
          this.direction = 'right';
        }
        break;
      case 'right':
        if (this.realDirection !== 'left') {
          head.x++;
        }
        else {
          head.x--;
          this.direction = 'left';
        }
        break;
    }
    head["realDirection"] = this.direction
    if (this.body[this.body.length - 1].invisible) {
      this.body.pop();
    }
    else {
      this.body[this.body.length - 1].invisible = undefined;
    }
    this.body.unshift(head);
    this.body[this.body.length - 1].invisible = true;
    this.realDirection = this.direction;
  }

  intervalTime(x)
  {
    return 800*(2/(x+6))
  }

  checkAgainstApple(apple) {
    if (this.body[0].x === apple.x && this.body[0].y === apple.y) {
      this.body[this.body.length - 1].invisible = undefined;
      mkInterval(this.intervalTime(counter.value));
      return true;
    }
    return false;
  }

  changeDirection(newDirection) {
    this.oldDirection = this.direction;
    this.direction = newDirection;

  }

  checkCollisionWithItself() {
    for (let i = 1; i < this.body.length; i++) {
      if (this.body[0].x === this.body[i].x && this.body[0].y === this.body[i].y && !this.body[i].invisible) {
        return true;
      }
    }
    return false;
  }

  ok() {
    return this.body[0].x <= 19 && this.body[0].x >= 0 && this.body[0].y <= 19 && this.body[0].y >= 0 && !this.checkCollisionWithItself();
  }

  draw() {
    const rect = $e('main')[0].getBoundingClientRect();
    const left = rect.left + 30;
    const top = rect.top + 30;
    $e('main')[0].innerHTML = '';

    const headImage = $mk('img', 'snake-head');
    headImage.src = 'img/head.png';

    const bodyImage = $mk('img', 'snake-body');
    bodyImage.src = 'img/mid.png';

    const tailImage = $mk('img', 'snake-tail');
    tailImage.src = 'img/tail.png';

    const ltImage = $mk('img', 'snake-bend');
    ltImage.src = 'img/lt.png';

    this.body.forEach((segment, i) => {
      if (segment.invisible)
        return;
      const snakeElement = $mk('div', 'snake-tile');
      snakeElement.style.top = top + segment.y * 25 + 'px';
      snakeElement.style.left = left + segment.x * 25 + 'px';

      // Determine which image to use based on the snake segment
      let currentImage;
      if (i === 0) {
        currentImage = headImage;
      } else if (i === this.body.length - 2) {
        currentImage = tailImage;
      } else {
        currentImage = bodyImage;
      }
      if (!segment.bend) {
        // Rotate the snake segment based on segment.direction
        if (segment.realDirection === 'up') {
          currentImage.style.transform = 'rotate(0deg)';
        } else if (segment.realDirection === 'right') {
          currentImage.style.transform = 'rotate(90deg)';
        } else if (segment.realDirection === 'down') {
          currentImage.style.transform = 'rotate(180deg)';
        } else if (segment.realDirection === 'left') {
          currentImage.style.transform = 'rotate(-90deg)';
        }
      }
      if(this.body[i-1] != undefined && this.body[i] != undefined && this.body[i-1].realDirection != this.body[i].realDirection)
      {
        currentImage = ltImage;
        console.log(this.body[i-1].realDirection+""+this.body[i].realDirection)
        switch (this.body[i-1].realDirection+""+this.body[i].realDirection) {
          case "downright":
            currentImage.style.transform = 'rotate(0deg)';
            break;
          case "rightdown":
            currentImage.style.transform = 'rotate(180deg)';
            break;
          case "leftdown":
            currentImage.style.transform = 'rotate(90deg)';
            break;
          case "downleft":
            currentImage.style.transform = 'rotate(-90deg)';
            break;
          case "upright":
            currentImage.style.transform = 'rotate(90deg)';
            break;
          case "upleft":
            currentImage.style.transform = 'rotate(180deg)';
            break;
          case "rightup":
            currentImage.style.transform = 'rotate(-90deg)';
            break;
          case "leftup":
            currentImage.style.transform = 'rotate(0deg)';
            break;
          default:
           currentImage.style.transform = 'scaleX(0.3) rotate(120deg)';
            break;
        }
      }


      snakeElement.appendChild(currentImage.cloneNode(true));
      $e('main')[0].appendChild(snakeElement);

    });
  }
}

class Apple {
  constructor(snake) {
    let flag = false;
    do
    {
      this.x = $random(0, 19);
      this.y = $random(0, 19);
      this.apple = undefined
      flag = false
      snake.body.forEach(segment => {
        if(segment.x == this.x && segment.y == this.y)
          flag = true
          return
      })
    }
    while(flag)
  }

  draw() {
    if (this.apple) {
      this.apple.remove();
    }
    const rect = $e('main')[0].getBoundingClientRect();
    const left = rect.left + 30;
    const top = rect.top + 30;
    this.apple = $mk('div', 'snake-tile');
    this.apple.style.top = top + this.y * 25 + 'px';
    this.apple.style.left = left + this.x * 25 + 'px';

    const appleImage = $mk('img', 'apple-image');
    appleImage.src = 'img/apple.png';
    this.apple.appendChild(appleImage);

    $e('main')[0].appendChild(this.apple);
  }
}

const counter = {
  target: undefined,
  value: 0,
  increment: function () {
    this.value++;
    this.target.innerText = this.value;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  counter.target = $e('h1')[0];
})
let interval, intervalHandler
function mkInterval(time) {
  if (interval)
    clearInterval(interval);
  interval = setInterval(intervalHandler, time);
}

function setGame() {
  let apple
  counter.value = -1;
  counter.increment();
  let snake = new Snake();
  intervalHandler = function () {

    snake.move();
    if (snake.ok()) {
      if (snake.checkAgainstApple(apple)) {
        counter.increment();
        apple = new Apple(snake);
        apple.draw();
      }
    }
    else {
      clearInterval(interval);
      $c('overlay')[0].style.display = 'block';
      return
    }
    snake.draw();
    apple.draw();
  }

  $c('overlay')[0].style.display = 'none';
  
  apple = new Apple(snake);
  snake.move();
  snake.move();
  mkInterval(400);

  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        snake.changeDirection('up');
        break;
      case 'ArrowDown':
        snake.changeDirection('down');
        break;
      case 'ArrowLeft':
        snake.changeDirection('left');
        break;
      case 'ArrowRight':
        snake.changeDirection('right');
        break;
    }
  });

}

