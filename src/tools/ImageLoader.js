class ImageObject {
  constructor (name, path) {
    this.loaded = false

    this.image = new window.Image()
    this.image.src = path

    this.image.onload = this.onLoad.bind(this)
  }

  onLoad () {
    this.loaded = true
  }
}

class ImageLoader {
  constructor () {
    this.images = {}
  }

  getList () {
    return Object.keys(this.images).map(key => this.images[key])
  }

  addImage (name, path) {
    if (!name || !path) {
      throw Error('Tried to add image, but missing name or path!')
    }

    const img = new ImageObject(name, path)

    this.images[name] = img
  }
}

window.imageLoader = new ImageLoader()
