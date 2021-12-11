class Star {
    constructor(ctx) {
        this.ctx = ctx

        this.xStatic = Math.floor(Math.random() * this.ctx.canvas.width)
        this.yStatic = Math.floor(Math.random() * (this.ctx.canvas.height - 50))

        this.xRight = this.ctx.canvas.width
        this.yRight = Math.floor(Math.random() * (this.ctx.canvas.height - 50))

        this.xLeft = 0
        this.yLeft = Math.floor(Math.random() * (this.ctx.canvas.height - 50))

        this.vxStatic = 5
        this.vxRight = -3
        this.vxLeft = 3

        this.width = 50
        this.height = 50

        this.imgStatic = new Image()
        this.imgStatic.src = "./images/star.png"
        this.imgStatic.isReady = false

        this.imgStatic.onload = () => {
            this.imgStatic.isReady = true
        }

        this.imgRight = new Image()
        this.imgRight.src = "./images/star.png"
        this.imgRight.isReady = false

        this.imgRight.onload = () => {
            this.imgRight.isReady = true
        }

        this.imgLeft = new Image()
        this.imgLeft.src = "./images/star.png"
        this.imgLeft.isReady = false

        this.imgLeft.onload = () => {
            this.imgLeft.isReady = true
        }

        this.exists = true


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

        if (this.imgRight.isReady) {
            this.ctx.drawImage(
                this.imgRight,
                this.xRight,
                this.yRight,
                this.width,
                this.height)
        }

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
        // this.xStatic += this.vxStatic
        this.xRight += this.vxRight
        this.xLeft += this.vxLeft
    }

    clickOnStar(x, y) {
        if (x >= this.xStatic && x <= this.xStatic + this.width
            && y >= this.yStatic && y <= this.yStatic + this.height) {
            this.exists = false
        }

        if (x >= this.xRight && x <= this.xRight + this.width
            && y >= this.yRight && y <= this.yRight + this.height) {
            this.exists = false
        }
        
        if (x >= this.xLeft && x <= this.xLeft + this.width
            && y >= this.yLeft && y <= this.yLeft + this.height) {
            this.exists = false
        }
    }

}