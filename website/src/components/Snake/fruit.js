export default class Fruit {
    constructor(width, height, size, p5) {
        this.x = 0
        this.y = 0
        this.p5 = p5
        this.size = size
        this.width = width / size
        this.height = height / size
        this.newLocation({"body":[], "xCoords":[], "yCoords":[]})
    }


    draw() {
        this.p5.fill(0, 255, 0)
        this.p5.square(this.x * this.size, this.y * this.size, this.size)
    }

    newLocation(snake) {
        let possibleCoords = []

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (!snake.xCoords.includes(i) && !snake.yCoords.includes(j)) {
                    possibleCoords.push({"x":i, "y":j})
                }
            }
        }

        let coord = parseInt(this.p5.random(possibleCoords.length))
        this.x = possibleCoords[coord]["x"]
        this.y = possibleCoords[coord]["y"]
    }
}