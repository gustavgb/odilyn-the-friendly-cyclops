class SceneObject {
  constructor (type = 'static', x = 0, y = 0, w = 1, h = 1) {
    this.type = type
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  update () {}

  render () {}
}

export default SceneObject
