import Player from 'objects/Player'
import Terrain from 'base/Terrain'
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

const player = new Player(0, 0)

const scene = new Scene([
  player
], terrain)

export default scene
