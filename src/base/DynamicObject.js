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
    if (this.type === 'dynamic' && !this.grounded) {
      this.vY += 1000 * this.deltaTime
    } else if (this.grounded && this.vY !== 0) {
      this.vY = 0
    }

    this.x += this.vX * this.deltaTime
    this.y += this.vY * this.deltaTime
  }

  get feetPosition () {
    if (this.type !== 'dynamic') {
      throw new Error('Feet position only available for dynamic scene objects.')
    }

    return {
      x: this.x + this.w / 2,
      y: this.y + this.h
    }
  }

  set feetPosition (position) {
    if (this.type !== 'dynamic') {
      throw new Error('Feet position only available for dynamic scene objects.')
    }

    this.x = position.x - this.w / 2
    this.y = position.y - this.h
  }

  get deltaTime () {
    if (this.type !== 'dynamic') {
      throw new Error('Delta time only available for dynamic scene objects.')
    }

    return timeManager.getDeltaTime()
  }
}

export default DynamicObject
