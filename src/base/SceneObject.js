import timeManager from 'utils/timeManager'

class SceneObject {
  constructor (type = 'static') {
    this.type = type
    this.x = 0
    this.y = 0
    this.w = 1
    this.h = 1
    if (type === 'dynamic') {
      this.vX = 0
      this.vY = 0

      this.grounded = false
    }
  }

  update () {
    if (this.type === 'dynamic' && !this.grounded) {
      this.vY += 1000 * this.deltaTime
    } else if (this.grounded && this.vY !== 0) {
      this.vY = 0
    }
  }

  render () {}

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

  set deltaTime (val) {
    throw new Error('Cannot set sceneObject.deltaTime')
  }
}

export default SceneObject
