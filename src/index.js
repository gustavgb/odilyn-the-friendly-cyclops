import Game from 'classes/Game'
import level1 from 'scenes/level1'

window.createGame = (width, height, centered) => {
  const game = new Game({
    width,
    height,
    centered,
    root: document.getElementById('root')
  })

  game.setScene(level1)

  window.game = game
}

window.Game = Game
