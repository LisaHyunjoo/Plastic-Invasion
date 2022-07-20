const gameBoard = document.querySelector(".game-board > ul")

const gameRows = 20;
const gameCols = 10;

const shapes = {
            //change the block's shape in 4 ways with arrow keys
    tShape: [ //represent coordinates (values of x & y)
        [[2,1], [0,1], [1,0], [1,1]], 
        [],
        [],
        [],
    ]
}

//Create the class of Block
class Block {
    constructor(type, direction, top, left) {
        this.type = 'tShape'
        this.direction = 0
        this.top = 0
        this.left = 3
    }
}

//Define a initial value of block
const initialBlock = new Block
// console.log(initialBlock)
//Define a value of moving block
const movingBlock = new Block
// movingBlock.left=3
// console.log(movingBlock)


init()

function init() {
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
    // take the value of initial block
    initialType =  initialBlock.type;
    initialDirection = initialBlock.direction
    initialTop = initialBlock.top
    initialLeft =  initialBlock.left
    
    console.log(initialType, initialDirection, initialTop, initialLeft )

    //remove the unmoved blocks
    const movingBlocks = document.querySelectorAll(".moving")
    // console.log(movingBlocks)
    movingBlocks.forEach(moving => {
        moving.classList.remove(initialType,'moving')
    console.log(moving)
    })
        
    // take a block's type and coordinates of direction
    // console.log(shapes[initialType][initialDirection])

    //iterate the block's type and coordinates 
    shapes[initialType][initialDirection].forEach(block => {
    //first element in the array(=column), move the block by the value of left/top
    const x = block[0] + initialLeft
    //second element in the array(row)
    const y = block[1] + initialTop

    //Create the target inside the gameBoard object using coordinates(childnodes)to add the class of type
    // console.log({gameBoard}) 
    const target = gameBoard.childNodes[y].childNodes[0].childNodes[x]
    // console.log(target)
    //add a class to target
    //give a class to remove unmoved block
    target.classList.add(initialType, "moving")
    // console.log(target)
})  
}



// Define a moveBlock function having parameter to move left or right
function moveBlock(move, amount) {
    initialBlock[move] += amount
    renderBlocks()
}


//event handling for  key control 
document.addEventListener('keydown', e => {
    switch(e.keyCode){
        //right arrow key -- add space 1 to left
        case 39:
            moveBlock("left",1);
            break;
        //left arrow key -- remove space 1 to left
        case 37:
            moveBlock("left", -1);
            break;
        //down arra key == add space 1 to top
        case 40:
            moveBlock("top", 1);
            break;
        default:
            break;
    }
    // console.log(e)
})