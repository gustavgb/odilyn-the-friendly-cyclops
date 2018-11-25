import WalkableObject from 'base/WalkableObject'

class Platform extends WalkableObject {
  getHeightAtPosition (x, y, margin) {
    if (
      x <= this.x + this.w &&
      x >= this.x &&
      y <= this.y + this.h &&
      y >= this.y
    ) {
      return this.y
    }

    return null
  }

  render () {
    const ctx = this.scene.renderContext

    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x + this.w, this.y)
    ctx.lineTo(this.x + this.w * 0.8, this.y + this.h)
    ctx.lineTo(this.x + this.w * 0.2, this.y + this.h)
    ctx.lineTo(this.x, this.y)
    ctx.strokeStyle = 'black'
    ctx.stroke()
  }
}

export default Platform
