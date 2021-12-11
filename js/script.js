window.onload = function() {
    const canvas = document.getElementById('my-canvas')
    const ctx = canvas.getContext('2d')

    const game = new Game(ctx)

    // game.start()

    document.getElementById('start-button').onclick = function() {
        game.start();
    }

    // document.addEventListener('click', (event) => {
    //     console.log(event)
    //     game.clickOnStar()
    // })

    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        game.clickOnStar(x, y)
    }
    
    canvas.addEventListener('mousedown', function(event) {
        getCursorPosition(canvas, event)
        // game.clickOnStar(event)
    })

}