import SceneObject from 'base/SceneObject'
import timeManager from 'utils/timeManager'

class Scene {
  constructor (objects = []) {
    this.walkable = []
    this.static = []
    this.dynamic = []

    objects.forEach(obj => this.addObject(obj))
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
  }

  render (ctx) {
    this.walkable.forEach(obj => obj.render(ctx))
    this.static.forEach(obj => obj.render(ctx))
    this.dynamic.forEach(obj => obj.render(ctx))
  }
}

export default Scene
