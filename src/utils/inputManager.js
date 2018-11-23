import controls from 'config/controls'

class InputManager {
  constructor (controls) {
    this.keys = {}
    this.scheme = InputManager.createScheme(controls)
    this.events = {}

    this._keyDown = this.keyDown.bind(this)
    this._keyUp = this.keyUp.bind(this)

    window.addEventListener('keydown', this._keyDown)
    window.addEventListener('keyup', this._keyUp)
  }

  static createScheme (controls) {
    const inverse = Object.keys(controls).reduce((scheme, key) => {
      const keyCode = controls[key]
      let add

      if (Array.isArray(keyCode)) {
        add = keyCode.reduce((acc, val) => ({
          ...acc,
          [val]: key
        }), {})
      } else {
        add = {
          [controls[key]]: key
        }
      }

      return {
        ...scheme,
        ...add
      }
    }, {})

    return {
      byName: controls,
      byCode: inverse
    }
  }

  keyDown (e) {
    const keyName = this.scheme.byCode[e.keyCode]

    if (keyName) {
      e.preventDefault()
    }

    if (keyName in this.events) {
      this.events[keyName]()
    }

    this.keys[keyName] = true
  }

  keyUp (e) {
    const keyName = this.scheme.byCode[e.keyCode]

    delete this.keys[keyName]
  }

  isKeyDown (keyName) {
    return keyName in this.keys
  }

  addEvent (keyName, eventHandler) {
    if (typeof eventHandler !== 'function') {
      throw new Error('Event handler is not a function.')
    } else if (this.scheme.byName[keyName]) {
      this.events[keyName] = eventHandler
    } else {
      throw new Error('Event key not found.')
    }
  }
}

const inputManager = new InputManager(controls)
window.input = inputManager

export default inputManager
