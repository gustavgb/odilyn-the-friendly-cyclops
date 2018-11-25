import SceneObject from 'base/SceneObject'
import timeManager from 'utils/timeManager'

class DynamicObject extends SceneObject {
  constructor (x, y, w, h) {
    super('dynamic', x, y, w, h)

    this.vX = 0
    this.vY = 0
    this.blocked = false

    this.grounded = false
  }

  update () {
    if (!this.grounded) {
      this.vY += 1000 * this.deltaTime
    } else if (this.grounded && this.vY !== 0) {
      this.vY = 0
    }

    if (!this.blocked) {
      this.x += this.vX * this.deltaTime
    } else {
      this.vX = 0
    }
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

  get normalizedVX () {
    return this.vX !== 0 ? (this.vX / Math.abs(this.vX)) : 0
  }

  get normalizedVY () {
    return this.vY !== 0 ? (this.vY / Math.abs(this.vY)) : 0
  }
}

export default DynamicObject
