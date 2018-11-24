import Game from 'core/Game'
import level1 from 'scenes/level1'
import inputManager from 'utils/inputManager'

const game = new Game({
  root: document.getElementById('root')
})

game.setScene(level1)

game.start()

const debug = window.debug = JSON.parse(sessionStorage.getItem('debug'))

inputManager.addEvent('debug', () => {
  if (debug) {
    location.replace('/editor')
  }
})

window.game = game
