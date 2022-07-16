const gameBoard = document.querySelector(".game-board > ul")

for (let i=0; i<20; i++) {
    const rows = document.createElement('li')
    const cols = document.createElement('ul')
    for (let j=0; j<10; j++) {
        const cube = document.createElement('li')
        cols.appendChild(cube)
    }
    rows.appendChild(cols)
    gameBoard.appendChild(rows)
}

console.log(gameBoard)