class Camera {
  constructor (x = 0, y = 0) {
    this.zoom = 1
    this.x = x
    this.y = y

    this.offsetX = 0.5
    this.offsetY = 0.5
  }

  getViewport (width, height) {
    const zoom = this.zoom

    return {
      x: (-this.x - this.offsetX * width / zoom),
      y: (-this.y - this.offsetY * height / zoom),
      w: width / zoom,
      h: height / zoom
    }
  }

  getTranslate (width, height) {
    const zoom = this.zoom

    return {
      x: this.x * zoom + this.offsetX * width,
      y: this.y * zoom + this.offsetY * height
    }
  }

  getScale () {
    return { x: this.zoom, y: this.zoom }
  }

  follow (obj) {
    this.x = -obj.x - obj.w / 2
    this.y = -obj.y - obj.h / 2
  }
}

export default Camera
