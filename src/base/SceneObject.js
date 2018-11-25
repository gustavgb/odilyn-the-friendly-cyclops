let counter = 0

class SceneObject {
  constructor (type = 'static', x = 0, y = 0, w = 1, h = 1) {
    this.name = 'SceneObject' + (counter++)

    this.type = type
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.scene = null
  }

  update () {}

  shouldRender () {
    if (!this.render) {
      return false
    } else if (!this.scene) {
      return true
    }

    const viewport = this.scene.viewport

    if (
      this.x <= viewport.x + viewport.w &&
      viewport.x <= this.x + this.w &&
      this.y <= viewport.y + viewport.h &&
      viewport.y <= this.y + this.h
    ) {
      return true
    }

    return false
  }
}

export default SceneObject
