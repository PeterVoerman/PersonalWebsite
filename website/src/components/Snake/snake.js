export default class Snake {
    constructor(x, y, p5) {
        
        this.oldBody = this.body
        this.p5 = p5

        this.size = 50
        this.vel = 50
        this.dir = {"x":1, "y":0}

        this.body = [{"x":x + 2 * this.size, "y":y}, {"x":x + this.size, "y":y}, {"x":x, "y":y}]
        
    }

    move() {
        this.oldBody = JSON.parse(JSON.stringify(this.body))

        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x
            this.body[i].y = this.body[i - 1].y
        }

        this.body[0].x += this.vel * this.dir.x
        this.body[0].y += this.vel * this.dir.y
        
    }

    draw() {
        this.p5.fill(255, 0, 0)
        this.body.forEach((bodyPart) => {
            
            this.p5.square(bodyPart.x, bodyPart.y, this.size)
            this.p5.fill(255)
            
        })
        
    }

    isAlive(width, height) {
        if (this.body[0].x < 0 || this.body[0].x > width - 50) {
            return false
        }

        if (this.body[0].y < 0 || this.body[0].y > height - 50) {
            return false
        }

        return true
    }

    addBody() {
        this.body.push(this.oldBody[this.oldBody.length - 1])
    }



}