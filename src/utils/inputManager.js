import controls from 'config/controls'

class InputManager {
  constructor (controls) {
    this.keys = {}
    this.scheme = InputManager.createScheme(controls)

    this._keyDown = this.keyDown.bind(this)
    this._keyUp = this.keyUp.bind(this)

    window.addEventListener('keydown', this._keyDown)
    window.addEventListener('keyup', this._keyUp)
  }

  static createScheme (controls) {
    return Object.keys(controls).reduce((scheme, key) => ({
      ...scheme,
      [controls[key]]: key
    }), {})
  }

  keyDown (e) {
    const keyName = this.scheme[e.keyCode]

    this.keys[keyName] = true
  }

  keyUp (e) {
    const keyName = this.scheme[e.keyCode]

    delete this.keys[keyName]
  }

  isKeyDown (keyName) {
    return keyName in this.keys
  }
}

const inputManager = new InputManager(controls)
window.input = inputManager

export default inputManager
