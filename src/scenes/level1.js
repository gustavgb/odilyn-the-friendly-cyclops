import Player from 'entities/Player'
import Scene from 'core/Scene'

const player = new Player(0, 0)

const scene = new Scene([
  player
])

export default scene
