import { CELLS, CELL_WIDTH } from './constants.js'

export const index = (col, row) => {
    if(col < 0 || row < 0 || col > CELLS - 1 || row > CELLS - 1) return -1
    return col + row * CELLS
}
