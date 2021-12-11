class Game {
    constructor(ctx) {
        this.ctx = ctx
        
        this.background = new Background(ctx)

        this.stars = []
        this.starsFrameCount = 0

        this.intervalId = undefined
        this.fps = 1000 / 60

        this.score = 0
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
        this.stars = this.stars.filter(star => star.xRight + star.width > 0)
        this.stars = this.stars.filter(star => star.xLeft + star.width > 0)

        this.stars = this.stars.filter(star => star.exists === true)
    }

    draw() {
        this.background.draw()
        this.stars.forEach(star => star.draw())
    }

    move() {
        this.stars.forEach(star => star.move())
    }

    addStar() {
        this.stars.push(new Star(this.ctx))
    }

    clickOnStar(x, y) {
        // window.testEvent = event
        this.stars.forEach(star => star.clickOnStar(x, y))
    }

    drawScore() {
        this.ctx.save()

        this.ctx.fillStyle = 'gray'
        this.ctx.font = 'bold 24px sans-serif'
        this.ctx.fillText(`Score: ${this.score} points`, 80, 50) 

        this.ctx.restore()
    }
}