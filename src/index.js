import Game from 'core/Game'
import level1 from 'scenes/house'
import inputManager from 'utils/inputManager'

const game = new Game({
  root: document.getElementById('root')
})

game.setScene(level1)

game.start()

inputManager.addEvent('debug', () => {
  game.debugging = !game.debugging
  sessionStorage.setItem('debug', game.debugging)
})

game.debugging = sessionStorage.getItem('debug') === 'true' || false

window.game = game
