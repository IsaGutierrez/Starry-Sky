class Star_Static {
    constructor(ctx) {
        this.ctx = ctx

        this.xStatic = Math.floor(Math.random() * this.ctx.canvas.width)
        this.yStatic = Math.floor(Math.random() * (this.ctx.canvas.height - 50))

        this.vxStatic = 5

        this.width = 50
        this.height = 50

        this.imgStatic = new Image()
        this.imgStatic.src = "./images/star.png"
        this.imgStatic.isReady = false

        this.imgStatic.onload = () => {
            this.imgStatic.isReady = true
        }

        this.staticExists = true
        
    }

    draw() {
        if (this.imgStatic.isReady) {
            this.ctx.drawImage(
                this.imgStatic,
                this.xStatic,
                this.yStatic,
                this.width,
                this.height)
        }
    }

    move() {
        // this.xStatic += this.vxStatic
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