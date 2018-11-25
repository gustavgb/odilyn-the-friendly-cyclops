import SceneObject from 'base/SceneObject'
import assetManager from 'utils/assetManager'

class Image extends SceneObject {
  constructor (name, path, x, y, scale, frameColor = null) {
    super('static', x, y)

    this.scale = scale
    this.frameColor = frameColor

    this.image = assetManager.addImage('image_' + name, path)
  }

  get w () {
    return this.image.width * this.scale
  }

  get h () {
    return this.image.height * this.scale
  }

  set w (v) {}
  set h (v) {}

  render () {
    const ctx = this.scene.renderContext

    if (this.frameColor) {
      const viewport = this.scene.viewport

      ctx.fillStyle = this.frameColor

      if (this.x > viewport.x) {
        ctx.fillRect(viewport.x, viewport.y, this.x - viewport.x + 5, viewport.h)
      }

      if (this.x + this.w < viewport.x + viewport.w) {
        ctx.fillRect(viewport.x + viewport.w, viewport.y, (this.x + this.w) - (viewport.x + viewport.w) - 5, viewport.h)
      }

      if (this.y > viewport.y) {
        ctx.fillRect(viewport.x, viewport.y, viewport.w, this.y - viewport.y + 5)
      }

      if (this.y + this.h < viewport.y + viewport.h) {
        ctx.fillRect(viewport.x, viewport.y + viewport.h, viewport.w, (this.y + this.h) - (viewport.y + viewport.h) - 5)
      }
    }

    ctx.drawImage(this.image.image, this.x, this.y, this.w, this.h)
  }
}

export default Image
