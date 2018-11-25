class TimeManager {
  constructor () {
    this.deltaTime = 0
    this.lastTime = Date.now()

    this.fpsCache = []
  }

  update () {
    const now = Date.now()

    this.deltaTime = (now - this.lastTime) / 1000

    this.lastTime = now
  }

  getDeltaTime () {
    return this.deltaTime
  }

  renderFPS (ctx, x, y, color = 'black') {
    if (this.deltaTime === 0) {
      return
    }

    const fps = (1 / this.deltaTime)
    this.fpsCache.push(fps)
    if (this.fpsCache.length > 10) {
      this.fpsCache.shift()
    }
    const fpsAvg = Math.round(this.fpsCache.reduce((sum, val) => sum + val, 0) / this.fpsCache.length)

    ctx.textBaseline = 'top'
    ctx.textAlign = 'left'
    ctx.font = '15px sans-serif'
    ctx.fillStyle = color
    ctx.fillText('FPS: ' + fpsAvg, x, y)
  }
}

const timeManager = window.timeManager = new TimeManager()

export default timeManager
