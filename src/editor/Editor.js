class Editor {
  constructor (root) {
    this.canvas = Editor.createCanvas(root)

    this.internalState = {
      level: 'test'
    }
  }

  get state () {
    return this.internalState
  }

  set state (val) {
    console.log('setting editor state')
    this.internalState = val
  }

  static createCanvas (root) {
    const canvas = document.createElement('canvas')
    canvas.width = 800
    canvas.height = 800
    root.appendChild(canvas)

    return canvas
  }
}

export default Editor
