import SceneObject from 'base/SceneObject'
import assetManager from 'utils/assetManager'

class Image extends SceneObject {
  constructor (name, path, x, y, bgColor = null) {
    super('static', x, y)

    this.scale = 600 / 2160
    this.bgColor = bgColor

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

    if (this.bgColor) {
      const viewport = this.scene.viewport

      ctx.fillStyle = this.bgColor
      ctx.fillRect(viewport.x, viewport.y, viewport.w, viewport.h)
    }

    if (this.scene.debugging) {
      ctx.save()
      ctx.globalAlpha = 0.5
    }

    ctx.drawImage(this.image.image, this.x, this.y, this.w, this.h)

    if (this.scene.debugging) {
      ctx.restore()
    }
  }
}

export default Image
