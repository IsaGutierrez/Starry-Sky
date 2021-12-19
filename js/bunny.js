class Bunny {
    constructor(ctx) {
        this.ctx = ctx
        
        this.width = 80
        this.height = 80

    // Bunnies appear from the right side of the canvas at a random height.
        this.x = this.ctx.canvas.width
        this.y = Math.floor(Math.random() * ((this.ctx.canvas.height - this.height + 1) - 0) + 0)

        this.vx = -1

        this.img = new Image()
        this.img.src = "./images/bunny-sprite.png"
        this.img.isReady = false

        this.img.onload = () => {
            this.img.isReady = true
        }

        this.horizontalFrames = 6
        this.verticalFrames = 1

        this.xFrame = 0
        this.yFrame = 0

        this.tick = 0

        this.exists = true
    }

    draw() {
        if (this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                (this.img.width * this.xFrame) / this.horizontalFrames,
                (this.img.height * this.yFrame) / this.verticalFrames,
                this.img.width / this.horizontalFrames,
                this.img.height * this.verticalFrames,
                this.x,
                this.y,
                this.width,
                this.height)
        }
        
        this.tick++
    }

    move() {
    // Bunnies move from right to left.
        
        this.x += this.vx
        if (this.tick % 10 === 0) {
            this.xFrame++
      
            if (this.xFrame >= this.horizontalFrames) {
              this.xFrame = 0
            }
        }        
    }

    clickOnItem(x, y) {
    // When player clicks on bunny, it returns TRUE.
    
        if (x >= this.x && x <= this.x + this.width
            && y >= this.y && y <= this.y + this.height) {
            this.exists = false
            return true
        }
        return false
    }
}