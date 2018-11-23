import SceneObject from 'base/SceneObject'
import Terrain from 'base/Terrain'
import timeManager from 'utils/timeManager'

class Scene {
  constructor (objects = [], terrain) {
    this.objects = []
    this.terrain = new Terrain()

    if (terrain) {
      this.setTerrain(terrain)
    }

    objects.forEach(obj => this.addObject(obj))
  }

  addObject (obj) {
    if (obj instanceof SceneObject) {
      this.objects.push(obj)
    } else {
      throw new Error('Object not valid. Must be of type SceneObject.')
    }
  }

  setTerrain (obj) {
    if (obj instanceof Terrain) {
      this.terrain = obj
    } else {
      throw new Error('Terrain not valid. Must be of type Terrain.')
    }
  }

  update () {
    this.objects.forEach(obj => obj.update())

    this.objects.forEach(obj => {
      obj.x += obj.vX * timeManager.deltaTime
      obj.y += obj.vY * timeManager.deltaTime
      const feetPos = obj.feetPosition

      if (!obj.grounded && obj.vY > 0) {
        const terrainH = this.terrain.getHeightAtPosition(feetPos.x, feetPos.y, obj.h / 2)

        if (terrainH) {
          obj.grounded = true
          obj.feetPosition = {
            x: feetPos.x,
            y: terrainH
          }
        }
      } else if (obj.grounded) {
        const terrainH = this.terrain.getHeightAtPosition(feetPos.x, feetPos.y + obj.h / 2 + obj.vY * timeManager.deltaTime, obj.h)

        if (!terrainH) {
          obj.grounded = false
        } else {
          obj.feetPosition = {
            x: feetPos.x,
            y: terrainH
          }
        }
      }
    })
  }

  render (ctx) {
    if (this.terrain) {
      this.terrain.render(ctx)
    }

    this.objects.forEach(obj => obj.render(ctx))
  }
}

export default Scene
