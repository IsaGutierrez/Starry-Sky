class Game {
    constructor(ctx) {
        this.ctx = ctx
        
        this.background = new Background(ctx)

        this.staticStars = []
        this.rightStars = []
        this.leftStars = []

        this.starsFrameCount = 0

        this.intervalId = undefined
        this.fps = 1000 / 60

        this.score = 0;
    }

    start(){
        if(!this.intervalId){
            this.intervalId = setInterval(() => {

                if (this.starsFrameCount % 120 === 0) {
                    this.addStar()
                    this.starsFrameCount = 0
                }
                
                this.clear();
                this.draw();
                this.move();
                this.drawScore();

                this.starsFrameCount++

            }, this.fps)
        }

    }

    clear(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.staticStars = this.staticStars.filter(star => star.staticExists === true)

        this.rightStars = this.rightStars.filter(star => star.xRight + star.width > 0)        
        this.rightStars = this.rightStars.filter(star => star.rightExists === true)

        this.leftStars = this.leftStars.filter(star => star.xLeft + star.width > 0)
        this.leftStars = this.leftStars.filter(star => star.leftExists === true)        
    }

    draw() {
        this.background.draw()
        this.staticStars.forEach(star => star.draw())
        this.rightStars.forEach(star => star.draw())
        this.leftStars.forEach(star => star.draw())
    }

    move() {
        this.staticStars.forEach(star => star.move())
        this.rightStars.forEach(star => star.move())
        this.leftStars.forEach(star => star.move())
    }

    addStar() {
        this.staticStars.push(new Star_Static(this.ctx))
        this.rightStars.push(new Star_Right(this.ctx))
        this.leftStars.push(new Star_Left(this.ctx))
    }

    clickOnStar(x, y) {
        this.staticStars.forEach(star => {
           const hasClickedOnStar = star.clickOnStar(x, y);
            if(hasClickedOnStar) {
                this.score++;
            }
        })

        this.rightStars.forEach(star => {
            const hasClickedOnStar = star.clickOnStar(x, y);
             if(hasClickedOnStar) {
                 this.score++;
             }
        })

        this.leftStars.forEach(star => {
           const hasClickedOnStar = star.clickOnStar(x, y);
            if(hasClickedOnStar) {
                this.score++;
            }
        })
    }

    drawScore() {
        this.ctx.save()

        this.ctx.fillStyle = 'white'
        this.ctx.font = 'bold 24px sans-serif'
        this.ctx.fillText(`Score: ${this.score} points`, 80, 50) 

        this.ctx.restore()
    }
}