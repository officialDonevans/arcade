const victory = document.querySelector('.win');
const close = document.querySelector('.close');
// Enemies our player must avoid
//const body = document.getElementsByTagName('body');

var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = x;
    this.y = y + 62;
    this.speed = speed;
    this.halt= 101;
    this.sprite = 'images/enemy-bug.png';
    this.totalDistance = this.halt*5;
    this.resetPosition =-101;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < this.totalDistance){
        this.x += this.speed * dt;
    }else{
        this.x = this.resetPosition;
     }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// class for the player
class Player{
    constructor(){
        this.sprite = 'images/char-boy.png';
        this.vertical = 83;
        this.horizontal = 101;
        //starting point in x axis
        this.startX = this.horizontal*2;
         //starting point in y axis
        this.startY = (this.vertical*4) + 62;
        //for success of the player
        this.success = false;
        this.x = this.startX;
        this.y = this.startY;

    }


    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);   
    }


    // to handle the input of the player
    handleInput(input){
        //input of user
        switch(input){
            case 'left':
                if (this.x > 0){
                    this.x -= this.horizontal;
                }
                break;
            case 'right':
                if (this.x < this.horizontal *4){
                    this.x += this.horizontal;
                }
                break;
            case 'up':
                if (this.y > this.vertical -80){
                    this.y -= this.vertical;
                }
                break;
            case 'down':
                if (this.y < this.vertical*4){
                    this.y += this.vertical;
                }
                break;
              
        }
    }


    update(){
        // when player wins the game
       if (this.y < 0){ 

            victory.classList.remove("void");
            this.sprite = false;
            this.sprite = true;
                
        }

        //to reset the enemies

        for(let enemy of allEnemies){

            if (this.y === enemy.y && (enemy.x + enemy.halt/2 > this.x && enemy.x < this.x + this.horizontal/ 2)){
                this.reset();
            }
        }
        
    }

    //reset function
    reset(){
        this.x = this.startX;
        this.y = this.startY;
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();

const enemy1 = new Enemy(-101, 0, 200);
const enemy2 = new Enemy(-101, 0, 300);
const enemy3 = new Enemy(-101, 0, 400);
const enemy4 = new Enemy(-101, 83, 250);
const enemy5 = new Enemy((-101 * 2.5), 83, 350);
const enemy6 = new Enemy(-101, 166, 420);

const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6);

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

close.addEventListener("click", function(){
 window.location.reload(true);   
});
