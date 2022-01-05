export default class FractralTree {
  initP5(p5, height) {
    this.p5 = p5
    this.height = height
  }

  initTree(treeHeight, animationTime) {
    this.treeHeight = treeHeight
    this.treeCounter = 0
    this.treeCoords = []
    this.lengthIncrement = 1.6 * this.height / (treeHeight ** 2)
    this.animationCounter = 0
    this.nBranches = Math.pow(2, treeHeight+1)
    this.branchesPerFrame = this.nBranches / (60 * animationTime)
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
    if (this.animationCounter === -1) {
      this.treeCoords.forEach((coord) => {
        this.drawLine(coord[0], coord[1], coord[2], coord[3], coord[4])
      })
    } else {
      console.log(this.animationCounter)
      this.treeCoords.slice(this.animationCounter, this.animationCounter + this.branchesPerFrame).forEach((coord) => {
        this.drawLine(coord[0], coord[1], coord[2], coord[3], coord[4])
      })
    }
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
  }
}