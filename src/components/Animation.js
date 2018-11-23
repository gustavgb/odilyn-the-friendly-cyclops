class Animation {
  constructor (images, delay = 5, mustFinish) {
    this.images = images
    this.delay = delay
    this.counter = 0
    this.mustFinish = true

    this.state = 0

    this.paused = false
    this.pausing = false

    this.callback = null
  }

  start () {
    this.paused = false
  }

  pause (callback) {
    if (this.mustFinish) {
      this.pausing = true
      this.callback = callback
    } else {
      this.paused = true
    }
  }

  update () {
    if (this.images.length > 0) {
      if (!this.paused) {
        this.counter++
        if (this.counter >= this.delay) {
          this.state++
          this.counter = 0

          if (this.state === this.images.length) {
            this.state = 0
          }
        }
      }
    }

    if (this.pausing && this.state === 0) {
      this.pausing = false
      this.paused = true

      if (typeof this.callback === 'function') {
        this.callback()
        this.callback = null
      }
    }
  }

  getImage () {
    return this.images[this.state]
  }
}

export default Animation
