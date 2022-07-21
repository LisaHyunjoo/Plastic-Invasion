const shapes = {
    //change the block's shape in 4 ways with arrow keys
    square: [ //represent coordinates (values of x & y)
    [[0,0], [0,1], [1,0], [1,1]],
    [[0,0], [0,1], [1,0], [1,1]], 
    [[0,0], [0,1], [1,0], [1,1]],
    [[0,0], [0,1], [1,0], [1,1]],
    ],       

    iShape: [
    [[1,0], [2,0], [3,0], [4,0]],
    [[2,-1], [2,0], [2,1], [2,2]], 
    [[1,0], [2,0], [3,0], [4,0]],
    [[2,-1], [2,0], [2,1], [2,2]]
    ],

    tShape: [ 
    [[1,0], [0,1], [1,1], [2,1]],
    [[1,0], [0,1], [1,1], [1,2]], 
    [[2,1], [0,1], [1,1], [1,2]],
    [[2,1], [1,2], [1,1], [1,0]]
    ],

    zShape: [ 
    [[0,0], [1,0], [1,1], [2,1]],
    [[0,1], [1,0], [1,1], [0,2]], 
    [[0,1], [1,1], [1,2], [2,2]],
    [[2,0], [2,1], [1,1], [1,2]]
    ],

    leftLShape: [
    [[0,0], [0,1], [1,1], [2,1]],
    [[1,0], [1,1], [1,2], [0,2]], 
    [[0,1], [1,1], [2,1], [2,2]],
    [[1,0], [2,0], [1,1], [1,2]]
    ],

    rightLShape: [
    [[1,0], [2,0], [1,1], [1,2]],
    [[0,0], [0,1], [1,1], [2,1]], 
    [[0,2], [1,0], [1,1], [1,2]],
    [[0,1], [1,1], [2,1], [2,2]]
    ]
}
