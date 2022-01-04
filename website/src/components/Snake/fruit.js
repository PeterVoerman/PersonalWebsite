export default class Fruit {
    constructor(width, height, size, p5) {
        this.x = 0
        this.y = 0
        this.p5 = p5
        this.size = size
        this.width = width / size
        this.height = height / size
        this.newLocation({"body":[]})
    }


    draw() {
        this.p5.fill(0, 255, 0)
        this.p5.square(this.x * this.size, this.y * this.size, this.size)
    }

    newLocation(snake) {
        this.x = this.p5.floor(this.p5.random(0, this.width))
        this.y = this.p5.floor(this.p5.random(0, this.height))
        
        let inBody = false
        snake.body.forEach((bodyPart) => {
            if (this.x === bodyPart.x && this.y === bodyPart.y) {
                inBody = true
            }
        })

        while (inBody) {
            inBody = false
            snake.body.forEach((bodyPart) => {
                if (this.x === bodyPart.x && this.y === bodyPart.y) {
                    inBody = true
                }
            })
        }
    }
}