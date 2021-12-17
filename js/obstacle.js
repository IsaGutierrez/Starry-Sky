class Obstacle {
    constructor(ctx) {
        this.ctx = ctx

        this.x = this.ctx.canvas.width
        this.y = Math.floor(Math.random() * (this.ctx.canvas.height - 50))

        this.vx = -1

        this.width = 50
        this.height = 50

        this.img = new Image()
        this.img.src = "./images/lunar-bug.png"
        this.img.isReady = false

        this.img.onload = () => {
            this.img.isReady = true
        }

        this.exists = true
    }

    draw() {

        if (this.img.isReady) {
            this.ctx.drawImage(
                this.imgRight,
                this.xRight,
                this.yRight,
                this.width,
                this.height)
        }
    }

    move() {
        this.xRight += this.vxRight
    }

    clickOnObstacle(x, y) {
        if (x >= this.x && x <= this.x + this.width
            && y >= this.y && y <= this.y + this.height) {
            this.exists = false
            return true
        }
        return false
    }
}