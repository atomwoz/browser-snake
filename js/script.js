// Snake class
class Snake {
  constructor() {
    this.body = [{ x: 0, y: 0 }, {x:1,y:0}, {x:2,y:0}];
    this.direction = 'right';
  }

  move() {
    const head = {x: this.body[0].x, y: this.body[0].y};

    switch (this.direction) {
      case 'up':
        head.y--;
        break;
      case 'down':
        head.y++;
        break;
      case 'left':
        head.x--;
        break;
      case 'right':
        head.x++;
        break;
    }
    this.body.pop()
    this.body.unshift(head)
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




  draw() {
  // Get the position of the element relative to the viewport
  const rect = $e('main')[0].getBoundingClientRect();
  const left = rect.left;
  const top = rect.top;
    this.body.forEach((segment) => {
      const snakeElement = $mk('div', 'snake-tile');
      snakeElement.style.top = top + 250 + segment.y * 25 + 'px';
      snakeElement.style.left = left + 250 + segment.x * 25 + 'px';
      $e('main')[0].appendChild(snakeElement);
    });
  }
}



function setGame()
{
  let snake = new Snake();
  setInterval(() => {
    snake.move();
    $e('main')[0].innerHTML = '';
    console.table(snake.body);
    snake.draw();
  } , 200);

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

