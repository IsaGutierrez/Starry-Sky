class Obstacle {
    constructor(ctx) {
        this.ctx = ctx
        
        this.width = 85
        this.height = 85

    // Obstacle appears in a random position inside the canvas.
        this.x = Math.floor(Math.random() * ((this.ctx.canvas.width - this.width + 1) - 0) + 0)
        this.y = Math.floor(Math.random() * ((this.ctx.canvas.height - this.height + 1) - 0) + 0)

    // Obstacle moves in a random direction.
        this.vx = Math.floor(Math.random() * (-2 - 2) + 2)
        this.vy = Math.floor(Math.random() * (-2 - 2) + 2)


        this.img = new Image()
        this.img.src = "./images/ironhack_logo.png"
        this.img.isReady = false

        this.img.onload = () => {
            this.img.isReady = true
        }

        this.exists = true
    }

    draw() {
        if (this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height)
        }
    }

    move() {
    // When obstacle collides with the borders of the canvas, changes the direction.
        
        this.x += this.vx // Horizontal movement
        if (this.x + this.width >= this.ctx.canvas.width || this.x <= 0) {
            this.vx *= -1
        }

        this.y += this.vy // Vertical movement
        if (this.y + this.height >= this.ctx.canvas.height || this.y <= 0) {
            this.vy *= -1
        }
    }

    clickOnObstacle(x, y) {
    // When player clicks on obstacle, it returns TRUE.
        if (x >= this.x && x <= this.x + this.width
            && y >= this.y && y <= this.y + this.height) {
            this.exists = false
            return true
        }
        return false
    }
}