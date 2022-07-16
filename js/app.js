const gameBoard = document.querySelector(".game-board > ul")

const gameRows = 20;
const gameCols = 10;

const blocks = {
            //change the block's shape in 4 ways with arrow keys
    square: [ //represent coordinates (values of x & y)
        [[0,0], [0,1], [1,1], [1,1]], 
        [[], [], [], []],
        [[], [], [], []],
        [[], [], [], []],
    ]
}

//block's initial value before moving
let initialBlock;

//actual value of block(type, coordinate)
const movingBlock = {
    type:square,
    direction:0,
    top:0,
    left:0
}

function createBoard () {
    for (let i=0; i<gameRows; i++) {
        const rows = document.createElement('li')
        const cols = document.createElement('ul')
        for (let j=0; j<gameCols; j++) {
            const cube = document.createElement('li')
            cols.appendChild(cube)
        }
        rows.appendChild(cols)
        gameBoard.appendChild(rows)
    }
}
createBoard()
// console.log(gameBoard)