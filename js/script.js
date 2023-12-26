// Snake class
class Snake {
  constructor() {
    this.body = [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }];
    this.direction = 'right';
    this.oldDirection = '';
  }

  move() {
    const head = { x: this.body[0].x, y: this.body[0].y };

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
    console.log(this.body[0].x, this.body[0].y, this.checkCollisionWithItself())
    return this.body[0].x <= 19 && this.body[0].x >= 0 && this.body[0].y <= 19 && this.body[0].y >= 0 && !this.checkCollisionWithItself();
  }

  draw() {
    // Get the position of the element relative to the viewport
    const rect = $e('main')[0].getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;
    this.body.forEach((segment) => {
      const snakeElement = $mk('div', 'snake-tile');
      snakeElement.style.top = top + segment.y * 25 + 'px';
      snakeElement.style.left = left + segment.x * 25 + 'px';
      $e('main')[0].appendChild(snakeElement);
    });
  }
}



function setGame() {
  $c('overlay')[0].style.display = 'none';
  let snake = new Snake();
  snake.move();
  snake.move();
  let interval = setInterval(() => {
    if (snake.ok())
      snake.move();
    if (!snake.ok()) {
      clearInterval(interval);
      $c('overlay')[0].style.display = 'block';
      return
    }
    $e('main')[0].innerHTML = '';
    snake.draw();
  }, 200);


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

