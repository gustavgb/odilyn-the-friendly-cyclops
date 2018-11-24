import SceneObject from 'base/SceneObject'

class WalkableObject extends SceneObject {
  constructor (x, y, w, h) {
    super('walkable', x, y, w, h)
  }

  getHeightAtPosition (x, y, margin) { return null }
}

export default WalkableObject
