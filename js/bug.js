class Bug {
    constructor(ctx) {
        this.ctx = ctx
        this.width = 40
        this.height = 40
    
    // Lunar Bugs appear from the left side of the canvas at a random height.
        this.x = 0
        this.y = Math.floor(Math.random() * ((this.ctx.canvas.height - this.height + 1) - 0) + 0)

        this.vx = 2

        this.img = new Image()
        this.img.src = "./images/bug-sprite.png"
        this.img.isReady = false

        this.img.onload = () => {
            this.img.isReady = true
        }

        this.horizontalFrames = 4
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
    // Lunar bugs move from left to right.
    
        this.x += this.vx
        if (this.tick % 10 === 0) {
            this.xFrame++
      
            if (this.xFrame >= this.horizontalFrames) {
              this.xFrame = 0
            }
          }
    }

    clickOnItem(x, y) {
    // When player clicks on bug, it returns TRUE.
    
        if (x >= this.x && x <= this.x + this.width
            && y >= this.y && y <= this.y + this.height) {
            this.exists = false
            return true
        }
        return false
    }

}