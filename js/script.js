// Snake class
class Snake {
  constructor() {
    this.body = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];
    this.direction = 'right';
    this.oldDirection = '';
  }

  move() {
    const head = { x: this.body[0].x, y: this.body[0].y };
    this.oldDirection = this.direction;
    switch (this.direction) {
      case 'up':
        if (this.oldDirection !== 'down') {
          head.y--;
        } else {
          head.y++;
          this.direction = 'down';
        }
        break;
      case 'down':
        if (this.oldDirection !== 'up') {
          head.y++;
        } else {
          head.y--;
          this.direction = 'up';
        }
        break;
      case 'left':
        if (this.oldDirection !== 'right') {
          head.x--;
        }
        else {
          head.x++;
          this.direction = 'right';
        }
        break;
      case 'right':
        if (this.oldDirection !== 'left') {
          head.x++;
        }
        else {
          head.x--;
          this.direction = 'left';
        }
        break;
    }
    this.body.pop();
    this.body.unshift(head);
  }

  checkAgainstApple(apple) {
    if (this.body[0].x === apple.x && this.body[0].y === apple.y) {
      this.body.unshift({ x: apple.x, y: apple.y });
      return true;
    }
    return false;
  }

  changeDirection(newDirection) {
    this.direction = newDirection;
  }

  checkCollisionWithItself() {
    for (let i = 1; i < this.body.length; i++) {
      if (this.body[0].x === this.body[i].x && this.body[0].y === this.body[i].y) {
        return true;
      }
    }
    return false;
  }

  ok() {
    return this.body[0].x <= 19 && this.body[0].x >= 0 && this.body[0].y <= 19 && this.body[0].y >= 0 && !this.checkCollisionWithItself();
  }

  draw() {
    // Get the position of the element relative to the viewport
    const rect = $e('main')[0].getBoundingClientRect();
    const left = rect.left + 30;
    const top = rect.top + 30;
    $e('main')[0].innerHTML = '';
    this.body.forEach((segment) => {
      const snakeElement = $mk('div', 'snake-tile');
      snakeElement.style.top = top + segment.y * 25 + 'px';
      snakeElement.style.left = left + segment.x * 25 + 'px';
      $e('main')[0].appendChild(snakeElement);
    });
  }
}

class Apple {
  constructor() {
    this.x = $random(0, 19);
    this.y = $random(0, 19);
    this.apple = undefined
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

function setGame() {
  let apple = new Apple();
  apple.draw();
  counter.value = 0;
  function intervalHandler() {

    snake.move();
    if (snake.ok()) {
      console.log(JSON.stringify(snake.body[0]) + ' ' + JSON.stringify(apple))
      if (snake.checkAgainstApple(apple)) {
        counter.increment();
        apple = new Apple();
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

  let interval
  function mkInterval(time) {
    if (interval)
      clearInterval(interval);
    intervalHandler()
    interval = setInterval(intervalHandler, time);
  }

  $c('overlay')[0].style.display = 'none';
  let snake = new Snake();
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

