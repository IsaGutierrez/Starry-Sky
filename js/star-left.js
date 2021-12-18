class Star_Left {
    constructor(ctx) {
        this.ctx = ctx
        this.width = 40
        this.height = 40

        this.xLeft = 0
        this.yLeft = Math.floor(Math.random() * ((this.ctx.canvas.height - this.height + 1) - 0) + 0)

        this.vxLeft = 2


        this.imgLeft = new Image()
        this.imgLeft.src = "./images/bug-sprite.png"
        this.imgLeft.isReady = false

        this.imgLeft.onload = () => {
            this.imgLeft.isReady = true
        }

        this.horizontalFrames = 4
        this.verticalFrames = 1

        this.xFrame = 0
        this.yFrame = 0

        this.tick = 0


        this.leftExists = true
    }

    draw() {
        if (this.imgLeft.isReady) {
            this.ctx.drawImage(
                this.imgLeft,
                (this.imgLeft.width * this.xFrame) / this.horizontalFrames,
                (this.imgLeft.height * this.yFrame) / this.verticalFrames,
                this.imgLeft.width / this.horizontalFrames,
                this.imgLeft.height * this.verticalFrames,
                this.xLeft,
                this.yLeft,
                this.width,
                this.height)
        }

        this.tick++
    }

    move() {
        this.xLeft += this.vxLeft

        if (this.tick % 10 === 0) {
            this.xFrame++
      
            if (this.xFrame >= this.horizontalFrames) {
              this.xFrame = 0
            }
          }
    }

    clickOnStar(x, y) {
        if (x >= this.xLeft && x <= this.xLeft + this.width
            && y >= this.yLeft && y <= this.yLeft + this.height) {
            this.leftExists = false
            return true
        }
        return false
    }

}