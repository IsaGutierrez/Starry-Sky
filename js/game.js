class Game {
    constructor(ctx) {
        this.ctx = ctx
        
        this.background = new Background(ctx)
        this.hearts = new Hearts(ctx)

        this.staticStars = []
        this.rightStars = []
        this.leftStars = []
        this.obstacles = []
        this.oneup = []

        this.lives = 3

        this.starsFrameCount = 0
        this.starsFrames = 150

        this.obstaclesFrameCount = 0
        this.obstaclesFrames = 200
        
        this.intervalId = undefined
        this.fps = 1000 / 60

        this.score = 0;

        this.musicSound = new Audio('./sounds/background-music.mp3')
        this.musicSound.loop = true
        this.musicSound.volume = 0.3


        this.coinSound = new Audio('./sounds/coin.wav')
        this.coinSound.volume = 1
        this.bunnySound = new Audio('./sounds/bunny2.ogg')
        this.bunnySound.volume = 0.4
        this.bugSound = new Audio('./sounds/bug.wav')
        this.bugSound.volume = 0.3
        this.hurtSound = new Audio('./sounds/hurt.ogg')
        this.hurtSound.volume = 1
        this.gameOverSound = new Audio('./sounds/gameOver.ogg')
        this.gameOverSound.volume = 0.6
        // this.coinSound = new Audio('./sounds/coin.wav')

    }

    start(){
        if(!this.intervalId){
            this.musicSound.play()
            this.musicSound.currentTime = 0
            

            this.intervalId = setInterval(() => {

                if (this.starsFrameCount % this.starsFrames === 0) {
                    this.addStar()
                    this.starsFrameCount = 0
                }
                
                if (this.obstacles.length <= 0 && this.score >= 70) { 
                    this.addObstacle()
                }

                if (this.oneup.length <= 0 && this.score >= 10 && this.lives <= 2) {
                    this.addOneup()
                }

                this.clear();
                this.draw();
                this.move();
                this.loseLives();
                this.drawScore();
                this.increaseDifficulty();

                this.starsFrameCount++
                

            }, this.fps)
        }

    }

    clear(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.staticStars = this.staticStars.filter(star => star.staticExists === true)

        this.rightStars = this.rightStars.filter(star => star.xRight + star.width > -1)        
        this.rightStars = this.rightStars.filter(star => star.rightExists === true)

        this.leftStars = this.leftStars.filter(star => star.xLeft < (this.ctx.canvas.width + 1))
        this.leftStars = this.leftStars.filter(star => star.leftExists === true)        
        
        this.obstacles = this.obstacles.filter(obstacle => obstacle.x < (this.ctx.canvas.width + 1))
        this.obstacles = this.obstacles.filter(obstacle => obstacle.exists === true)        

        const now = new Date().getTime()
        this.oneup = this.oneup.filter(oneup => now - oneup.date <= 6000)
    }

    draw() {
        this.background.draw()
        
        if (this.lives === 3) {
            this.hearts.draw3();            
        }

        if (this.lives === 2) {
            this.hearts.draw2();            
        }

        if (this.lives === 1) {
            this.hearts.draw1();            
        }

        if (this.lives === 0) {
            this.hearts.draw0();            
        }

        this.staticStars.forEach(star => star.draw())
        this.rightStars.forEach(star => star.draw())          
        this.leftStars.forEach(star => star.draw())  
        this.obstacles.forEach(obstacle => obstacle.draw())       
    }

    increaseDifficulty() {
        if (this.score > 100) {
            this.rightStars.forEach(bunny => {
                bunny.vxRight = -2
            }); 

            this.leftStars.forEach(bug => {
                bug.vxLeft = 3
            });
        }
        
        if (this.score > 150) {
            this.rightStars.forEach(bunny => {
                bunny.vxRight = -3.5
            }); 

            this.leftStars.forEach(bug => {
                bug.vxLeft = 4
            });
        }
    }

    move() {
        this.staticStars.forEach(star => star.move())
        this.rightStars.forEach(star => star.move())
        this.leftStars.forEach(star => star.move())
        this.obstacles.forEach(obstacle => obstacle.move())
    }

    addStar() {
        setTimeout(() => {
            this.staticStars.push(new Star_Static(this.ctx))            
        }, 200); 

        setTimeout(() => {
            this.rightStars.push(new Star_Right(this.ctx))
        }, 15000); 

        setTimeout(() => {
            this.leftStars.push(new Star_Left(this.ctx))            
        }, 35000);   
    }

    addObstacle() {
        this.obstacles.push(new Obstacle(this.ctx))
    }

    addOneup() {
        const date = new Date().getTime()
        this.oneup.push(new Oneup(this.ctx, date))
    }

    clickOnStar(x, y) {
        this.staticStars.forEach(star => {
           const hasClickedOnStar = star.clickOnStar(x, y);
            if(hasClickedOnStar) {
                this.score++;
                this.coinSound.currentTime = 0
                this.coinSound.play()
            }
        })

        this.rightStars.forEach(star => {
            const hasClickedOnStar = star.clickOnStar(x, y);
             if(hasClickedOnStar) {
                 this.score += 2;
                 this.bunnySound.currentTime = 0
                 this.bunnySound.play()
             }
        })

        this.leftStars.forEach(star => {
           const hasClickedOnStar = star.clickOnStar(x, y);
            if(hasClickedOnStar) {
                this.score += 3;
                this.bugSound.currentTime = 0
                this.bugSound.play()
            }
        })
        
        this.obstacles.forEach(obstacle => {
           const hasClickedOnObstacle = obstacle.clickOnObstacle(x, y);
            if(hasClickedOnObstacle) {
                this.lives--;
                this.hurtSound.currentTime = 0
                this.hurtSound.play()
            }
        })
    }

    loseLives() {
        this.rightStars.forEach(star => {
            if(star.xRight + star.width < 0) {
                this.lives--
                this.hurtSound.currentTime = 0
                this.hurtSound.play()
            }
        })

        this.leftStars.forEach(star => {
            if(star.xLeft > this.ctx.canvas.width) {
                this.lives--
                this.hurtSound.currentTime = 0
                this.hurtSound.play()
            }
        })

        if (this.lives === 0) {
            this.gameOver()
        }

        if (this.staticStars.length >= 6) {
            this.gameOver()
        }
    }

    drawScore() {
        this.ctx.save()

        this.ctx.fillStyle = 'white'
        this.ctx.font = 'bold 22px sans-serif'
        this.ctx.shadowColor = 'black'
        this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = 2.5
        this.ctx.shadowBlur = '6'

        this.ctx.strokeText(`Score: ${this.score} points`, 50, 50) 
        this.ctx.fillText(`Score: ${this.score} points`, 50, 50) 
        // this.ctx.fillText(`Lives: ${this.lives}`, 80, 90)

        

        this.ctx.restore()
    }

    gameOver() {
        this.musicSound.pause();
        this.gameOverSound.play();       
        this.ctx.save()
    
        this.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.globalAlpha = 1;
    
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.font = 'bold 24px sans-serif';
        this.ctx.fillText(`Game Over`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 - 30);
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`Final score: ${this.score}`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 30);
    
        this.ctx.restore();

        setTimeout(() => {
            clearInterval(this.intervalId);
        
        }, 200); 
            
    }
}