let ans = ""; // it will store currect option which contains correct color.
let numberOfOptions = 9; 

let landing = document.querySelector('.landing');
let correctGuess = document.querySelector('.correctGuess');
let wrongGuess = document.querySelector('.wrongGuess');
let grid = document.querySelector('.box');
let options = document.querySelectorAll('.option')
let mediumOptions = document.querySelectorAll('.mediumOptions');
let hardOptions = document.querySelectorAll('.hardOptions');

// To hide landing page
function hideLanding() {
    landing.classList.add("hide");
    setTimeout(() => {
        landing.style.display = "none";
    }, 500);
}

// to show and hide correctGuess page
function hideCorrectGuess() {
    correctGuess.classList.add("hide");
    correctGuess.classList.remove("show");
    correctGuess.style.display = "flex";
    setTimeout(() => {
        correctGuess.style.display = "none";
    }, 500);
}
function showCorrectGuess() {
    correctGuess.style.display = "flex";
    correctGuess.classList.add("show");
    correctGuess.classList.remove("hide");
}

// To show and hide wrongGuess page
function hideWrongGuess() {
    wrongGuess.classList.add("hide");
    wrongGuess.classList.remove("show");
    wrongGuess.style.display = "flex";
    setTimeout(() => {
        wrongGuess.style.display = "none";
    }, 500);
}
function showWrongGuess() {
    wrongGuess.style.display = "flex";
    wrongGuess.classList.add("show");
    wrongGuess.classList.remove("hide");
}

// It will convert display property of options to block
function makeDisplayBlock(options) {
    Array.from(options).forEach((element)=>{
        element.style.display = "block";
    });
}
// It will convert display property of options to none
function makeDisplayNone(options) {
    Array.from(options).forEach((element)=>{
        element.style.display = "none";
    });
}

// change level to esay 
function easy() {
    // if display of mediumOptions is block then and only then current level is not an easy level
    // if current level is easy then there isn't any need to change level
    if(mediumOptions[0].style.display === "block"){
        // create grid of 3x3
        grid.style.gridTemplateColumns = "repeat(3,1fr)";
        grid.style.gridTemplateRows = "repeat(3,1fr)";
        // hide medium and hard Options
        makeDisplayNone(mediumOptions);
        makeDisplayNone(hardOptions);
        numberOfOptions = 9;
        generateNewColor(); // to generate new colos.
    }
}
// change level to medium 
function medium() {
    // if display of hardOptions is block or display of mediumOptions is none then and only then current level is not a medium level
    // if current level is medium then there isn't any need to change level
    if(mediumOptions[0].style.display !== "block" || hardOptions[0].style.display === "block"){
        // create grid of 4x4
        grid.style.gridTemplateColumns = "repeat(4,1fr)";
        grid.style.gridTemplateRows = "repeat(4,1fr)";
        // show medium and hide hard options
        makeDisplayBlock(mediumOptions);
        makeDisplayNone(hardOptions);
        numberOfOptions = 16;
        generateNewColor();
    }
}
// change level to esay 
function hard() {
    // if display of hardOption is none then and only then current level is not a hard level
    // if current level is hard then there isn't any need to change level
    if(hardOptions[0].style.display !== "block"){
        // create grid of 5x5
        grid.style.gridTemplateColumns = "repeat(5,1fr)";
        grid.style.gridTemplateRows = "repeat(5,1fr)";
        // show medium and hard options
        makeDisplayBlock(mediumOptions);
        makeDisplayBlock(hardOptions);
        numberOfOptions = 25;
        generateNewColor();
    }
}

// add eventListener to every option and check that selected option is correct or not.
for(let i = 1; i <= 25; i++){
    const clicked = ".option"+i;
    document.querySelector(clicked).addEventListener("click", function(){
        // if it is correct then show correct guess page else show wrong guess page
        if(clicked === ans){
            showCorrectGuess();
        }else{
            showWrongGuess();
        }
    });
}

// To generate new colors.
function generateNewColor(){
    // get handles of question.
    const redCircle = document.querySelector('.red');
    const greenCircle = document.querySelector('.green');
    const blueCircle = document.querySelector('.blue');

    // generate correct color
    let red = Math.floor(Math.random()*255);
    let green = Math.floor(Math.random()*255);
    let blue = Math.floor(Math.random()*255);

    // place shades of correct colors into the question
    redCircle.style.backgroundColor = "RGB(" + red + ",0,0)";
    greenCircle.style.backgroundColor = "RGB(0," + green + ",0)";
    blueCircle.style.backgroundColor = "RGB(0,0," + blue + ")";
    
    let colorOfAnswer = "RGB(" + red + ", " + green + ", " + blue + ")"; // RGB value of correct color
    let color = []; // array to avoide duplicate colors.
    color.push(colorOfAnswer);
    
    ans = ".option" + Math.floor(Math.random()*numberOfOptions+1); // select correct option randomly.
    document.querySelector(ans).style.backgroundColor = colorOfAnswer; // place correct color in ans option
    
    // to generate other options.
    for(let i = 1; i <= numberOfOptions; i++){
        const colori = ".option" + i; // class name of ith option

        // this condition will make sure that color in the correct option will be not changed.
        if(colori !== ans){ 
            // generate random color.
            red = Math.floor(Math.random()*255);
            green = Math.floor(Math.random()*255);
            blue = Math.floor(Math.random()*255);
            
            let optionColor = "RGB(" + red + ", " + green + ", " + blue + ")"; // RGB value of generated color

            // it will make sure that there isn't any duplicate colors.
            if(color.indexOf(optionColor) === -1){
                // place color into options
                document.querySelector(colori).style.backgroundColor = optionColor;
                color.push(optionColor);
            }else{
                i--;
                console.log("repeted");
            }
        }
    }
}