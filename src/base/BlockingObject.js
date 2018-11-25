import SceneObject from 'base/SceneObject'

class BlockingObject extends SceneObject {
  constructor (x, y, w, h) {
    super('blocking', x, y, w, h)
  }

  isBlocing () { return false }
}

export default BlockingObject
