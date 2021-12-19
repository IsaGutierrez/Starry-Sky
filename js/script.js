window.onload = function() {
    const canvas = document.getElementById('my-canvas')
    const ctx = canvas.getContext('2d')

    const game = new Game(ctx)

    const startButton = document.getElementById('start-button')
    
    if (startButton.classList.contains("start")) {
        startButton.onclick = function() {
            game.start();
            startButton.innerHTML = "Restart"
            startButton.classList.remove("start")
            startButton.classList.add("restart")
        }

    } if (startButton.classList.contains("restart")) {
            startButton.onclick = function() {
                window.location.reload()      
        }
    }

    // const restartButton = document.getElementById("restart-button")

    // restartButton.onclick = function() {
    //     window.location.reload()
    // }


    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 32) {
            game.start()
            startButton.innerHTML = "Restart"
        }
    })



    




    

    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        game.clickOnItem(x, y)
    }
    
    canvas.addEventListener('mousedown', function(event) {
        getCursorPosition(canvas, event)
    })

    const musicButton = document.getElementById('music')

    musicButton.onclick = function() {
        if (musicButton.classList.contains("on")) {
            game.musicSound.volume = 0;
            musicButton.innerHTML = "Music: OFF";
            musicButton.classList.remove('on');
        }

        else {
            game.musicSound.volume = 0.3;
            musicButton.innerHTML = "Music: ON";
            musicButton.classList.add('on');
        }
    }

    const sfxButton = document.getElementById('sfx')

    sfxButton.onclick = function() {
        if (sfxButton.classList.contains("on")) {
            game.coinSound.volume = 0
            game.bunnySound.volume = 0
            game.bugSound.volume = 0
            game.hurtSound.volume = 0
            game.gameOverSound.volume = 0
            sfxButton.innerHTML = "SFX: OFF";
            sfxButton.classList.remove('on');
        }

        else {
            game.coinSound.volume = 1
            game.bunnySound.volume = 0.4
            game.bugSound.volume = 0.3
            game.hurtSound.volume = 1
            game.gameOverSound.volume = 0.6
            sfxButton.innerHTML = "SFX: ON";
            sfxButton.classList.add('on');
        }
    }

    const modal = document.getElementById("modal");
    const modalBtn = document.getElementById('instructions-btn');
    const span = document.getElementsByClassName("close")[0];

    modalBtn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none"
        }
    }



}