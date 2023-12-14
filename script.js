const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
let box = 20;
let snake = [];
let food = {};
let score = 0;
let d;
let canChangeDirection = true;

function isMobile() {
    return window.innerWidth <= 768; // Adjust the value as needed
}
// Initialize the game
function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    box = Math.floor(Math.min(canvas.width, canvas.height) / 40);

    snake = [];
    snake[0] = { 
        x: Math.floor(canvas.width / 2 / box) * box, 
        y: Math.floor(canvas.height / 2 / box) * box 
    };
    spawnFood();
    score = 0;
    d = "RIGHT";
    startGame();

    const mobileControls = document.getElementById('mobileControls');
    if (isMobile()) {
        mobileControls.style.display = 'block';
    } else {
        mobileControls.style.display = 'none';
    }

}

// Spawn food at a random location
function spawnFood() {
    food = {
        x: Math.floor(Math.random() * Math.floor(canvas.width / box)) * box,
        y: Math.floor(Math.random() * Math.floor(canvas.height / box)) * box
    };
}

document.addEventListener("keydown", direction);
window.addEventListener('resize', init);

function direction(event) {
    if (canChangeDirection) {
        canChangeDirection = false; // Disable direction change temporarily

        if (event.keyCode === 37 && d !== "RIGHT") {
            d = "LEFT";
        } else if (event.keyCode === 38 && d !== "DOWN") {
            d = "UP";
        } else if (event.keyCode === 39 && d !== "LEFT") {
            d = "RIGHT";
        } else if (event.keyCode === 40 && d !== "UP") {
            d = "DOWN";
        }

        // Enable direction change after a delay (200 milliseconds)
        setTimeout(() => {
            canChangeDirection = true;
        }, 50);
    }
}

function collision(head, array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

let game;
function startGame() {
    if (game) {
        clearInterval(game);
    }
    game = setInterval(draw, 100);
}

function draw() {
    ctx.fillStyle = '#2d2d2d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "white" : "white";
        // ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.fillRect(snake[i].x + 1, snake[i].y + 1, box - 2, box - 2);


    }

    
    ctx.fillStyle = "white";
    // ctx.fillRect(food.x, food.y, box, box);
    ctx.fillRect(food.x + 1, food.y + 1, box - 2, box - 2);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d === "LEFT") snakeX -= box;
    if(d === "UP") snakeY -= box;
    if(d === "RIGHT") snakeX += box;
    if(d === "DOWN") snakeY += box;

    // Wrap snake position when it crosses canvas borders
    if (snakeX < 0) snakeX = canvas.width - box;
    else if (snakeX >= canvas.width) snakeX = 0;
    if (snakeY < 0) snakeY = canvas.height - box;
    else if (snakeY >= canvas.height) snakeY = 0;

    // Ensure that the position is aligned with the grid
    snakeX = Math.floor(snakeX / box) * box;
    snakeY = Math.floor(snakeY / box) * box;

    if(snakeX === food.x && snakeY === food.y) {
        score++;
        spawnFood();
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

if (collision(newHead, snake)) {
    clearInterval(game);
    // alert(`Game over. Your score: ${score}`);
    startButton.style.display = 'block';
}
    snake.unshift(newHead);
}

startButton.addEventListener('click', function() {
    startButton.style.display = 'none'; // Hide the button
    init(); // Initialize the game
});

const leftButton = document.getElementById('leftButton');
const upButton = document.getElementById('upButton');
const rightButton = document.getElementById('rightButton');
const downButton = document.getElementById('downButton');

leftButton.addEventListener('click', function() {
    if (d !== "RIGHT") {
        d = "LEFT";
    }
});

upButton.addEventListener('click', function() {
    if (d !== "DOWN") {
        d = "UP";
    }
});

rightButton.addEventListener('click', function() {
    if (d !== "LEFT") {
        d = "RIGHT";
    }
});

downButton.addEventListener('click', function() {
    if (d !== "UP") {
        d = "DOWN";
    }
});
