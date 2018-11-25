import SceneObject from 'base/SceneObject'
import timeManager from 'utils/timeManager'

class DynamicObject extends SceneObject {
  constructor (x, y, w, h) {
    super('dynamic', x, y, w, h)

    this.vX = 0
    this.vY = 0

    this.grounded = false
  }

  update () {
    if (!this.grounded) {
      this.vY += 1000 * this.deltaTime
    } else if (this.grounded && this.vY !== 0) {
      this.vY = 0
    }

    this.x += this.vX * this.deltaTime
    this.y += this.vY * this.deltaTime
  }

  get feetPosition () {
    return {
      x: this.x + this.w / 2,
      y: this.y + this.h
    }
  }

  set feetPosition (position) {
    this.x = position.x - this.w / 2
    this.y = position.y - this.h
  }

  get deltaTime () {
    return timeManager.getDeltaTime()
  }
}

export default DynamicObject
