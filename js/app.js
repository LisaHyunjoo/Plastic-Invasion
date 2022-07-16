const gameBoard = document.querySelector(".game-board > ul")

const gameRows = 20;
const gameCols = 10;

const blocks = {
            //change the block's shape in 4 ways with arrow keys
    tShape: [ //represent coordinates (values of x & y)
        [[0,1], [1,0], [1,1], [2,1]], 
        [[], [], [], []],
        [[], [], [], []],
        [[], [], [], []],
    ]
}

//block's initial value before moving
let initialBlock;

//actual value of block(type, coordinate)
const movingBlock = {
    type: "tShape",
    direction:0,
    top:0,
    left:3,
}

init()

function init() {
    //Separate the initial value of block from the value of moving block
    initialBlock = {...movingBlock}
    movingBlock.left=3
    // console.log(initialBlock)
    // console.log(movingBlock)

    createBoard()
    renderBlocks()
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

function renderBlocks() {
    //take the initial value of a block
    const {type, direction, top, left} = initialBlock;
    // console.log(type, direction, top, left )

    //take a block's type and coordinates of direction
    // console.log(blocks[type][direction])

    //iterate the block's type and coordinates 
    blocks[type][direction].forEach(block => {
        //first element in the array, move the block by the value of left/top
        const x = block[0] + left
        //second element in the array
        const y = block[1] + top
        
        //Create the target inside the gameBoard object using coordinates(childnodes)
        // console.log({gameBoard}) 
        const target = gameBoard.childNodes[y].childNodes[0].childNodes[x]
        console.log(target)
        //add a class to target
        target.classList.add(type)
    })  
}

document.addEventListener('keydown', e => {
    switch(e.keycode){
        //right arrow key -- add space 1 to left
        case 39:
            moveBlock("left",1);
            break;
        //left arrow key -- remove space 1 to left
        case 37:
            moveBlock('left', -1);
            break;
        default:
            break;
    }
    // console.log(e)
})