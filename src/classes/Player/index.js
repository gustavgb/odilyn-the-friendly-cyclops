import imageLoader from 'tools/imageLoader'
import Animation from 'classes/Animation'
import SceneObject from 'classes/SceneObject'

const eyes = imageLoader.addImage('playerEyes', require('./images/eyes.png'))
const pupils = imageLoader.addImage('playerEyes', require('./images/pupils.png'))

const walkImages = imageLoader.addImages([
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

class Player extends SceneObject {
  constructor (x, y) {
    super()

    this.x = x
    this.y = y
    this.w = 190
    this.h = 243

    this.eyesOffsetX = 20
    this.eyesOffsetY = -30
    this.eyesWidth = 120
    this.eyesHeight = 57

    this.animation = new Animation(walkImages, 2)
  }

  update () {
    this.animation.update()
  }

  render (ctx) {
    const halfWidth = this.w / 2
    const halfHeight = this.h / 2
    const halfEyeWidth = this.eyesWidth / 2
    const halfEyeHeight = this.eyesHeight / 2

    ctx.save()
    ctx.translate(this.x + halfWidth, this.y + halfHeight)
    ctx.drawImage(this.animation.getImage().image, -halfWidth, -halfHeight, this.w, this.h)
    ctx.drawImage(eyes.image, this.eyesOffsetX - halfEyeWidth, this.eyesOffsetY - halfEyeHeight, this.eyesWidth, this.eyesHeight)
    ctx.drawImage(pupils.image, this.eyesOffsetX - halfEyeWidth, this.eyesOffsetY - halfEyeHeight, this.eyesWidth, this.eyesHeight)
    ctx.restore()
  }
}

export default Player
