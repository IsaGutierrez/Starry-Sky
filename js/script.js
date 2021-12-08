window.onload = function() {
    const canvas = document.getElementById('my-canvas')
    const ctx = canvas.getContext('2d')

    const game = new Game(ctx)

    game.start()

    // document.getElementById('start-button').onclick = function() {
    //     game.start();
    // }


}