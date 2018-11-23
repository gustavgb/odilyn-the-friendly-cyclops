import Player from 'objects/Player'
import Terrain from 'core/Terrain'
import Scene from 'core/Scene'

const terrain = new Terrain([
  [0, 500, 800, 500]
])

const player = new Player(0, 0)

const scene = new Scene([
  terrain,
  player
])

export default scene
