import Scene from 'classes/Scene'

class Game {
  constructor (options) {
    const {
      width,
      height,
      centered,
      root
    } = options

    this.width = width
    this.height = height
    this.centered = centered
    this.bindedResize = this.resize.bind(this)
    this.bindedLoop = this.loop.bind(this)

    this.running = false

    this.scene = new Scene()

    this.createCanvas(root)
    this.resize()
    window.addEventListener('resize', this.bindedResize)

    this.start()
  }

  createCanvas (root) {
    document.body.style.backgroundColor = '#111'

    this.canvas = document.createElement('canvas')

    if (!root) {
      root = document.body
    }

    root.appendChild(this.canvas)
  }

  resize () {
    this.canvas.width = this.width
    this.canvas.height = this.height
    if (this.centered) {
      this.canvas.style.left = (window.innerWidth - this.width) / 2
      this.canvas.style.top = (window.innerHeight - this.height) / 2
    } else {
      this.canvas.style.left = 0
      this.canvas.style.top = 0
    }

    this.render()
  }

  start () {
    this.running = true

    this.loop()
  }

  setScene (scene) {
    if (scene instanceof Scene) {
      this.scene = scene
    } else {
      console.log('Tried to set game scene, but recieved invalid scene')
    }
  }

  loop () {
    if (this.running) {
      requestAnimationFrame(this.bindedLoop)
    }

    this.scene.update()

    this.render()
  }

  render () {
    const ctx = this.canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, this.width, this.height)

    this.scene.render(ctx)
  }
}

export default Game
