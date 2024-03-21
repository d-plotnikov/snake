class gameBoard{
    constructor(options) {
        this.game = document.querySelector(options.gameSelector);
        this.score = document.querySelector(options.scoreSelector);
        this.btn = document.querySelector(options.btnSelector);
        this.cells = 400;
        this.x = 1;
        this.y = 20;
        this.cScore = 2;
        this.direction = 'left';
        this._renderBoard();
    }
    _renderBoard() {
     
        let board = document.createElement('div');
        this.game.appendChild(board);
        board.classList.add('game__board');
        for(let i = 0; i < this.cells; i++){
          let cell = document.createElement('div');
          board.appendChild(cell);
          cell.classList.add('game__cell');
          if(this.x > 20) {
            this.x = 1;
            this.y--
          };
          cell.setAttribute('pos-x', this.x);
          cell.setAttribute('pos-y', this.y);
          this.x++;
      }
    }
}

class Eat extends gameBoard{
    constructor(options) {
        super(options)
        this.coordFood = this._generateEatCoord();
        this.cell = document.querySelectorAll('.game__cell');
        this._renderEat();

    }  
    _generateEatCoord() {
        let posX = Math.round(Math.random() * (20 - 1) + 1);
        let posY = Math.round(Math.random() * (20 - 1) + 1);
        return [posX, posY];

        }
    _renderEat() {
        
        for(let i = 0; i < this.cells; i++){
            if(this.coordFood[0] == this.cell[i].getAttribute('pos-x') && this.coordFood[1] == this.cell[i].getAttribute('pos-y')) {
                this.cell[i].classList.add('yellow')
            }
        }
    }
}

class Snake extends Eat{
    constructor(options, coordFood) {
        super(options, coordFood)
        this.coord = this._generateSnakeCoord();
        this.snake = [];
        this.cScore = 2;
        this.direction = 'left';
        this.animationSpeed = 300;
        this.animationId = null;
        this._renderSnake();
        this._controls();
        this._animation(false);
    }
    _generateSnakeCoord() {
        let posX = Math.round(Math.random() * (20 - 1) + 1);
        let posY = Math.round(Math.random() * (20 - 1) + 1);
        
        let coordSnake = [posX, posY];
        
        if (this.coordFood.toString() != coordSnake.toString()) {
        return [posX, posY];
        } else {
        let posX = Math.round(Math.random() * (20 - 1) + 1);
        let posY = Math.round(Math.random() * (20 - 1) + 1);
        return [posX, posY];
        }
        
    }
    _renderSnake() {
        for(let i = 0; i < this.cells; i++){
            if(this.coord[0] == this.cell[i].getAttribute('pos-x') && this.coord[1] == this.cell[i].getAttribute('pos-y')) {
                this.cell[i].classList.add('red')
                this.snake.push(this.cell[i])
            }
        
            if(this.coord[0]+1 == this.cell[i].getAttribute('pos-x') && this.coord[1] == this.cell[i].getAttribute('pos-y') || this.coord[0]+2 == this.cell[i].getAttribute('pos-x') && this.coord[1] == this.cell[i].getAttribute('pos-y')) {
                this.cell[i].classList.add('blue')
                this.snake.push(this.cell[i])
            }
        }
    }
    _animation(status){

        if (!status) {
        this.animationId = setInterval(this._move, this.animationSpeed, this)
        
        } else {

        clearInterval(this.animationId)
        this.animationId = 0;

        } 
    }
    _move(th){

        let snakeCoord = [Number(th.snake[0].getAttribute('pos-x')), Number(th.snake[0].getAttribute('pos-y'))]

        th.snake[0].classList.remove('red')

        th.snake[th.snake.length-1].classList.remove('blue')



        th.snake.pop()

        let cells = document.querySelectorAll('.game__cell');

        if(th.direction == 'left') {
        if(snakeCoord[0] > 1) {

            cells.forEach((cell, idx) => {
            if(snakeCoord[0]-1 == cell.getAttribute('pos-x') && snakeCoord[1] == cell.getAttribute('pos-y')){
                th.snake.unshift(cell)
                cell.classList.add('red')
            }
            })

        } else {

            cells.forEach((cell, idx) => {
            if(20 == cell.getAttribute('pos-x') && snakeCoord[1] == cell.getAttribute('pos-y')){
                th.snake.unshift(cell)
                cell.classList.add('red')
            }
            })

        }

        } else if(th.direction == 'right'){
        if(snakeCoord[0] < 20) {

            cells.forEach((cell, idx) => {
            if(snakeCoord[0]+1 == cell.getAttribute('pos-x') && snakeCoord[1] == cell.getAttribute('pos-y')){
                th.snake.unshift(cell)
                cell.classList.add('red')
            }
            })

        } else {

            cells.forEach((cell, idx) => {
            if(1 == cell.getAttribute('pos-x') && snakeCoord[1] == cell.getAttribute('pos-y')){
                th.snake.unshift(cell)
                cell.classList.add('red')
            }
            })

        }
        }  else if(th.direction == 'bottom'){
        if(snakeCoord[1] > 1) {

            cells.forEach((cell, idx) => {
            if(snakeCoord[0] == cell.getAttribute('pos-x') && snakeCoord[1]-1 == cell.getAttribute('pos-y')){
                th.snake.unshift(cell)
                cell.classList.add('red')

            }
            })


        } else {

            cells.forEach((cell, idx) => {
            if(snakeCoord[0] == cell.getAttribute('pos-x') && 20 == cell.getAttribute('pos-y')){
                th.snake.unshift(cell)
                cell.classList.add('red')
            }
            })

        }
        } else if (th.direction == 'top'){

        if(snakeCoord[1] < 20) {

            cells.forEach((cell, idx) => {
            if(snakeCoord[0] == cell.getAttribute('pos-x') && snakeCoord[1]+1 == cell.getAttribute('pos-y')){
                th.snake.unshift(cell)
                cell.classList.add('red')
            }
            })

        } else {

            cells.forEach((cell, idx) => {
            if(snakeCoord[0] == cell.getAttribute('pos-x') && 1 == cell.getAttribute('pos-y')){
                th.snake.unshift(cell)
                cell.classList.add('red')

            }
            })

        }
        }


        th.snake.forEach((item,idx) => {
        if(idx == 0) {
            item.classList.add('red')
        } else {
            item.classList.add('blue')
        }
        })

        if(snakeCoord.toString() == th.coordFood.toString()) {

        th.cScore++
        th.score.innerHTML = th.cScore-2;
        cells.forEach((cell, idx) => {
            if(snakeCoord[0]== cell.getAttribute('pos-x') && snakeCoord[1] == cell.getAttribute('pos-y')){
            th.snake.push(cells[idx+2+th.cScore])
            }
            if(th.coordFood[0] == cell.getAttribute('pos-x') && th.coordFood[1] == cell.getAttribute('pos-y')) {
            cell.classList.remove('yellow')
            }
        })
        th.coordFood = th._generateEatCoord();

    
        cells.forEach((cell, idx) => {
            if(th.coordFood[0] == cell.getAttribute('pos-x') && th.coordFood[1] == cell.getAttribute('pos-y')) {
            cell.classList.add('yellow')
            }
        })

        }
        if(th.snake[0].classList.contains('blue')){
        // alert('Игра окончена!')
        th._restartGame()
        th.coord = th._generateSnakeCoord()
        snakeCoord = th._generateSnakeCoord()
        
        }

    }
    _controls() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 37 && this.direction != 'right'){
            this.direction = 'left'
            } else if (e.keyCode == 38 && this.direction != 'bottom'){
            this.direction = 'top'
            } else if (e.keyCode == 39 && this.direction != 'left'){
            this.direction = 'right'
            } else if (e.keyCode == 40 && this.direction != 'top'){
            this.direction = 'bottom'
            }

        })
    }
    _restartGame(snakeCoord) {
        this._animation(true)
        this.score.innerHTML = 'Игра Закончена! Ты набрал ' + (this.cScore-2) + ' очков.';
        this.btn.classList.remove('hide');
        this.btn.addEventListener('click', () => {
            location.reload()
        })  
    }
}


const snakeGame = new Snake({
    gameSelector: '.js-game', 
    scoreSelector: '.js-score', 
    btnSelector:'.js-btn', 
});
