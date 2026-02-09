// This file serves as the entry point for the Snake game. It initializes the game, sets up event listeners for user input, and starts the game loop.

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const snake = new Snake();
let food;
let gameInterval;

function init() {
    createFood();
    document.addEventListener('keydown', changeDirection);
    gameInterval = setInterval(gameLoop, 100);
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * canvas.width / 10) * 10,
        y: Math.floor(Math.random() * canvas.height / 10) * 10
    };
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            snake.changeDirection(0, -1);
            break;
        case 'ArrowDown':
            snake.changeDirection(0, 1);
            break;
        case 'ArrowLeft':
            snake.changeDirection(-1, 0);
            break;
        case 'ArrowRight':
            snake.changeDirection(1, 0);
            break;
    }
}

function gameLoop() {
    if (snake.eat(food)) {
        createFood();
    }
    if (snake.update()) {
        clearInterval(gameInterval);
        alert('Game Over!');
        return;
    }
    render();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.draw(ctx);
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

window.onload = init;