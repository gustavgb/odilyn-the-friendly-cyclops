import assetManager from 'utils/assetManager'
import inputManager from 'utils/inputManager'
import Animation from 'components/Animation'
import Animator from 'components/Animator'
import DynamicObject from 'base/DynamicObject'

const eyes = assetManager.addImage('playerEyes', require('./images/eyes.png'))
const pupils = assetManager.addImage('playerEyes', require('./images/pupils.png'))

const walkImages = assetManager.addImages([
  { name: 'walk0', path: require('./images/walk0.png') },
  { name: 'walk1', path: require('./images/walk1.png') },
  { name: 'walk2', path: require('./images/walk2.png') },
  { name: 'walk3', path: require('./images/walk3.png') },
  { name: 'walk4', path: require('./images/walk4.png') },
  { name: 'walk5', path: require('./images/walk5.png') },
  { name: 'walk6', path: require('./images/walk6.png') },
  { name: 'walk7', path: require('./images/walk7.png') },
  { name: 'walk8', path: require('./images/walk8.png') },
  { name: 'walk9', path: require('./images/walk9.png') }
])

const animationScheme = {
  default: 'idle',
  walk: new Animation(walkImages, 2),
  idle: new Animation([walkImages[0]], 0)
}

class Player extends DynamicObject {
  constructor (x, y) {
    super()

    const scale = this.scale = 0.2

    this.w = 190 * scale
    this.h = 243 * scale
    this.feetPosition = {
      x,
      y
    }

    this.eyesOffsetX = 20 * scale
    this.eyesOffsetY = 30 * scale
    this.eyesX = this.eyesOffsetX
    this.eyesY = -this.eyesOffsetY
    this.eyesWidth = 120 * scale
    this.eyesHeight = 57 * scale

    this.speed = 1000

    this.animator = new Animator(animationScheme)
  }

  update () {
    let walking = false

    if (inputManager.isKeyDown('left')) {
      if (this.vX > -500) {
        this.vX -= this.speed * this.deltaTime
      }

      this.animator.setAnimation('walk')
      this.animator.flipped = true
      walking = true
    } else if (inputManager.isKeyDown('right')) {
      if (this.vX < 500) {
        this.vX += this.speed * this.deltaTime
      }

      this.animator.setAnimation('walk')
      this.animator.flipped = false
      walking = true
    } else {
      this.animator.setAnimation('idle')
    }

    if (this.grounded) {
      if (walking) {
        this.vX *= 0.98
      } else {
        this.vX *= 0.7
      }

      if (inputManager.isKeyDown('jump')) {
        this.vY = -500
        this.grounded = false
      }
    } else {
      this.vX *= 0.98
    }

    let targetX = this.eyesOffsetX
    if (this.animator.flipped) {
      targetX *= -1
    }

    this.eyesX += (targetX - this.eyesX) / 10

    this.animator.update()

    super.update()
  }

  render () {
    const ctx = this.scene.renderContext

    let offsetX = this.x + this.w / 2 + this.eyesX - this.eyesWidth / 2
    const offsetY = this.y + this.h / 2 + this.eyesY - this.eyesHeight / 2
    let pupilsOffsetX = this.scale * 5
    if (this.animator.flipped) {
      pupilsOffsetX *= -1
    }

    this.animator.render(ctx, this.x, this.y, this.w, this.h)
    ctx.drawImage(eyes.image, offsetX, offsetY, this.eyesWidth, this.eyesHeight)
    ctx.drawImage(pupils.image, offsetX + pupilsOffsetX, offsetY, this.eyesWidth, this.eyesHeight)
  }
}

export default Player
