const gameBoard = document.querySelector(".game-board > ul")

const gameRows = 20;
const gameCols = 10;

const shapes = {
    //change the block's shape in 4 ways with arrow keys
    //represent coordinates (values of x & y)
            tShape: [ 
                [[1,0], [0,1], [1,1], [2,1]],
                [[1,0], [0,1], [1,1], [1,2]], 
                [[2,1], [0,1], [1,1], [1,2]],
                [[2,1], [1,2], [1,1], [1,0]]
                ]
    
}

//Define a initial value of block
let initialBlock 

// Create an object of movingBlock
const movingBlock =  {
        type :'tShape',
        direction : 0, //change the shapes with arrow keys
        top : 0, // up and down
        left : 3 //left and right
}

init()

function init() {
    initialBlock = {...movingBlock} //if the value of initial Block is not correct, return to the value of moving Block.
    // console.log('initialBlock', initialBlock)
    // movingBlock.left=3
    // console.log('movingBlock', movingBlock)
    createBoard()
    renderBlocks()
}

function createBoard () {
    for (let i=0; i<gameRows; i++) {
        const rows = document.createElement('li')
        const cols = document.createElement('ul')
        for (let j=0; j<gameCols; j++) {
            const cube = document.createElement('li')
            cols.prepend(cube)
        }
        rows.prepend(cols)
        gameBoard.prepend(rows)
    }
}

function renderBlocks(moveDirection="") {
    // take the value of initial block from moving block using const destructuring assignment
    const {type, direction, top, left} = initialBlock;
    // console.log('initial Block',initialBlock )

    //remove the unmoved blocks
    const removeBlocks = document.querySelectorAll(".moving")
    // console.log(movingBlocks)
    removeBlocks.forEach(moving => {
        moving.classList.remove(type,'moving')
        // console.log('moving',moving)
    })
        
    // take a block's type and coordinates of direction
    // console.log(shapes[initialType][initialDirection])

    //Access to shapes array to find the block's shapes & coordinate's of direction, and iterate it.
    //forEach => .some()
    // console.log('coordinates',shapes[type][direction])
    shapes[type][direction].forEach(shape => {
        //Create the target inside the gameBoard object using coordinates(childnodes)to add the class of type
        // console.log('gameboard',{gameBoard}) 

        //first element in the array(=column), move the block by the value of left/top from moving block,
        const x = shape[0] + left 
        //second element in the array(row)
        const y = shape[1] + top 

        // const target = gameBoard.childNodes[y].childNodes[0].childNodes[x]
        // console.log('target', target)

        // keep the block inside the gameboard using Conditional (ternary) operator
        // if there is a value of row(y), take the value of (x,y)
        const target = gameBoard.childNodes[y]?  gameBoard.childNodes[y].childNodes[0].childNodes[x] : null;
        console.log('target',target)
    
        //create a function to check gameBoard.childNodes[y].childNodes[0].childNodes[x] has a correct value
        const isAvailable = checkEmpty(target)
        //If there's a value of target
        if(isAvailable) {
            //add a class 'type' to target
            //give a class 'moving' to remove unmoved block
            target.classList.add(type, "moving")
            // console.log(target)
        //if not, initialize the value
        } else {
            initialBlock = {...movingBlock}
            // console.log('inside render initial', initialBlock)
            // console.log('inside render moving', movingBlock)
        //to prevent the maximum call stack size, put the renderBlock() inside the setTimeout() in renderblock() => repeat!
            setTimeout(()=> {
                renderBlocks() //Maximum call stack size exceeded
                // if there's no target when the move direction is top, freezeblock.
                if(moveDirection ==="top") {
                    freezeBlock()
                }
            }, 0)
        } 
})  
movingBlock.left = left
movingBlock.top = top
movingBlock.direction = direction
}

//check if there's a target to prevent the blocks pass over the edge of game board && if there's another block at the bottom
function checkEmpty(target){
    if(!target || target.classList.contains("freezed")) {
        return false
    }
    return true
}

// Define a moveBlock function having parameter to move left or right
function moveBlock(moveDirection, amount) {
    initialBlock[moveDirection] += amount
    renderBlocks(moveDirection)
}

// To freeze the block, remove the moving class, add the freezed class
function freezeBlock() {
    const removeBlocks = document.querySelectorAll(".moving")
    removeBlocks.forEach(moving => {
       moving.classList.remove('moving')
       moving.classList.add('freezed')
    })
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
        case 38:
            changeDirection();
            break;
        default:
            break;
    }
    // console.log(e)
})