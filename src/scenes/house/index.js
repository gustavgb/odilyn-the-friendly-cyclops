import Player from 'objects/Player'
import Terrain from 'objects/Terrain'
import Image from 'objects/Image'
import Wall from 'objects/Wall'
import Scene from 'core/Scene'

const background = new Image('bg', require('./bg.png'), -140, 30)
const foreground = new Image('fg', require('./fg.png'), -140, 30)

const terrain = new Terrain([
  270, 550,
  340, 550,
  390, 555,
  440, 568,
  480, 568,
  520, 560,
  600, 530,
  800, 530,
  900, 520,
  960, 510,
  1000, 490,
  1200, 350,
  1250, 320,
  1280, 315,
  1400, 310,
  1500, 305,
  1750, 305
])

const player = new Player(600, 470)
player.name = 'Player'

window.player = player
window.terrain = terrain

const scene = new Scene([
  background,
  terrain,
  new Wall(240, 0, 30, 600),
  new Wall(1750, 0, 30, 600),
  player,
  foreground
], {
  follow: 'Player'
})

export default scene
