import WalkableObject from 'base/WalkableObject'

class Terrain extends WalkableObject {
  constructor (terrainData = []) {
    super()

    if (Terrain.validateData(terrainData)) {
      this.index = Terrain.createIndex(terrainData)
      this.data = terrainData
    } else {
      throw new Error('Terrain data invalid.')
    }
  }

  static validateData (data) {
    return Array.isArray(data) && data.length % 2 === 0 && (data.length > 2 || data.length === 0) && data.filter(d => !isNaN(d)).length === data.length
  }

  static createIndex (data) {
    const lines = []
    for (let i = 0; i < data.length - 1; i += 2) {
      lines.push({
        start: {
          x: Math.floor(data[i]),
          y: Math.floor(data[i + 1])
        },
        end: {
          x: Math.floor(data[i + 2]),
          y: Math.floor(data[i + 3])
        }
      })
    }

    const lineIndex = lines.reduce((index, line) => {
      const dX = line.end.x - line.start.x
      const dY = line.end.y - line.start.y
      const a = dY / dX
      const b = line.start.y
      const func = (position) => a * position + b

      for (let x = line.start.x; x <= line.end.x; x++) {
        index[x] = index[x] || []

        index[x].push(func(x - line.start.x))

        index[x].sort()
      }

      return index
    }, [])

    return lineIndex
  }

  getHeightAtPosition (objX, objY, margin = 1000) {
    const x = objX - this.x
    const y = objY - this.y

    if (this.index && x < this.index.length && x > 0) {
      return this.index[Math.round(x)].filter(h => y >= h && y <= h + margin)[0]
    }

    return null
  }

  render (ctx) {
    if (this.data.length <= 2) {
      return
    }

    ctx.beginPath()
    ctx.moveTo(this.data[0], this.data[1])

    for (let i = 2; i < this.data.length; i += 2) {
      ctx.lineTo(this.data[i], this.data[i + 1])
    }

    ctx.strokeStyle = 'black'
    ctx.lineWidth = 3
    ctx.lineJoin = 'round'
    ctx.stroke()
  }
}

export default Terrain
