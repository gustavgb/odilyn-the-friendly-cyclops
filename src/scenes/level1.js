import Player from 'objects/Player'
import Terrain from 'objects/Terrain'
import Image from 'objects/Image'
import Scene from 'core/Scene'

const background = new Image('bg', require('./home/bg.png'), -140, 30, 1.5, 'black')

const terrain = new Terrain([
  0, 500,
  300, 500,
  880, 490
])

const player = new Player(30, 400)
player.name = 'Player'

window.player = player
window.terrain = terrain

const scene = new Scene([
  background,
  terrain,
  player
], {
  follow: 'Player'
})

export default scene
