class TimeManager {
  constructor () {
    this.lastTime = 0
    this.deltaTime = 0
  }

  update () {
    const now = Date.now()

    this.deltaTime = (now - this.lastTime) / 1000

    this.lastTime = now
  }

  getDeltaTime () {
    return this.deltaTime
  }
}

const timeManager = new TimeManager()

export default timeManager
