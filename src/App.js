window.App = class App {
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

    this.createCanvas(root)
    this.resize()
    window.addEventListener('resize', this.bindedResize)
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

  render () {
    const ctx = this.canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, this.width, this.height)
  }
}
