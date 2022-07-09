const INITIAL_GRID_DIMENSION = 16;
const container = document.querySelector('.container');

let mouseButton;
let gridDimension = INITIAL_GRID_DIMENSION;
let grid = [];
let sliderText = document.createElement('p');

const sliderBox = document.querySelector('.slider_box');
const slider = document.querySelector('.slider');

document.body.onmousedown = () => (mouseButton = true);
document.body.onmouseup = () => (mouseButton = false);

const footer = document.querySelector('footer');

const colorPicker = document.querySelector('#colorpicker');
colorPicker.style.backgroundColor = colorPicker.value; 

const colorButton = document.querySelector('.color');
const rainbowButton = document.querySelector('.rainbow');
const eraserButton = document.querySelector('.eraser');
const clearButton = document.querySelector('.clear');
const shadeButton = document.querySelector('.shade');

let currColor = '#d3d3d3';


let mode = 'color';


let buttons = [colorButton, rainbowButton, eraserButton, clearButton, shadeButton];

function initalize(){
    sliderText.style.position = 'relative';
    sliderText.style.right = '80px';
    sliderText.textContent = gridDimension + ' X ' + gridDimension;
    sliderBox.appendChild(sliderText);
    
    
    let copyright = 'Copyright© Fucă Răzvan ' + new Date().getFullYear();
    let copyrightP = document.createElement('p');
    copyrightP.textContent = copyright
    footer.appendChild(copyrightP);
    highlightButton(colorButton);
    createGrid();

}

function placeSquareAndListen(square, row, column){
    square.classList.add('square');
    square.classList.add(row + "_" + column);
    
    square.style.gridRowStart = row;
    square.style.gridRowEnd = row + 1;
            
    square.style.gridColumnEnd = column;
    square.style.gridColumnEnd = column + 1;
    
    square.style.backgroundColor = 'rgb(255, 255, 255)';

    square.addEventListener('mouseover', changeColor);
    square.addEventListener('mousedown', changeColor);

}

function randomColor(){
    let R = Math.floor(Math.random() * 255);
    let G = Math.floor(Math.random() * 255);
    let B = Math.floor(Math.random() * 255);

    return `rgb(${R}, ${G}, ${B})` ;
}

function darkenColor(color){
    let n = color.substr(4).length;
    let RGB_String = color.substr(4).
    substr(0, n - 1).
    split(', ').
    map(x => parseInt(x));

    let RGB = RGB_String.map(x => Math.floor(0.75 * x));

    return `rgb(${RGB[0]},${RGB[1]},${RGB[2]})` ;
}

function changeColor(e) {
    if(e.type === 'mouseover' && !mouseButton) return;
      
    switch (mode) {
        case 'color':
            e.target.style.backgroundColor = currColor;
            break;
        case 'rainbow':
            e.target.style.backgroundColor = randomColor();
            break;
        case 'eraser':
            e.target.style.backgroundColor = 'rgb(255, 255, 255)';
            break;
        case 'shade':
            let squareColor = e.target.style.backgroundColor;
            e.target.style.backgroundColor = darkenColor(squareColor);
    }
}



function createGrid(){
    for (let row = 0; row < gridDimension; row++) {
        for (let column = 0; column < gridDimension; column++) {
            let square = document.createElement('div');
            placeSquareAndListen(square, row, column);
            container.appendChild(square);
            grid.push(square);
        }
    }
}

function destroyGrid(){
    let n = grid.length;
    for (let i = 0; i < n; i++) {
        let element = grid.shift();
        container.removeChild(element);
        
    }   
}
function highlightButton(button){
    buttons.forEach(element => {
        element.style.backgroundColor = 'white';
        element.style.color = 'black';

    });
    
    button.style.backgroundColor = 'black';
    button.style.color = 'ivory';

}

slider.addEventListener('input', () =>{ 
    destroyGrid();
    gridDimension = slider.value;
    sliderText.textContent = gridDimension + ' X ' + gridDimension;
    createGrid();
});

colorPicker.addEventListener('input', () =>{
    currColor = colorPicker.value; 
    colorPicker.style.backgroundColor = currColor; 

});

colorButton.addEventListener('click', () =>{
    mode = 'color';
    highlightButton(colorButton);
});

rainbowButton.addEventListener('click', () =>{
    mode = 'rainbow';
    highlightButton(rainbowButton);

});

eraserButton.addEventListener('click', () =>{
    mode = 'eraser';
    highlightButton(eraserButton);

});

clearButton.addEventListener('click', () =>{
    grid.forEach(square => {
        square.style.backgroundColor = 'rgb(255, 255, 255)';
    });
});
shadeButton.addEventListener('click', () =>{
    mode = 'shade';
    highlightButton(shadeButton);

});


initalize()
