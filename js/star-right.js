class Star_Right {
    constructor(ctx) {
        this.ctx = ctx

        this.xRight = this.ctx.canvas.width
        this.yRight = Math.floor(Math.random() * (this.ctx.canvas.height - 50))

        this.vxRight = -1

        this.width = 80
        this.height = 80

        this.imgRight = new Image()
        this.imgRight.src = "./images/bunny-right.png"
        this.imgRight.isReady = false

        this.imgRight.onload = () => {
            this.imgRight.isReady = true
        }

        this.horizontalFrames = 6
        this.verticalFrames = 1

        this.xFrame = 0
        this.yFrame = 0

        this.tick = 0

        this.rightExists = true
    }

    draw() {

        if (this.imgRight.isReady) {
            this.ctx.drawImage(
                this.imgRight,
                (this.imgRight.width * this.xFrame) / this.horizontalFrames,
                (this.imgRight.height * this.yFrame) / this.verticalFrames,
                this.imgRight.width / this.horizontalFrames,
                this.imgRight.height * this.verticalFrames,
                this.xRight,
                this.yRight,
                this.width,
                this.height)
        }
        
        this.tick++
    }

    move() {
        this.xRight += this.vxRight

        if (this.tick % 10 === 0) {
            this.xFrame++
      
            if (this.xFrame >= this.horizontalFrames) {
              this.xFrame = 0
            }
          }

        
    }

    clickOnStar(x, y) {
        if (x >= this.xRight && x <= this.xRight + this.width
            && y >= this.yRight && y <= this.yRight + this.height) {
            this.rightExists = false
            return true
        }
        return false
    }
}