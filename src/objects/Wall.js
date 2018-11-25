import BlockingObject from 'base/BlockingObject'

class Wall extends BlockingObject {
  render () {
    if (!this.scene.debugging) {
      return
    }

    const ctx = this.scene.renderContext

    ctx.strokeStyle = '#e50'
    ctx.strokeRect(this.x, this.y, this.w, this.h)
  }

  isBlocking (obj) {
    if (
      this.x < obj.x + obj.w &&
      obj.x < this.x + this.w
    ) {
      if (
        obj.vX > 0
      ) {
        return {
          blocking: true,
          correctedX: this.x - obj.w
        }
      } else if (
        obj.vX < 0
      ) {
        return {
          blocking: true,
          correctedX: this.x + this.w
        }
      }
    }

    return {
      blocking: false
    }
  }
}

export default Wall
