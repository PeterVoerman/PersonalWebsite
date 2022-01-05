export default class FractralTree {
  init(p5, treeHeight, width, height) {
    this.treeHeight = treeHeight
    this.p5 = p5
    this.width = width
    this.height = height

    this.treeCounter = 0
    this.treeCoords = []
    this.lengthIncrement = 1.6 * height / (treeHeight ** 2)
  }

  calculateCoords(x, y, angle, length, counter) {
    let angle1 = angle + Math.random() * (0.1 + counter / 80) * Math.PI
    let angle2 = angle - Math.random() * (0.1 + counter / 80) * Math.PI

    let newLength = length - this.lengthIncrement

    let coords1 = this.newCoords(x, y, angle1, newLength)
    let coords2 = this.newCoords(x, y, angle2, newLength)

    this.treeCoords.push([x, y, coords1[0], coords1[1], counter])
    this.treeCoords.push([x, y, coords2[0], coords2[1], counter])

    counter += 1

    if (counter < this.treeHeight) {
      this.calculateCoords(coords1[0], coords1[1], angle1, newLength, counter)
      this.calculateCoords(coords2[0], coords2[1], angle2, newLength, counter)
    }
  }

  newCoords(x, y, angle, length) {
    let xEnd = x + Math.cos(angle) * length
    let yEnd = y + Math.sin(angle) * length
    
    return [xEnd, yEnd]
  }

  draw() {
    this.treeCoords.forEach((coord) => {
      //console.log(coord)
      this.drawLine(coord[0], coord[1], coord[2], coord[3], coord[4])
    })
  }

  drawLine(x, y, xEnd, yEnd, counter) {
    let width = this.treeHeight - counter
    this.p5.strokeWeight(width)
    this.p5.stroke(this.colors[counter])
    this.p5.line(x, y, xEnd, yEnd)
  }

  reset() {
    this.treeCoords = []
    this.treeCounter++
  }


  setColors(colors) {
    this.colors = colors
    console.log(colors)
  }
}