import Scene from 'core/Scene'
import timeManager from 'utils/timeManager'

class Game {
  constructor (options) {
    const {
      width,
      height,
      centered,
      root
    } = options

    this.setWidth = width || null
    this.setHeight = height || null
    this.scale = 1
    this.centered = centered
    this.bindedResize = this.resize.bind(this)
    this.bindedLoop = this.loop.bind(this)

    this.running = false

    this.scene = new Scene()

    this.createCanvas(root)
    this.resize()
    window.addEventListener('resize', this.bindedResize)
  }

  get width () {
    return this.setWidth || window.innerWidth
  }

  set width (val) {
    this.setWidth = val || null
  }

  get height () {
    return this.setHeight || window.innerHeight
  }

  set height (val) {
    this.setHeight = val || null
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
    this.scale = this.height / 800

    if (this.scene) {
      this.scene.camera.zoom = this.scale
    }

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
      scene.camera.zoom = this.scale
    } else {
      throw new Error('Scene not valid.')
    }
  }

  loop () {
    if (this.running) {
      requestAnimationFrame(this.bindedLoop)
    }

    timeManager.update()

    this.scene.update()

    this.render()
  }

  render () {
    const ctx = this.canvas.getContext('2d')
    ctx.fillStyle = '#f4f4d7'
    ctx.fillRect(0, 0, this.width, this.height)

    this.scene.render(ctx, this.width, this.height)
  }
}

export default Game
