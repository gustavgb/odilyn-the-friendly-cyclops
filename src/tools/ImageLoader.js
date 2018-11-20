class ImageObject {
  constructor (name, path) {
    this.loaded = false

    this.image = new Image()
    this.image.src = path

    this.image.onload = this.onLoad.bind(this)

    this.path = path
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
      throw new Error('Tried to add image, but missing name or path!')
    }

    const img = new ImageObject(name, path)

    this.images[name] = img

    return img
  }

  addImages (images) {
    return images.map(image => this.addImage(image.name, image.path))
  }
}

export default new ImageLoader()
