import SceneObject from 'core/SceneObject'

class Terrain extends SceneObject {
  constructor (terrainData) {
    super('static')

    if (Terrain.validateData(terrainData)) {
      this.data = Terrain.processData(terrainData)
    } else {
      throw new Error('Terrain data invalid.')
    }
  }

  static validateData (data) {
    return data.filter(d => Array.isArray(d) && d.length === 4).length === data.length
  }

  static processData (data) {
    // Create equations
    const lines = data.map(line => {
      const x = line[0] - line[2]
      const y = line[1] - line[3]
      const a = y / x
      const b = line[1]
      let wall = false
      if (a > 1) {
        wall = true
      }

      return {
        start: {
          x: line[0],
          y: line[1]
        },
        end: {
          x: line[2],
          y: line[3]
        },
        wall,
        equation: a * x + b
      }
    })

    return lines
  }

  render (ctx) {
    this.data.forEach(line => {
      ctx.beginPath()
      ctx.moveTo(line.start.x, line.start.y)
      ctx.lineTo(line.end.x, line.end.y)
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 3
      ctx.stroke()
    })
  }
}

export default Terrain
