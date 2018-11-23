import Player from 'objects/Player'
import Terrain from 'base/Terrain'
import Scene from 'core/Scene'

const terrain = new Terrain([
  [0, 500, 800, 500],
  [500, 400, 700, 450]
])

const player = new Player(0, 0)

const scene = new Scene([
  player
], terrain)

export default scene
