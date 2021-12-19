class Coin {
    constructor(ctx) {
        this.ctx = ctx
        
        this.width = 30
        this.height = 30

    // Coins appear on random width and height.
        this.x = Math.floor(Math.random() * ((this.ctx.canvas.width - this.width + 1) - 0) + 0)
        this.y = Math.floor(Math.random() * ((this.ctx.canvas.height - this.height + 1) - 0) + 0)
        
        this.img = new Image()
        this.img.src = "./images/coin-sprite.png"
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
    // Coins do not move, this is only for sprites.
    
        if (this.tick % 10 === 0) {
            this.xFrame++
      
            if (this.xFrame >= this.horizontalFrames) {
              this.xFrame = 0
            }
        }
    }

    clickOnItem(x, y) {
        if (x >= this.x && x <= this.x + this.width
            && y >= this.y && y <= this.y + this.height) {
            this.exists = false
            return true
        }
        return false
    }  
}