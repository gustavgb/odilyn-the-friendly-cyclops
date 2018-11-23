class TimeManager {
  constructor () {
    this.deltaTime = 0
    this.lastTime = Date.now()
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
