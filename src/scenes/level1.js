import Player from 'objects/Player'
import Terrain from 'objects/Terrain'
import Platform from 'objects/Platform'
import Scene from 'core/Scene'

const terrain = new Terrain([
  0, 500,
  500, 480,
  450, 400,
  600, 400,
  550, 350,
  400, 300,
  800, 300
])

const player = new Player(30, 400)
player.name = 'Player'

const platform = new Platform(300, 400, 100, 20)

window.player = player
window.terrain = terrain
window.platform = platform

const scene = new Scene([
  terrain,
  platform,
  player
], {
  follow: 'Player'
})

export default scene
