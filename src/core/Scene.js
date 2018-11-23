import SceneObject from 'core/SceneObject'

class Scene {
  constructor (objects = []) {
    this.objects = []

    objects.forEach(obj => this.addObject(obj))
  }

  addObject (obj) {
    if (obj instanceof SceneObject) {
      this.objects.push(obj)
    } else {
      console.warn('Tried to add scene object, but recieved invalid object')
    }
  }

  update () {
    this.objects.forEach(obj => obj.update())
  }

  render (ctx) {
    this.objects.forEach(obj => obj.render(ctx))
  }
}

export default Scene
