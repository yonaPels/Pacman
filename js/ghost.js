'use strict'

const GHOST = '&#9781'
var gGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    gGhosts = []
    // DONE: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board, i)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    // console.log('move ghosts')
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // console.log('move ghost')

    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    // console.log('moveDiff:', moveDiff)
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === GHOST) return
    if (nextCell === WALL) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        (gIsSuperMode) ? removeGhst(ghost.location) : gameOver()
        return
    }

    // DONE: moving from current location:
    // DONE: update the model 
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 } // right
        case 2: return { i: 1, j: 0 } // down
        case 3: return { i: 0, j: -1 } // left
        case 4: return { i: -1, j: 0 } // up
    }
}

function getGhostHTML(ghost) {
    const color = gIsSuperMode ? 'blue' : ghost.color
    return `<span style="color:${color}">${GHOST}</span>`
}

function removeGhst(loc) {
    for (var idx = 0; idx < gGhosts.length; idx++) {
        if (gGhosts[idx].location.i === loc.i && gGhosts[idx].location.j === loc.j) {
            gGhosts.splice(idx, 1)
            renderCell({ i: loc.i, j: loc.j }, EMPTY)
        }
    }
    // console.log('ghost,loc:', ghost, loc, i)
}