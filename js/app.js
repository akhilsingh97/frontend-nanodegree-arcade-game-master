// Enemies our player must avoid
var Enemy = function() {

    this.x = 0;
    this.y = (Math.floor(Math.random() * 3) + 1) * 80 + (-20);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  //updating the enemy's speed
    this.x = this.x + 5;


    if (this.y === player.b && this.x === player.a) {

        player.a = 200;
        player.b = 300;
        player.counter = 0;
    }
    this.x * dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(xCoord, yCoord) {
    this.counter = 0;
    this.a = xCoord;
    this.b = yCoord;
}
Player.prototype.update = function() {
  //Player should not go beyond boundaries
    if (this.a > 390)
        this.a = 390;
    if (this.a < 10)
        this.a = 10;
    if (this.b < -20)
        this.b = -20;
    if (this.b > 380)
        this.b = 380;

}

Player.prototype.render = function() {
  //Player's character image
    ctx.drawImage(Resources.get('images/char-boy.png'), this.a, this.b);

}
Player.prototype.handleInput = function(input) {
//Task to be done if any key is pressed
    if (input === 'left')
        this.a = this.a - 95;
    else if (input === 'right')
        this.a = this.a + 95;
    else if (input === 'up')
        this.b = this.b - 80;
    else if (input === 'down')
        this.b = this.b + 80;
// If the player reaches on top avoiding enemies
    if (this.b === -20 && this.a === 200) {
        this.counter++;    //increase the counter
        console.log(this.counter);
        //If the player reaches 5 times continuously to the top then a heart will appear, else count restarts.
        if (this.counter === 5) {
            this.counter = 0;
            ctx.drawImage(Resources.get('images/Heart.png'), 200, -80);

        }
        this.b = 300;
    }



}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy = new Enemy();
var allEnemies = [];
//Interval for enemies to arrive
setInterval(function() {
    allEnemies.push(new Enemy());
}, 1000);
//var player= Object.create(Player.prototype);
var player = new Player(200, 300);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
