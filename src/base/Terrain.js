class Terrain {
  constructor (terrainData = []) {
    if (Terrain.validateData(terrainData)) {
      this.lines = Terrain.createLines(terrainData)
      this.index = Terrain.createIndex(this.lines)
    } else {
      throw new Error('Terrain data invalid.')
    }
  }

  static validateData (data) {
    return data.filter(d => Array.isArray(d) && d.length === 4).length === data.length
  }

  static createLines (data) {
    // Create equations
    const lines = data.map(line => {
      return {
        start: {
          x: line[0],
          y: line[1]
        },
        end: {
          x: line[2],
          y: line[3]
        }
      }
    })

    return lines
  }

  static createIndex (lines) {
    const lineIndex = lines.map(line => {
      const x = line.start.x - line.end.x
      const y = line.start.y - line.end.y
      const a = y / x
      const b = line.start.y

      return {
        validAfter: line.start.x,
        validBefore: line.end.x,
        equation: (position) => a * position + b
      }
    })

    return lineIndex
  }

  getHeightAtPosition (x, y, margin = 1000) {
    const h = (
      this.index.filter(line => {
        const h = line.equation(x - line.validAfter)
        return x >= line.validAfter && x <= line.validBefore && y >= h && y <= h + margin
      })
        .map(line => line.equation(x - line.validAfter))
        .sort()
    )[0]
    return h
  }

  render (ctx) {
    this.lines.forEach(line => {
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
