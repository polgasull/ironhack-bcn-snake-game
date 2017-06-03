function Game(options) {
    this.rows    = options.rows;
    this.columns = options.columns;
    this.snake   = options.snake;
    this.food    = {
      row: Math.floor(Math.random() * this.rows),
      column: Math.floor(Math.random() * this.columns)
    };


for (var rowIndex = 0; rowIndex < options.rows; rowIndex++){
   for (var columnIndex = 0; columnIndex < options.columns; columnIndex++){
     $('.container').append($('<div>')
       .addClass('cell board')
       .attr('data-row', rowIndex)
       .attr('data-col', columnIndex)

     );
   }
 }
}

Game.prototype.drawSnake = function() {
  this.snake.body.forEach(function(position, index) {
    var selector = '[data-row=' + position.row + '][data-col=' + position.column + ']'; //esto es creacion de html a partir de js
        $(selector).addClass('snake');
  });
};

Game.prototype.start = function() {
  this.intervalId =setInterval(this.update.bind(this), 100); // le asignamos milisegundes a la funcion START
};

Game.prototype.update = function(){
  this.snake.moveForward(this.rows, this.columns);
  if (this.snake.hasEatenFood(this.food)) {
    this.snake.grow();
    this.clearFood();
    this.generateFood();
    this.drawFood();
}
  if (this.snake.hasEatenItself())   {
    this.stop();
    alert("GAME OVER");
  }
  this.clearSnake();
  this.drawSnake();
};

Game.prototype.clearSnake = function() { // borra snake y la vuelve a pintar
  $(".snake").removeClass("snake");
};

Game.prototype.assignControlsToKeys = function() {
  $("body").on("keydown", function(event){
    switch (event.keyCode) {
      case 87:
        this.snake.goUp();
        break;
      case 83:
        this.snake.goDown();
        break;
      case 65:
        this.snake.goLeft();
        break;
      case 68:
        this.snake.goRight();
        break;
      case 80:
        if (this.intervalId) {
          this.stop();
        } else {
          this.start();
        }
    }
  }.bind(this));
};

Game.prototype.generateFood = function() {
  while (this.snake.hasEatenFood(this.food)) {
    this.food = {
      row: Math.floor(Math.random() * this.rows),
      column: Math.floor(Math.random() * this.columns)
    };
  }
};

Game.prototype.drawFood = function(){
  var selector = '[data-row=' + this.food.row + '][data-col=' + this.food.column + ']';
  $(selector).addClass('food');
};

Game.prototype.clearFood = function() {
  $(".food").removeClass("food");
};

Game.prototype.stop = function() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
};

var game = new Game({
  rows: 50,
  columns: 50,
  snake: new Snake()
});

game.start();
game.assignControlsToKeys();
game.generateFood();
game.drawFood();
