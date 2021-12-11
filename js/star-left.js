class Star_Left {
    constructor(ctx) {
        this.ctx = ctx

        this.xLeft = 0
        this.yLeft = Math.floor(Math.random() * (this.ctx.canvas.height - 50))

        this.vxLeft = 2

        this.width = 50
        this.height = 50

        this.imgLeft = new Image()
        this.imgLeft.src = "./images/star.png"
        this.imgLeft.isReady = false

        this.imgLeft.onload = () => {
            this.imgLeft.isReady = true
        }

        this.leftExists = true
    }

    draw() {
        if (this.imgLeft.isReady) {
            this.ctx.drawImage(
                this.imgLeft,
                this.xLeft,
                this.yLeft,
                this.width,
                this.height)
        }
    }

    move() {
        this.xLeft += this.vxLeft
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