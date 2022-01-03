export default class Snake {
    constructor(x, y, width, height, size, p5) {
        
        this.oldBody = this.body
        this.p5 = p5
        this.height = height / 50
        this.width = width / 50

        this.size = size
        this.vel = 1
        this.dir = {"x":1, "y":0}

        this.body = [{"x":x + 2, "y":y}, {"x":x + 1, "y":y}, {"x":x, "y":y}]
        
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
            
            this.p5.square(bodyPart.x * this.size, bodyPart.y * this.size, this.size)
            this.p5.fill(255)
            
        })
        
    }

    isAlive() {
        let alive = true
        
        if (this.body[0].x < 0 || this.body[0].x > this.width - 1) {
            return false
        }

        if (this.body[0].y < 0 || this.body[0].y > this.height - 1) {
            return false
        }

        this.body.slice(1,).forEach((bodyPart) => {
            if (this.body[0].x === bodyPart.x && this.body[0].y === bodyPart.y) {
                alive = false
            }
        })

        return alive
    }

    addBody() {
        this.body.push(this.oldBody[this.oldBody.length - 1])
    }



}