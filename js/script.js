// Snake class
class Snake {
  constructor() {
    this.body = [{ x: 0, y: 0, direction: "right" }, { x: 1, y: 0, direction: "right" }, { x: 2, y: 0, direction: "right" }];
    this.direction = 'right';
    this.oldDirection = '';
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
    const head = { x: this.body[0].x, y: this.body[0].y, direction: this.direction };
    let bend = false;
    if (this.body.length > 1) {
      if (head.direction !== this.body[0].direction) {
        head.bend = head.direction + "_" + this.body[0].direction;
      }
    }
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
    this.oldDirection = this.direction;
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

    this.body.forEach((segment, index) => {
      const snakeElement = $mk('div', 'snake-tile');
      snakeElement.style.top = top + segment.y * 25 + 'px';
      snakeElement.style.left = left + segment.x * 25 + 'px';

      // Determine which image to use based on the snake segment
      let currentImage;
      if (index === 0) {
        currentImage = headImage;
      } else if (index === this.body.length - 1) {
        currentImage = tailImage;
      } else {
        currentImage = bodyImage;
        if (segment.bend) {
          currentImage.src = `img/${segment.bend}.png`;
        }
      }
      if (!segment.bend) {
        // Rotate the snake segment based on segment.direction
        if (segment.direction === 'up') {
          currentImage.style.transform = 'rotate(0deg)';
        } else if (segment.direction === 'right') {
          currentImage.style.transform = 'rotate(90deg)';
        } else if (segment.direction === 'down') {
          currentImage.style.transform = 'rotate(180deg)';
        } else if (segment.direction === 'left') {
          currentImage.style.transform = 'rotate(-90deg)';
        }
      }


      snakeElement.appendChild(currentImage.cloneNode(true));
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

function setGame() {
  let apple = new Apple();
  apple.draw();
  counter.value = -1;
  counter.increment();
  function intervalHandler() {

    snake.move();
    if (snake.ok()) {
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

