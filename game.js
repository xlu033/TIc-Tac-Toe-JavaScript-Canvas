var gameStatus = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var canvas;
var width = 400;
var height = 400;
var squareWidth = width / 3;
var squareHeight = height / 3;
var context;
var currPlayer;
 
window.onload = function () {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
 
    canvas.width = width;
    canvas.height = height;
    canvas.onclick = onCanvasClick;
    restartGame();
    currPlayer = 1;
};
 
function restartGame() {
    context.clearRect(0, 0, width, height);
    drawGameBoard();
    drawPlayerMoves();
}
 
function drawGameBoard() {
    context.beginPath();
    context.moveTo(squareWidth, 0);
    context.lineTo(squareWidth, height);
    context.stroke();
 
    context.beginPath();
    context.moveTo(squareWidth * 2, 0);
    context.lineTo(squareWidth * 2, height);
    context.stroke();
 
    context.beginPath();
    context.moveTo(0, squareHeight);
    context.lineTo(width, squareHeight);
    context.stroke();

    context.beginPath();
    context.moveTo(0, squareHeight * 2);
    context.lineTo(width, squareHeight * 2);
    context.stroke();
}
 
function drawPlayerMoves() {
    for (var i = 0; i <= 2; i++) {
        for (var j = 0; j <= 2; j++) {
            var square = gameStatus[i][j];
            if (square == 1) {
                drawX(i, j);
            } else if (square == 2) {
                drawO(i, j);
            }
        }
    }
}
 
function onCanvasClick(e) {
    var currCoordinate = getMouseLocation(e);
    var square = getSquareFromLocation(currCoordinate);
    processSquareClick(square);
}

function getMouseLocation(e) {
    var mouseX = e.pageX - canvas.offsetLeft;
    var mouseY = e.pageY - canvas.offsetTop;
    return { x: mouseX, y: mouseY };
}
 
function getSquareFromLocation(currCoordinate) {
    var squareCoordinate = { x: 0, y: 0 };

    if (currCoordinate.x > squareWidth * 2) squareCoordinate.x = 2;
    else if (currCoordinate.x > squareWidth) squareCoordinate.x = 1;
 
    if (currCoordinate.y > squareHeight * 2) squareCoordinate.y = 2;
    else if (currCoordinate.y > squareHeight) squareCoordinate.y = 1;
 
    return squareCoordinate;
}
 
function processSquareClick(square) {
    if (gameStatus[square.x][square.y] != 0) return;
    gameStatus[square.x][square.y] = currPlayer;

    restartGame();
 
    if (currPlayer == 1) currPlayer = 2;
    else currPlayer = 1;
 
    checkSolved();
}
 
function drawX(squareX, squareY) {
    context.beginPath();
    context.moveTo(squareX * squareWidth, squareY * squareHeight);
    context.lineTo(squareX * squareWidth + squareWidth, squareY * squareHeight + squareHeight);
    context.stroke();
 
    context.beginPath();
    context.moveTo(squareX * squareWidth + squareWidth, squareY * squareHeight);
    context.lineTo(squareX * squareWidth, squareY * squareHeight + squareHeight);
    context.stroke();
}
 
function drawO(squareX, squareY) {
    context.beginPath();
    context.arc(squareX * squareWidth + squareWidth / 2, squareY * squareHeight + squareHeight / 2, squareWidth / 2, 0, 360, false);
    context.stroke();
}
 
function checkSolved() {
    var full = true;
 
    for (var i = 0; i < 3; i++) {
        var xRows = 0, xColumns = 0;
        var oRows = 0, oColumns = 0;
        for (var j = 0; j < 3; j++) {
            if (gameStatus[j][i] == 1)
                xRows++;
            else if (gameStatus[j][i] == 2)
                oRows++;
            else
                full = false;
 
            if (gameStatus[i][j] == 1)
                xColumns++;
            else if (gameStatus[i][j] == 2)
                oColumns++;
        }
 
        var xDiag = gameStatus[0][0] == 1 && gameStatus[1][1] == 1 && gameStatus[2][2] == 1;
        xDiag = xDiag || gameStatus[0][2] == 1 && gameStatus[1][1] == 1 && gameStatus[2][0] == 1;
 
        var oDiag = gameStatus[0][0] == 2 && gameStatus[1][1] == 2 && gameStatus[2][2] == 2;
        oDiag = oDiag || gameStatus[0][2] == 2 && gameStatus[1][1] == 2 && gameStatus[2][0] == 2;
 
        if (xRows == 3 || xColumns == 3 || xDiag) {
            processEndGame("X win!");
            return;
        } else if (oRows == 3 || oColumns == 3 || oDiag) {
            processEndGame("O win!");
            return;
        }
    }
    if (full) {
        processEndGame("Tie!");
    }
}
 
// Displays an end-game message then re-initialize the game
function processEndGame(msg) {
    alert(msg);
    gameStatus = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    currPlayer = 1;
    restartGame();
}