import Animation from 'components/Animation'
import Renderer from 'core/Renderer'

class Animator extends Renderer {
  constructor (scheme) {
    super()
    if (Animator.validateScheme(scheme)) {
      this.scheme = scheme
      this.currentAnimation = scheme.default
      this.lastAnimation = scheme.default
    }
  }

  static validateScheme (scheme) {
    const keys = Object.keys(scheme)
    const keysValid = keys.filter(key => key === 'default' || scheme[key] instanceof Animation).length === keys.length
    const defaultValid = scheme[scheme.default]

    if (!keysValid) {
      throw new Error('Animator recieved invalid scheme. Not all animations are valid.')
    } else if (!defaultValid) {
      throw new Error('Animator recieved invalid scheme. Default animation not valid.')
    } else {
      return true
    }
  }

  setAnimation (animationName) {
    if (this.scheme[animationName] && animationName !== this.lastAnimation) {
      this.animation.pause(() => {
        this.currentAnimation = animationName
        this.lastAnimation = animationName
        this.animation.start()
      })
    }
  }

  get animation () {
    return this.scheme[this.currentAnimation]
  }

  set animation (val) {
    throw new Error('Cannot set animation directly. Use method setAnimation()')
  }

  update () {
    this.animation.update()
  }

  render (ctx, x, y, w, h) {
    const halfWidth = w / 2
    const halfHeight = h / 2

    ctx.save()
    ctx.translate(x + halfWidth, y + halfHeight)
    if (this.flipped) {
      ctx.scale(-1, 1)
    }
    ctx.drawImage(this.animation.getImage().image, -halfWidth, -halfHeight, w, h)
    ctx.restore()
  }
}

export default Animator
