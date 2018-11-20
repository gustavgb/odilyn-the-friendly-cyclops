class Animation {
  constructor (images, delay = 5) {
    this.images = images
    this.delay = delay
    this.counter = 0

    this.state = 0

    this.paused = false
  }

  start () {
    this.paused = false
  }

  pause () {
    this.paused = true
  }

  update () {
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

  getImage () {
    return this.images[this.state]
  }
}

export default Animation
