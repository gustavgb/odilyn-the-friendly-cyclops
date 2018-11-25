import Player from 'objects/Player'
import Terrain from 'objects/Terrain'
import Image from 'objects/Image'
import Wall from 'objects/Wall'
import Platform from 'objects/Platform'
import Scene from 'core/Scene'

const background = new Image('bg', require('./home/bg.png'), -140, 30, 1.5, 'black')

const terrain = new Terrain([
  0, 500,
  300, 500,
  880, 490
])

const player = new Player(150, 470)
player.name = 'Player'

window.player = player
window.terrain = terrain

const scene = new Scene([
  background,
  terrain,
  new Platform(55, 470, 190, 30),
  new Wall(-30, 0, 30, 600),
  new Wall(870, 0, 30, 600),
  player
], {
  follow: 'Player'
})

export default scene
