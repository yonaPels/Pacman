'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '@'
const CHERRY = '**'

const gGame = {
    score: 0,
    isOn: false
}


var gBoard
var gIsSuperMode
var gCherryInterval
var gScorePotential

function onInit() {
    gGame.isOn = true
    gIsSuperMode = false
    console.log('hello')
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gCherryInterval = setInterval(addCherry, 15000)
    gScorePotential = 56

}

function buildBoard() {
    const size = 10
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = board[1][8] = board[8][1] = board[8][8] = SUPER_FOOD
    return board
}

function updateScore(diff) {
    // DONE: update model and dom
    // Model
    gGame.score += diff
    if (gGame.score === gScorePotential) gameDan()
    // DOM
    const elScore = document.querySelector('.score')
    elScore.innerText = gGame.score

}

function gameOver() {
    clearInterval(gCherryInterval)
    clearInterval(gIntervalGhosts)
    console.log('Game Over')
    gGame.isOn = false
    displayPlayAgainButton()
    renderCell(gPacman.location, '🪦')
    gGame.isOn = false
}

function displayPlayAgainButton() {
    const elGameOver = document.querySelector('.game-over')
    elGameOver.classList.remove('hide')
}

function hidePlayAgainButton() {
    const elGameOver = document.querySelector('.game-over')
    elGameOver.classList.add('hide')
}

function displayVictoryMsg() {
    const elGameDone = document.querySelector('.game-done')
    elGameDone.classList.remove('hide')
}

function hideVictoryMsg() {
    const elGameDone = document.querySelector('.game-done')
    elGameDone.classList.add('hide')
}

function gameDan() {
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gGame.isOn = false
    displayVictoryMsg()
    displayPlayAgainButton()
    renderCell(gPacman.location, '👑')
}

function onPlayAgain() {
    hidePlayAgainButton()
    hideVictoryMsg()
    gGame.score = 0
    onInit()
}

function superMode() {
    gIsSuperMode = true
    setTimeout(() => { gIsSuperMode = false }, 5000)
}

function addCherry() {
    const randomPos = getRandomPos()
    if (!randomPos) return
    gScorePotential += 10
    gBoard[randomPos.i][randomPos.j] = CHERRY
    renderCell(randomPos, CHERRY)
}
addCherry()