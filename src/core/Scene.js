import SceneObject from 'base/SceneObject'
import Camera from 'objects/Camera'
import timeManager from 'utils/timeManager'

class Scene {
  constructor (objects = [], options = {}) {
    this.walkable = []
    this.static = []
    this.dynamic = []
    this.objects = objects.map(this.assignObjectScene.bind(this))

    this.objects.forEach(obj => this.addObject(obj))

    this.camera = new Camera()

    this.follow = objects.filter(o => o.name === options.follow)[0] || null

    this.viewport = {
      x: 0,
      y: 0,
      w: 1,
      h: 1
    }
  }

  get debugging () {
    return this.game.debugging
  }

  get renderContext () {
    return this.game.renderContext
  }

  assignObjectScene (obj) {
    obj.scene = this
    return obj
  }

  addObject (obj) {
    if (obj instanceof SceneObject) {
      switch (obj.type) {
        case 'static':
          this.static.push(obj)
          break
        case 'dynamic':
          this.dynamic.push(obj)
          break
        case 'walkable':
          this.walkable.push(obj)
      }
    } else {
      throw new Error('Object not valid. Must be of type SceneObject.')
    }
  }

  update () {
    this.walkable.forEach(obj => obj.update())
    this.static.forEach(obj => obj.update())
    this.dynamic.forEach(obj => obj.update())

    this.dynamic.forEach(obj => {
      const feetPos = obj.feetPosition

      let terrainH

      if (!obj.grounded && obj.vY > 0) {
        terrainH = (this.walkable.map(groundObj => groundObj.getHeightAtPosition(feetPos.x, feetPos.y, obj.h / 2)).sort())[0]
      } else if (obj.grounded) {
        terrainH = (this.walkable.map(groundObj => groundObj.getHeightAtPosition(feetPos.x, feetPos.y + obj.h / 2 + obj.vY * timeManager.deltaTime, obj.h)).sort())[0]
      }

      obj.grounded = !!terrainH

      if (terrainH) {
        obj.feetPosition = {
          x: feetPos.x,
          y: terrainH
        }
      }
    })

    if (this.follow) {
      this.camera.follow(this.follow)
    }
  }

  render (width, height) {
    const ctx = this.renderContext
    const translate = this.camera.getTranslate(width, height)
    const scale = this.camera.getScale()

    this.viewport = this.camera.getViewport(width, height)

    ctx.translate(translate.x, translate.y)
    ctx.scale(scale.x, scale.y)

    this.objects.forEach(obj => obj.shouldRender() && obj.render())

    ctx.scale(1 / scale.x, 1 / scale.y)
    ctx.translate(-translate.x, -translate.y)

    timeManager.renderFPS(ctx, 5, 5)
  }
}

export default Scene
