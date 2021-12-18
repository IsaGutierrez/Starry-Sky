class Star_Static {
    constructor(ctx) {
        this.ctx = ctx
        
        this.width = 30
        this.height = 30

        this.xStatic = Math.floor(Math.random() * ((this.ctx.canvas.width - this.width + 1) - 0) + 0)
        this.yStatic = Math.floor(Math.random() * ((this.ctx.canvas.height - this.height + 1) - 0) + 0)
        

        this.vxStatic = 5


        this.imgStatic = new Image()
        this.imgStatic.src = "./images/coin-sprite.png"
        this.imgStatic.isReady = false

        this.imgStatic.onload = () => {
            this.imgStatic.isReady = true
        }

        this.horizontalFrames = 4
        this.verticalFrames = 1

        this.xFrame = 0
        this.yFrame = 0

        this.tick = 0

        this.staticExists = true
        
    }

    draw() {
        if (this.imgStatic.isReady) {
            this.ctx.drawImage(
                this.imgStatic,
                (this.imgStatic.width * this.xFrame) / this.horizontalFrames,
                (this.imgStatic.height * this.yFrame) / this.verticalFrames,
                this.imgStatic.width / this.horizontalFrames,
                this.imgStatic.height * this.verticalFrames,
                this.xStatic,
                this.yStatic,
                this.width,
                this.height)
        }
        
        this.tick++
    }

    move() {
        // this.xStatic += this.vxStatic
        if (this.tick % 10 === 0) {
            this.xFrame++
      
            if (this.xFrame >= this.horizontalFrames) {
              this.xFrame = 0
            }
          }
    }

    clickOnStar(x, y) {
        if (x >= this.xStatic && x <= this.xStatic + this.width
            && y >= this.yStatic && y <= this.yStatic + this.height) {
            this.staticExists = false
            return true
        }
        return false
    }

    
}