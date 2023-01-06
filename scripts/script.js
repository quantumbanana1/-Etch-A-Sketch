
const colorPicker = document.getElementById("input-color");
colorPicker.addEventListener("input", function () {updateElements(this.value,null)});
const currentColorDisplay = document.getElementsByClassName("current-color");
const board = document.getElementById("board");
console.log(board)
const slider = document.getElementById("slider");
const currentSize = document.getElementsByClassName("display-size")
createChildElements(board, 1,[board.clientWidth,board.clientHeight]);
// let brushSquare = document.getElementsByClassName("brush")
slider.addEventListener("change", function(){createChildElements(board,this.value, [board.clientWidth,board.clientHeight]),
 updateElements(null,this.value)});
slider.addEventListener("input", function (){updateElements(null, this.value)})
let currentColor = "#000000"
// console.log(brushSquare)








// function that displays chosen color  to a user and changes the color of a square brush if value is changed.
function updateElements (value,element)  {
    if (value) {
        currentColorDisplay[0].style.backgroundColor = `${value}`;
        currentColor = `${value}`

    }
    if (element) {
        currentSize[0].innerText = `${element}x${element}`
        const brush = getChildren(board)
        console.log(brush.length)
    //
    //     for (let i = 0; )
    //
    }



}

// it creates div elements of a user-defined size
function createChildElements (element, amountOfBlocks, boardSize) {
    isChild(element)
    const boardWidth = boardSize[0];
    const boardHeight = boardSize[1];
    const heightChildSize = (boardHeight/ amountOfBlocks);
    const widthChildSize = (boardWidth / amountOfBlocks);
    const child = document.createElement("div");
    child.classList.add("brush")
    // child.setAttribute("style", "");
    child.style.width = `${widthChildSize}px`;
    child.style.height = `${heightChildSize}px`
    // child.style.minHeight = `${heightChildSize}px`
    // child.style.minWidth = `${widthChildSize}px`;


    for (let i=0; i < amountOfBlocks; i++) {
        for (let j = 0; j < amountOfBlocks; j++ ) {
            board.appendChild(child.cloneNode(true))
        }

    }

    const children  = getChildren(board);

    for (let i = 0; i < children.length; i++) {
        console.log(children[i])
        children[i].addEventListener("mouseover", function (){paintSquare(currentColor, this)})
    }



}

function paintSquare(value, element) {
    element.style.backgroundColor = value

}

// it actualizes the board with new block with given size
function isChild(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;

    }
}

// it makes possible to color with random tones
function rainbowMod () {

}

function getChildren (element) {
    const children = element.childNodes
    return children
}

function clear () {
    

}
