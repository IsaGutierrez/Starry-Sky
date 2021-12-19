window.onload = function() {
    const canvas = document.getElementById('my-canvas')
    const ctx = canvas.getContext('2d')

    const game = new Game(ctx)

    

    document.getElementById('start-button').onclick = function() {
        game.start();
    }


    

    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        game.clickOnStar(x, y)
    }
    
    canvas.addEventListener('mousedown', function(event) {
        getCursorPosition(canvas, event)
    })

    const musicButton = document.getElementById('music')

    musicButton.onclick = function() {
        if (musicButton.classList.contains("on")) {
            game.musicSound.pause();
            musicButton.innerHTML = "Music: OFF";
            musicButton.classList.remove('on');
        }

        else {
            game.musicSound.play();
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

}