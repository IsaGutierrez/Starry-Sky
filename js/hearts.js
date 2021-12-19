class Hearts {
    constructor(ctx) {
        this.ctx = ctx
        this.x = 50
        this.y = 65

        this.width = 90
        this.height = 25

    // Four images to show the number of remaining lives the player has.
        this.img3 = new Image()
        this.img3.src = "./images/hearts-3.png"
        this.img3.isReady = false
        
        this.img3.onload = () => {
            this.img3.isReady = true
        }

        this.img2 = new Image()
        this.img2.src = "./images/hearts-2.png"
        this.img2.isReady = false
        
        this.img2.onload = () => {
            this.img2.isReady = true
        }

        this.img1 = new Image()
        this.img1.src = "./images/hearts-1.png"
        this.img1.isReady = false
        
        this.img1.onload = () => {
            this.img1.isReady = true
        }

        this.img0 = new Image()
        this.img0.src = "./images/hearts-0.png"
        this.img0.isReady = false
        
        this.img0.onload = () => {
            this.img0.isReady = true
        }
    }

    draw3() {
        if (this.img3.isReady) {
            this.ctx.drawImage(
                this.img3,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }
    }

    draw2() {
        if (this.img2.isReady) {
            this.ctx.drawImage(
                this.img2,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }
    }
    
    draw1() {
        if (this.img1.isReady) {
            this.ctx.drawImage(
                this.img1,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }
    }

    draw0() {
        if (this.img0.isReady) {
            this.ctx.drawImage(
                this.img0,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }
    }
}