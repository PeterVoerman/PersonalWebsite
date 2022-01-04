export default class Planet {
  constructor(x, y, radius, color, p5) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color

    this.p5 = p5
  }


  draw() {
    this.p5.fill(this.color)
    this.p5.circle(this.x, this.y, this.radius)
  }
}