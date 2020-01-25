import { index } from './helpers.js'

export default class Cell {
    constructor(col, row, width, p) {
        this.col = col
        this.row = row
        this.width = width
        this.x = col * width
        this.y = row * width
        this.p = p
        this.walls = {
            up: true,
            down: true,
            left: true,
            right: true
        }
        this.visited = false
    }

    show(color = 0) {

        this.p.stroke(255)

        if(this.walls.up) {
            this.p.line(this.x, this.y, this.x + this.width, this.y)
        }

        if(this.walls.down) {
            this.p.line(this.x, this.y + this.width, this.x + this.width, this.y + this.width)
        }

        if(this.walls.left) {
            this.p.line(this.x, this.y, this.x, this.y + this.width)
        }

        if(this.walls.right) {
            this.p.line(this.x + this.width, this.y, this.x + this.width, this.y + this.width)
        }

        if(this.visited) {
            this.p.noStroke()
            this.p.fill(this.p.color(color ? color : 50, 75))
            this.p.rect(this.x, this.y, this.width, this.width)
        }
    }

    getOppositeDirection(direction) {
        switch(direction) {
            case 'up':
                return 'down'
            case 'down':
                return 'up'
            case 'left':
                return 'right'
            case 'right':
                return 'left'
        }

    }

    removeWall(direction, neighbor=null) {
        this.walls[direction] = false
        if(neighbor) neighbor.removeWall(this.getOppositeDirection(direction))
    }

    getNeighbor(grid) {

        const neighbors = {
            up: grid[index(this.col, this.row - 1)],
            down: grid[index(this.col, this.row + 1)],
            left: grid[index(this.col - 1, this.row)],
            right: grid[index(this.col + 1, this.row)]
        }

        const unvisitedNeighbors = Object.keys(neighbors).map(n => neighbors[n] && !neighbors[n].visited ? n : null).filter(e => e)

        if(unvisitedNeighbors.length > 0) {
            const direction = unvisitedNeighbors[Math.floor(unvisitedNeighbors.length * Math.random())]
            const neighbor = neighbors[direction]
            this.removeWall(direction, neighbor)
            return neighbor
        }

        return null
    }
}
