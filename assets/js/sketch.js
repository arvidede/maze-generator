import Cell from './Cell.js'
import { CELLS, CELL_WIDTH } from './constants.js'
import { index } from './helpers.js'

const Sketch = (p) => {
    const grid = []
    const stack = []
    let currentCell
    let nextCell

    p.setup = () => {
        p.createCanvas(CELLS * CELL_WIDTH + 2, CELLS * CELL_WIDTH + 2)

        for(let row = 0; row < CELLS; row++) {
            for(let col = 0; col < CELLS; col++) {
                grid.push(new Cell(col, row, CELL_WIDTH, p))
            }
        }

        currentCell = grid[Math.round(grid.length * Math.random())]
        currentCell.visited = true
        p.background(0)
        p.frameRate(500)
    };

    p.draw = () => {
        for(let cell of grid) {
            cell.show()
        }

        // Depth-first: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker

        currentCell.visited = true
        currentCell.show(100)

        nextCell = currentCell.getNeighbor(grid)

        if(nextCell) {
            stack.push(currentCell)
            currentCell = nextCell
        } else if(stack.length > 0) {
            currentCell = stack.pop()
        } else {
            p.noLoop()
        }

        p.stroke(255)
        p.noFill()
        p.rect(0, 0, CELLS * CELL_WIDTH, CELLS * CELL_WIDTH)
    };
};

export default Sketch;
