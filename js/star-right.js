class Star_Right {
    constructor(ctx) {
        this.ctx = ctx

        this.xRight = this.ctx.canvas.width
        this.yRight = Math.floor(Math.random() * (this.ctx.canvas.height - 50))

        this.vxRight = -2

        this.width = 50
        this.height = 50

        this.imgRight = new Image()
        this.imgRight.src = "./images/star.png"
        this.imgRight.isReady = false

        this.imgRight.onload = () => {
            this.imgRight.isReady = true
        }

        this.rightExists = true
    }

    draw() {

        if (this.imgRight.isReady) {
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

    clickOnStar(x, y) {
        if (x >= this.xRight && x <= this.xRight + this.width
            && y >= this.yRight && y <= this.yRight + this.height) {
            this.rightExists = false
            return true
        }
        return false
    }
}