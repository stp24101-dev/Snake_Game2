class Snake {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.snakeSize = 10;
        this.snake = [{ x: 5 * this.snakeSize, y: 5 * this.snakeSize }];
        this.direction = { x: 0, y: 0 };
        this.food = this.generateFood();
        this.score = 0;
    }

    generateFood() {
        const x = Math.floor(Math.random() * (this.canvas.width / this.snakeSize)) * this.snakeSize;
        const y = Math.floor(Math.random() * (this.canvas.height / this.snakeSize)) * this.snakeSize;
        return { x, y };
    }

    changeDirection(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (this.direction.y === 0) this.direction = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                if (this.direction.y === 0) this.direction = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                if (this.direction.x === 0) this.direction = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                if (this.direction.x === 0) this.direction = { x: 1, y: 0 };
                break;
        }
    }

    update() {
        const head = { x: this.snake[0].x + this.direction.x * this.snakeSize, y: this.snake[0].y + this.direction.y * this.snakeSize };

        if (this.checkCollision(head)) {
            this.resetGame();
        } else {
            this.snake.unshift(head);
            if (head.x === this.food.x && head.y === this.food.y) {
                this.score++;
                this.food = this.generateFood();
            } else {
                this.snake.pop();
            }
        }
    }

    checkCollision(head) {
        return (
            head.x < 0 || head.x >= this.canvas.width ||
            head.y < 0 || head.y >= this.canvas.height ||
            this.snake.some(segment => segment.x === head.x && segment.y === head.y)
        );
    }

    resetGame() {
        this.snake = [{ x: 5 * this.snakeSize, y: 5 * this.snakeSize }];
        this.direction = { x: 0, y: 0 };
        this.food = this.generateFood();
        this.score = 0;
    }

    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'green';
        this.snake.forEach(segment => {
            this.context.fillRect(segment.x, segment.y, this.snakeSize, this.snakeSize);
        });
        this.context.fillStyle = 'red';
        this.context.fillRect(this.food.x, this.food.y, this.snakeSize, this.snakeSize);
    }
}