class Game {
    constructor(ctx) {
        this.ctx = ctx
        
        this.background = new Background(ctx)
        this.hearts = new Hearts(ctx)
    
    // Arrays where the new items will be stored.
        this.coins = []
        this.bunnies = []
        this.bugs = []
        this.obstacles = []
        this.oneup = []

    // Player starts with 3 lives.
        this.lives = 3

        this.itemsFrameCount = 0
        this.itemsFrames = 150

        this.obstaclesFrameCount = 0
        this.obstaclesFrames = 200
        
        this.intervalId = undefined
        this.fps = 1000 / 60

        this.score = 0;

    // Background music
        this.musicSound = new Audio('./sounds/background-music.mp3')
        this.musicSound.loop = true
        this.musicSound.volume = 0.3
        this.musicSound.muted = false
    
    // SFX
        this.coinSound = new Audio('./sounds/coin.wav')
        this.coinSound.volume = 1
        this.bunnySound = new Audio('./sounds/bunny.ogg')
        this.bunnySound.volume = 0.4
        this.bugSound = new Audio('./sounds/bug.wav')
        this.bugSound.volume = 0.2
        this.hurtSound = new Audio('./sounds/hurt.ogg')
        this.hurtSound.volume = 1
        this.gameOverSound = new Audio('./sounds/gameOver.ogg')
        this.gameOverSound.volume = 0.6
    
    // Added game over image here to avoid the need to create a new class.
        this.gameOverImg = new Image()
        this.gameOverImg.src = "./images/game-over.png"

    }

    start(){    
       if(!this.intervalId){
            this.musicSound.play()
            this.musicSound.currentTime = 0        

            this.intervalId = setInterval(() => {
                if (this.itemsFrameCount % this.itemsFrames === 0) {
                    this.addItem()
                    this.itemsFrameCount = 0
                }
                
                if (this.obstacles.length <= 0 && this.score >= 70) { 
                    this.addObstacle()
                }

                if (this.oneup.length <= 0 && this.score >= 10 && this.lives <= 2) {
                    this.addOneup()
                } // NOT IMPLEMETED YET

                this.clear();
                this.draw();
                this.move();
                this.loseLives();
                this.drawScore();
                this.increaseDifficulty();

                this.itemsFrameCount++
            }, this.fps)
        }
    }

    clear(){
    // Filter rules to clear items or obstacles that have been clickled on or have disappeared from screen.
        
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.coins = this.coins.filter(coin => coin.exists === true)

        this.bunnies = this.bunnies.filter(bunny => bunny.x + bunny.width > -1)        
        this.bunnies = this.bunnies.filter(bunny => bunny.exists === true)

        this.bugs = this.bugs.filter(bug => bug.x < (this.ctx.canvas.width + 1))
        this.bugs = this.bugs.filter(bug => bug.exists === true)        
        
        this.obstacles = this.obstacles.filter(obstacle => obstacle.x < (this.ctx.canvas.width + 1))
        this.obstacles = this.obstacles.filter(obstacle => obstacle.exists === true)        

        const now = new Date().getTime()
        this.oneup = this.oneup.filter(oneup => now - oneup.date <= 6000) // NOT IMPLEMENTED YET
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

        this.coins.forEach(coin => coin.draw())
        this.bunnies.forEach(bunny => bunny.draw())          
        this.bugs.forEach(bug => bug.draw())  
        this.obstacles.forEach(obstacle => obstacle.draw())       
    }

    increaseDifficulty() {
    // This method increases difficulty by making items move progressively faster.

        if (this.score > 100) {
            this.bunnies.forEach(bunny => {
                bunny.vx = -2
            }); 

            this.bugs.forEach(bug => {
                bug.vx = 3
            });
        }
        
        if (this.score > 150) {
            this.bunnies.forEach(bunny => {
                bunny.vx = -3.5
            }); 

            this.bugs.forEach(bug => {
                bug.vx = 4
            });
        }
    }

    move() {
        this.coins.forEach(coin => coin.move())
        this.bunnies.forEach(bunny => bunny.move())
        this.bugs.forEach(bug => bug.move())
        this.obstacles.forEach(obstacle => obstacle.move())
    }

    addItem() {
    // This method adds more items with time to progressively increase difficulty.
        
        setTimeout(() => {
            this.coins.push(new Coin(this.ctx))            
        }, 1500); 

        setTimeout(() => {
            this.bunnies.push(new Bunny(this.ctx))
        }, 20000); 

        setTimeout(() => {
            this.bugs.push(new Bug(this.ctx))            
        }, 40000);   
    }

    addObstacle() {
        this.obstacles.push(new Obstacle(this.ctx))
    }

    addOneup() {
        const date = new Date().getTime()
        this.oneup.push(new Oneup(this.ctx, date))
    } // NOT IMPLEMENTED YET

    clickOnItem(x, y) {
    // This method checks if player has clicked on coordinates where items/obstacles are located inside the canvas.

        this.coins.forEach(coin => {
           const hasClickedOnItem = coin.clickOnItem(x, y);
            if(hasClickedOnItem) {
                this.score++;
                this.coinSound.currentTime = 0
                this.coinSound.play()
            }
        })

        this.bunnies.forEach(bunny => {
            const hasClickedOnItem = bunny.clickOnItem(x, y);
             if(hasClickedOnItem) {
                 this.score += 2;
                 this.bunnySound.currentTime = 0
                 this.bunnySound.play()
             }
        })

        this.bugs.forEach(bug => {
           const hasClickedOnItem = bug.clickOnItem(x, y);
            if(hasClickedOnItem) {
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
        this.bunnies.forEach(bunny => {
            if(bunny.x + bunny.width < 0) {
                this.lives--
                this.hurtSound.currentTime = 0
                this.hurtSound.play()
            }
        })

        this.bugs.forEach(bug => {
            if(bug.x > this.ctx.canvas.width) {
                this.lives--
                this.hurtSound.currentTime = 0
                this.hurtSound.play()
            }
        })

        if (this.lives === 0) {
            this.gameOver()
        }

        if (this.coins.length >= 6) {
            this.gameOver()
        }
    }

    drawScore() {
    // Prints "point" (singular) if score is 1. Prints "points" (plural) for any other number.

        if (this.score === 1) {
            this.ctx.save()

            this.ctx.fillStyle = 'white'
            this.ctx.font = 'bold 22px sans-serif'
            this.ctx.shadowColor = 'black'
            this.ctx.strokeStyle = 'black'
            this.ctx.lineWidth = 2.5
            this.ctx.shadowBlur = '6'

            this.ctx.strokeText(`Score: ${this.score} point`, 50, 50) 
            this.ctx.fillText(`Score: ${this.score} point`, 50, 50) 
        
            this.ctx.restore()

        } else {
            this.ctx.save()

            this.ctx.fillStyle = 'white'
            this.ctx.font = 'bold 22px sans-serif'
            this.ctx.shadowColor = 'black'
            this.ctx.strokeStyle = 'black'
            this.ctx.lineWidth = 2.5
            this.ctx.shadowBlur = '6'

            this.ctx.strokeText(`Score: ${this.score} points`, 50, 50) 
            this.ctx.fillText(`Score: ${this.score} points`, 50, 50) 
        
            this.ctx.restore()
        }
    }

    gameOver() {
        this.musicSound.pause();
        this.gameOverSound.play();       
        this.ctx.save()

        
        this.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.ctx.globalAlpha = 0.7;

        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.globalAlpha = 1;
        
        this.ctx.drawImage(
            this.gameOverImg,
            this.ctx.canvas.width / 2 - 200,
            this.ctx.canvas.height / 2 - 150,
            400,
            150
        )

        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.font = 'bold 24px sans-serif';
        this.ctx.fillText(
            `Final score: ${this.score}`,
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2 + 70
            );
    
        this.ctx.restore();

    // Timeout to give the loseLives function time to draw the "no hearts" image before showing the GAME OVER screen.
        setTimeout(() => {
            clearInterval(this.intervalId);
        }, 200);      
    }
}