import timeManager from 'utils/timeManager'

class SceneObject {
  constructor (type = 'dynamic') {
    this.x = 0
    this.y = 0
    if (type === 'dynamic') {
      this.w = 0
      this.h = 0
      this.vX = 0
      this.vY = 0
    }
  }

  update () {}
  render () {}

  get deltaTime () {
    return timeManager.getDeltaTime()
  }

  set deltaTime (val) {
    throw new Error('Cannot set sceneObject.deltaTime')
  }
}

export default SceneObject
