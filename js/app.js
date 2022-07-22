import shapes from "./shapes.js";

const gameBoard = document.querySelector(".game-board > ul")

const gameRows = 20;
const gameCols = 10;


//Define a initial value of block
let initialBlock 
let duration = 500;
let moveDownInterval;

// Create an object of movingBlock
const movingBlock =  {
        type :'',
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
    
    for (let i=0; i<gameRows; i++) {
        appendNewLine()
    }
    // renderBlocks()
    generateNewBlock()

}

function appendNewLine() {
    const rows = document.createElement('li')
    const cols = document.createElement('ul')
    for (let j=0; j<gameCols; j++) {
        const cube = document.createElement('li')
        cols.prepend(cube)
    }
    rows.prepend(cols)
    gameBoard.prepend(rows)

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
    shapes[type][direction].some(shape => {
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
        // console.log('target',target)
    
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
            // use .some(), if one li of shape's == !target, last 3 does not move $$ return to renderBlock
            return true
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
    removeMatchedLine() 
    // generateNewBlock()
}

function removeMatchedLine(){
    const childNodes = gameBoard.childNodes
   
    childNodes.forEach(child => {
       console.log({child})
        let matched = true
        child.children[0].childNodes.forEach(li=> {
            if(!li.classList.contains("freezed")) {
            matched = false
             }
        })
        if(matched) {
            child.remove()
            appendNewLine()
            // score += 10;
            // gameScore.innerText = score;
        }
    })
    generateNewBlock()

}

// change the direction 
function changeDirection(){
    initialBlock.direction += 1
    if(initialBlock.direction === 4) {
        initialBlock.direction =0
    }
    renderBlocks()
}

// make a new block when a block is freezed at the bottom
function generateNewBlock() {
    // move blokcs down
    clearInterval(moveDownInterval)
    moveDownInterval = setInterval(()=>{
        moveBlock('top',1)
    }, duration)
    //create a random block type
    // the key&value pair of object 'shapes' => array
    // console.log(Object.entries(shapes))
    const shapesArr= Object.entries(shapes)
    const randomShapes = Math.floor(Math.random()*shapesArr.length)
    // console.log(shapesArr[randomShapes])

    movingBlock.type = shapesArr[randomShapes][0]
    movingBlock.left = 3 
    movingBlock.top = 0
    movingBlock.direction = 0
    initialBlock = {...movingBlock}
    renderBlocks()
}

// control the falling rate of block with spacebar keye
function dropBlock(){
    clearInterval(moveDownInterval)
    moveDownInterval = setInterval(()=>{
        moveBlock("top",1)
    }, 10)
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
        case 32:
            dropBlock();
            break;
        default:
            break;
    }
    // console.log(e)
})