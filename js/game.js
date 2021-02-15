'use strict'

const ROWS = 24;
const COLS = 14;
const EMPTY = '';

var gBoard = [];
var gPieces = [];
var gPiecesTypes = [{ // cube piece
        coords: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 }
        ],
        width: 2,
        height: 2,
        color: 'red'
    },
    { // plus piece
        coords: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 1 }
        ],
        rotationIndex: 0,
        rotations: [{
                coords: [
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 0, y: 2 },
                    { x: 1, y: 1 }
                ]
            },
            {
                coords: [
                    { x: 0, y: 1 },
                    { x: 0, y: 2 },
                    { x: -1, y: 1 },
                    { x: 1, y: 1 }
                ]
            },
            {
                coords: [
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 0, y: 2 },
                    { x: -1, y: 1 }
                ]
            },

            {
                coords: [
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: -1, y: 1 },
                    { x: 1, y: 1 }
                ]
            }
        ],
        width: 3,
        height: 2,
        color: 'green'
    },
    { // z piece
        coords: [
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 0 },
            { x: 1, y: 1 }
        ],
        rotationIndex: 0,
        rotations: [{
                coords: [
                    { x: 0, y: 1 },
                    { x: 0, y: 2 },
                    { x: 1, y: 0 },
                    { x: 1, y: 1 }
                ]
            },
            {
                coords: [
                    { x: -1, y: 0 },
                    { x: 0, y: 0 },
                    { x: -1, y: -1 },
                    { x: -2, y: -1 }
                ]
            },
            {
                coords: [
                    { x: 0, y: -1 },
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 1, y: 1 }
                ]
            },
            {
                coords: [
                    { x: -1, y: 0 },
                    { x: 0, y: 0 },
                    { x: -1, y: -1 },
                    { x: -2, y: -1 }
                ]
            }
        ],
        width: 3,
        height: 2,
        color: 'orange'
    },
    { // line piece
        coords: [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
            { x: 1, y: 3 }
        ],
        rotationIndex: 0,
        rotations: [{
                coords: [
                    { x: 1, y: 0 },
                    { x: 1, y: 1 },
                    { x: 1, y: 2 },
                    { x: 1, y: 3 }
                ]
            },
            {
                coords: [
                    { x: 1, y: 0 },
                    { x: 0, y: 0 },
                    { x: -1, y: 0 },
                    { x: -2, y: 0 }
                ]
            },
            {
                coords: [
                    { x: 1, y: 0 },
                    { x: 1, y: -1 },
                    { x: 1, y: -2 },
                    { x: 1, y: -3 }
                ]
            },
            {
                coords: [
                    { x: 1, y: 0 },
                    { x: 2, y: 0 },
                    { x: 3, y: 0 },
                    { x: 4, y: 0 }
                ]
            }
        ],
        width: 4,
        height: 1,
        color: 'purple'
    },
    { // L piece
        coords: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 },
            { x: 1, y: 0 }
        ],
        rotationIndex: 0,
        rotations: [{
                coords: [
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: -1, y: 0 },
                    { x: -2, y: 0 },
                    { x: -3, y: 0 }
                ]
            },
            {
                coords: [
                    { x: 0, y: 0 },
                    { x: 0, y: 1 },
                    { x: 0, y: 2 },
                    { x: 0, y: 3 },
                    { x: -1, y: 3 }
                ]
            },
            {
                coords: [
                    { x: 0, y: 0 },
                    { x: -1, y: 0 },
                    { x: -2, y: 0 },
                    { x: -3, y: 0 },
                    { x: -3, y: -1 }
                ]
            }
        ],
        width: 4,
        height: 2,
        color: 'deeppink'
    }
]

var gGameInterval = null;
var gGameTimeInterval = null;
var gPieceIdx = null;

var gGame = {
    score: 0,
    time: 0,
    isOn: false
};

function init() {
    gBoard = buildBoard();
    renderBoard(gBoard, '.board-container');
    gPieces = [];
    var randomIdx = getRandomIntInclusive(0, gPiecesTypes.length - 1);
    var piece = gPiecesTypes[randomIdx];
    createPiece(piece);

    resetVals();

    gGameTimeInterval = setInterval(function() {
        var elTimer = document.querySelector('.time');
        elTimer.innerHTML = `<span>${gGame.time++}</span>`;
    }, 1000)
    gGameInterval = setInterval(function() {
        var piece = gPieces[gPieceIdx];
        dropPiece(piece);
    }, 500);
}

function resetVals() {
    gGame.isOn = true;
    gGame.score = 0;
    gGame.time = 0;
    var restartBtn = document.querySelector(".restart");
    restartBtn.hidden = true;
    var dead = document.querySelector('.game-over');
    dead.hidden = true;
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < ROWS; i++) {
        board[i] = [];
        for (var j = 0; j < COLS; j++) {
            board[i][j] = EMPTY;
        }
    }
    return board;
}

// DOM board
function renderBoard() {
    var strHtml = '';
    for (var i = 0; i < ROWS; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < COLS; j++) {
            var tdId = 'cell cell-' + i + '-' + j;
            strHtml += '<td style="background: lightgray" onclick="changePieceLocation(' + i + ', ' + j + ')" class="' + tdId + '" ></td>'

        }
        strHtml += '</tr>';
    }
    var elBoard = document.querySelector('.board-container');
    elBoard.innerHTML = strHtml;
}

function changePieceLocation(i, j) {
    var currPiece = gPieces[gPieceIdx]
    var inputPosJ = j;
    currPiece.location.j = inputPosJ;
    renderBoard();
    drawPiece(currPiece);
}


function clearRow(rowToClear) {

    // run over all the rows from the bottom up
    for (var i = ROWS - 1; i >= 0; i--) {

        // run over all the columns 
        for (var j = 0; j < COLS; j++) {

            // get the cell
            var cellStr = '.cell.cell-' + i + '-' + j;
            var cell = document.querySelector(cellStr);

            // check if this is the row to clear
            if (i == rowToClear) {

                // clear the cell
                cell.style.background = "lightgray";
            }

            // check that this is a row icluding or above the current
            if (i <= rowToClear) {

                // get the cell above the current
                var upperCellStr = '.cell.cell-' + (i - 1) + '-' + j;
                var upperCell = document.querySelector(upperCellStr);

                if (upperCell !== null) {

                    // set the current cell color to be the color of the above cell
                    cell.style.background = upperCell.style.background;
                }
            }
        }
    }
}

function createPiece(piece) {
    // spawn the piece in random location
    var posX = getRandomIntInclusive(0, COLS - piece.width);
    var piece = {
        location: {
            i: 0,
            j: posX
        },
        rotationIndex: piece.rotationIndex,
        rotations: piece.rotations,
        width: piece.width,
        height: piece.height,
        color: piece.color,
        coords: piece.coords
    };
    // the index of the current piece that is falling
    gPieceIdx = gPieces.length;
    gPieces.push(piece);
    drawPiece(piece);
    return piece;
}

function drawPiece(piece) {
    var x = piece.location.i;
    var y = piece.location.j;

    for (var i = 0; i < piece.coords.length; i++) {
        var coord = piece.coords[i];
        // get the class name where className = cell cell-x-y
        var cellStr = '.cell.cell-' + (coord.x + x) + '-' + (coord.y + y);
        var cell = document.querySelector(cellStr);
        // set the background-color of the cell
        cell.style.background = piece.color;
    }
}

function dropPiece(piece) {
    // check if the piece reached the bottom limit
    if (checkForCollision(piece)) {
        pieceReachedBottom(piece);
        var ground = new Audio('sound/ground.mp3');
        ground.volume = 0.5;
        ground.play();
    } else {
        // get the previous piece color
        var previousColor = piece.color;
        // this is for erasing the previous location of the piece after falling down 1 line
        piece.color = 'lightgray';
        drawPiece(piece);
        // this drops the piece 1 line
        piece.location.i++;
        updateScore(1);
        piece.color = previousColor;
        drawPiece(piece);
    }
}

function checkForCollision(piece) {
    var isCollision = false;
    // check for collision with the top of the board
    if (piece.location.i === 0 && checkBottomColor(piece)) {
        gameOver();
        return;
    }
    // check if the piece reached the bottom limit
    if (piece.location.i >= ROWS - 2) {
        isCollision = true;
    }

    // check for collision with another piece
    if (checkBottomColor(piece)) {
        isCollision = true;
    }

    return isCollision;
}

function checkBottomColor(piece) {
    var isColor = false;
    var isPartOfPiece = false;
    // run over all the piece coords to check collision for each of them
    for (var i = 0; i < piece.coords.length; i++) {
        // get the matching coord cell
        var coord = piece.coords[i];
        var cellStr = '.cell.cell-' + (piece.location.i + coord.x + 1) + '-' +
            (piece.location.j + coord.y);
        var cell = document.querySelector(cellStr);

        // check that the cell is in the board bounds
        if (cell !== null) {
            isColor = (cell.style.background !== 'lightgray');
            // check that this cell is not lightgray
            if (isColor) {

                // get the bottom coord relative to this cell
                var bottomCoord = {
                    x: (piece.location.i + coord.x + 1),
                    y: (piece.location.j + coord.y)
                };

                isPartOfPiece = false;

                // check if the bottom coord is part of this piece
                // if it is part of this piece - this is not a collision
                // only if it is not part of this piece than it is a collision
                for (var j = 0; j < piece.coords.length; j++) {

                    // get the coord relative to the piece location
                    var coord = {
                        x: piece.coords[j].x + piece.location.i,
                        y: piece.coords[j].y + piece.location.j
                    };

                    // check if the coord is part of the piece
                    if (bottomCoord.x === coord.x && bottomCoord.y === coord.y) {
                        isPartOfPiece = true;
                        break;
                    }
                }

                // if the bottom coord is not part of the piece than this is a collision!!
                if (!isPartOfPiece) {
                    return true;
                }
            }
        }
    }
    return false;
}

function checkSideColor(piece, sideOffset) {

    var isColor = false;
    var isPartOfPiece = false;
    // run over all the piece coords to check collision for each of them
    for (var i = 0; i < piece.coords.length; i++) {
        // get the matching coord cell
        var coord = piece.coords[i];
        var cellStr = '.cell.cell-' + (piece.location.i + coord.x) + '-' +
            (piece.location.j + coord.y + sideOffset);
        var cell = document.querySelector(cellStr);

        // check that the cell is in the board bounds
        if (cell !== null) {
            isColor = (cell.style.background !== 'lightgray');

            // check that this cell is not lightgray
            if (isColor) {

                // get the left coord relative to this cell
                var sideCoord = {
                    x: (piece.location.i + coord.x),
                    y: (piece.location.j + coord.y + sideOffset)
                };

                isPartOfPiece = false;


                // check if the bottom coord is part of this piece
                // if it is part of this piece - this is not a collision
                // only if it is not part of this piece than it is a collision
                for (var j = 0; j < piece.coords.length; j++) {

                    // get the coord relative to the piece location
                    var coord = {
                        x: piece.coords[j].x + piece.location.i,
                        y: piece.coords[j].y + piece.location.j
                    };

                    // check if the coord is part of the piece
                    if (sideCoord.x === coord.x && sideCoord.y === coord.y) {
                        isPartOfPiece = true;
                        break;
                    }
                }

                // if the side coord is not part of the piece than this is a collision!!
                if (!isPartOfPiece) {
                    return true;
                }
            }
        }
    }
    return false;
}


function pieceReachedBottom(piece) {
    // every time hit something, check for full line
    checkIfFullLine();
    // when reach the bottom -  create another piece
    var randomIdx = getRandomIntInclusive(0, gPiecesTypes.length - 1);
    var piece = gPiecesTypes[randomIdx];
    createPiece(piece);

    updateScore(10);
}

function movePiece(keyboardEvent) {
    if (!gGame.isOn) return;
    getNextLocation(keyboardEvent);
}

function getNextLocation(keyboardEvent) {
    var piece = gPieces[gPieceIdx];
    // get the previous piece color
    var previousColor = piece.color;
    // this is for erasing the previous location of the piece after falling down 1 line
    piece.color = 'lightgray';
    drawPiece(piece);

    switch (keyboardEvent.code) {
        case 'ArrowLeft':
            if (piece.location.j - 1 >= 0) {
                if (!checkSideColor(piece, -1)) {
                    piece.location.j--;
                }
            }
            break;
        case 'ArrowRight':
            if (piece.location.j - 1 + piece.width < COLS - 1) {
                if (!checkSideColor(piece, 1)) {
                    piece.location.j++;
                }
            }
            break;
        case 'ArrowDown':
            if (piece.location.i + piece.height < ROWS) {
                if (!checkForCollision(piece)) {
                    piece.location.i++;
                }
            }
            break;
            // case 'ArrowUp':
            //     piece.rotationIndex++;
            //     if (piece.rotationIndex >= piece.rotations.length) {
            //         piece.rotationIndex = 0;
            //     }
            //     piece.coords = piece.rotations[piece.rotationIndex].coords;
            //     break;
        case 'Space':
            var audio = new Audio('sound/tetris.mp3');
            audio.volume = 0.2;
            audio.play();
            break;
        default:
            break;
    }
    piece.color = previousColor;
    drawPiece(piece);
}

function spinPiece() {

    var piece = gPieces[gPieceIdx];
    // get the previous piece color
    var previousColor = piece.color;
    // this is for erasing the previous location of the piece after falling down 1 line
    piece.color = 'lightgray';
    drawPiece(piece);
    piece.rotationIndex++;
    if (piece.rotationIndex >= piece.rotations.length) {
        piece.rotationIndex = 0;
    }
    piece.coords = piece.rotations[piece.rotationIndex].coords;
    piece.color = previousColor;
    drawPiece(piece);
}

function moveRightBtnClicked() {
    var piece = gPieces[gPieceIdx];
    // get the previous piece color
    var previousColor = piece.color;
    // this is for erasing the previous location of the piece after falling down 1 line
    piece.color = 'lightgray';
    drawPiece(piece);
    if (piece.location.j - 1 + piece.width < COLS - 1) {
        if (!checkSideColor(piece, 1)) {
            piece.location.j++;
        }
    }
    piece.color = previousColor;
    drawPiece(piece);
}

function moveLeftBtnClicked() {
    var piece = gPieces[gPieceIdx];
    // get the previous piece color
    var previousColor = piece.color;
    // this is for erasing the previous location of the piece after falling down 1 line
    piece.color = 'lightgray';
    drawPiece(piece);
    if (piece.location.j - 1 >= 0) {
        if (!checkSideColor(piece, -1)) {
            piece.location.j--;
        }
    }
    piece.color = previousColor;
    drawPiece(piece);
}

function moveDownBtnClicked() {
    var piece = gPieces[gPieceIdx];
    // get the previous piece color
    var previousColor = piece.color;
    // this is for erasing the previous location of the piece after falling down 1 line
    piece.color = 'lightgray';
    drawPiece(piece);
    if (piece.location.i + piece.height < ROWS) {
        if (!checkForCollision(piece)) {
            piece.location.i++;
        }
    }
    piece.color = previousColor;
    drawPiece(piece);
}

function checkIfFullLine() {
    // run over all the board from the bottom to top
    // and check if the line is full with colors
    var clearedRows = [];

    for (var i = ROWS - 1; i >= 0; i--) {
        var coloredCellCount = 0;
        for (var j = 0; j < COLS; j++) {
            var cellStr = '.cell.cell-' + i + '-' + j;
            var cell = document.querySelector(cellStr);
            // check if the current cell is not "lightgray"
            if (cell.style.background !== 'lightgray') {
                coloredCellCount++;
            }
        }
        // check if all of the cell in the current row are not "lightgray"
        if (coloredCellCount === COLS) {
            clearedRows.push(i);
            updateScore(100);
            var line = new Audio('sound/full-line.mp3');
            line.play();
        }
    }

    // clear the rows and move the board down by the number of cleared rows
    for (var i = clearedRows.length - 1; i >= 0; i--) {
        var row = clearedRows[i];
        clearRow(row);
    }
}

function updateScore(value) {
    // Update both the model and the dom for the score
    gGame.score += value;
    document.querySelector('.score').innerText = gGame.score;
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gGameInterval);
    clearInterval(gGameTimeInterval);
    var restartBtn = document.querySelector(".restart");
    restartBtn.hidden = false;
    var lose = document.querySelector('.game-over');
    lose.hidden = false;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}