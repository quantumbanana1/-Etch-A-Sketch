
let rainbowMode = false // it activates or deactivates rainbow mode.
const colorPicker = document.getElementById("input-color");
colorPicker.addEventListener("input", function () {updateElements(this.value,null)});
const currentColorDisplay = document.getElementsByClassName("current-color");
const board = document.getElementById("board");
const slider = document.getElementById("slider");
const currentSize = document.getElementsByClassName("display-size");
createChildElements(board, 1,[board.clientWidth,board.clientHeight]); // it creates default board when page is loaded.
slider.addEventListener("change", function  (){createChildElements(board,this.value, [board.clientWidth,board.clientHeight]),
 updateElements(null,this.value), getBackToDefault()});
slider.addEventListener("input", function (){updateElements(null, this.value)});

// These values are important to check when to  start or stop a particular  mode of painting.
let amountOfClicksClearBtn = 0; // clicks of a button rubber
let amountOfClicksRainbowBtn = 0; // clicks of a rainbow button
const buttons = document.getElementsByClassName("btn");
let currentColor = "#000000"; // default color for painting.
addEventOrRemoveLisBtn(buttons)









// function that displays chosen color  to a user and changes the color of a square brush and its size if value is changed.
function updateElements (value,element)  {
    if (value) {
        currentColorDisplay[0].style.backgroundColor = `${value}`;
        currentColor = `${value}`;
        }


    if (element) {
        currentSize[0].innerText = `${element}x${element}`;
        const brush = getChildren(board);

    }
}

// it creates div elements of a user-defined size and adds eventListener to them.
function createChildElements (element, amountOfBlocks, boardSize) {
    isChild(element);
    const boardWidth = boardSize[0];
    const boardHeight = boardSize[1];
    const heightChildSize = (boardHeight/ amountOfBlocks);
    const widthChildSize = (boardWidth / amountOfBlocks);
    const child = document.createElement("div");
    child.classList.add("brush");
    child.style.width = `${widthChildSize}px`;
    child.style.height = `${heightChildSize}px`;


    for (let i=0; i < amountOfBlocks; i++) {
        for (let j = 0; j < amountOfBlocks; j++ ) {
            board.appendChild(child.cloneNode(true));
        }

    }

    const children  = getChildren(board);

    for (let i = 0; i < children.length; i++) {
        console.log(children[i]);
        children[i].addEventListener("mouseover", function (){paintSquare(currentColor, this, rainbowMode)});
    }



}

// it paints the squares with given color in particular mode.
function paintSquare(value, element, rainBowMode) {
    if (rainBowMode===false) {
        element.style.backgroundColor = value;
    } else {
        const values = ["#9400D3", "#4B0082", "#0000FF", "#00FF00", "#FFFF00", "#FF7F00", "#FF0000"];
        const integer = Math.floor(Math.random() * values.length);
        element.style.backgroundColor = values[integer];

    }

}

// it actualizes the board with new block with given size
function isChild(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;

    }
}


// it gets all children div elements
function getChildren (element) {
    return element.childNodes;
}

//it adds event listener to utilize background color of a div with mouseover event.
function clear () {
    const children = getChildren(board);
    for (let i = 0; i < children.length; i++) {
        console.log(children[i]);
        children[i].addEventListener("mouseover", clearArea);
    }
}

// when clean mode is on, it removes background color of a div.
function clearArea() {
    return paintSquare("", this, rainbowMode);
}


// this function probably could be fall into smaller functions. I will do this in the future. Nevertheless this functions
// adds appropiate eventListeners according to the  active current mode or removes ones when mode is disabled. It also activate or deactivate
// mode
function addEventOrRemoveLisBtn (btnCollection) {

    for (let i = 0; i < btnCollection.length; i++) {
        btnCollection[i].addEventListener("click", function () {
            displayCurrentMode(this);
            if (this.value === "clear-board" && amountOfClicksClearBtn%2 !== 0 ) {
                clear();

            }
            if(this.value === "clear-board" && amountOfClicksClearBtn%2 === 0) {
                    deleteEventListener("mouseover",  clearArea);
                }

            if (this.value === "rainbow-mod" && amountOfClicksRainbowBtn%2 !== 0 ) {
                rainbowMode = true
            }
             if (this.value === "rainbow-mod" && amountOfClicksRainbowBtn%2 === 0) {
                rainbowMode = false;
            }

        })
    }


}

// it adds class function to a button when clicked and removes class in question when un-cliked and sums the amount of  button clicks.
function displayCurrentMode(button) {
    if (button.value === "clear-board") {
        amountOfClicksClearBtn += 1;
        amountOfClicksRainbowBtn = 0;
        rainbowMode = false;
    } else {
        amountOfClicksRainbowBtn += 1;
        amountOfClicksClearBtn = 0;
        deleteEventListener("mouseover",  clearArea)

    }
    const currentBtn = document.getElementsByClassName("active");
    if (currentBtn.length > 0) {
        currentBtn[0].className = currentBtn[0].className.replace(" active", "");
    }

    // Add the active class to the current/clicked button
    button.className += " active";
    console.log(document.getElementsByClassName("active"));

    //when the button was clicked twice in a row , the class is removed from  the button .
    if (amountOfClicksClearBtn % 2 === 0 && button.value === "clear-board") {
        button.className = button.className.replace("active", "");

    } else if (amountOfClicksRainbowBtn % 2 === 0 && button.value === "rainbow-mod") {
        button.className = button.className.replace("active", "");

    }

}

// it removes given event listeners to deactivate given mode
function deleteEventListener(event, someFunction) {
    const children = getChildren(board);

    for (let i = 0; i < children.length; i++) {
        children[i].removeEventListener(event, someFunction);
    }

}

// when  size of a board is changed , this function brings the values of  variables to the original state.
function getBackToDefault() {
    const currentBtn = document.getElementsByClassName("active");
    if (currentBtn) {
        for (let i = 0; i < currentBtn.length; i++) {
            currentBtn[i].className = currentBtn[0].className.replace(" active", "");


        }
    }
    deleteEventListener("mouseover", clearArea);
    amountOfClicksClearBtn = 0;
    amountOfClicksRainbowBtn = 0;
    rainbowMode = false;

}


