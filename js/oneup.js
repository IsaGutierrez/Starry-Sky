class Oneup {
    constructor(ctx, date) {
        this.ctx = ctx
        this.date = date
        
        this.width = 20
        this.height = 20

        this.x = Math.floor(Math.random() * ((this.ctx.canvas.width - this.width + 1) - 0) + 0)
        this.y = Math.floor(Math.random() * ((this.ctx.canvas.height - this.height + 1) - 0) + 0)

        this.vx = 6
        this.vy = 4

        this.img = new Image()
        this.img.src = "./images/oneup.png"
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
        this.x += this.vx

        if (this.x + this.width >= this.ctx.canvas.width || this.x <= 0) {
            this.vx *= -1
        }

        this.y += this.vy

        if (this.y + this.height >= this.ctx.canvas.height || this.y <= 0) {
            this.vy *= -1
        }
    }

    clickOnOneup(x, y) {
        if (x >= this.x && x <= this.x + this.width
            && y >= this.y && y <= this.y + this.height) {
            this.exists = false
            return true
        }
        return false
    }
}