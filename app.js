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

let colorButton = document.querySelector('.color');
let rainbowButton = document.querySelector('.rainbow');
let eraserButton = document.querySelector('.eraser');
let clearButton = document.querySelector('.clear');

let currColor = '#d3d3d3';


let mode = 'color';

function initalize(){
    sliderText.style.position = 'relative';
    sliderText.style.right = '80px';
    sliderText.textContent = gridDimension + ' X ' + gridDimension;
    sliderBox.appendChild(sliderText);
    
    
    let copyright = 'Copyright© Fucă Răzvan ' + new Date().getFullYear();
    let copyrightP = document.createElement('p');
    copyrightP.textContent = copyright
    footer.appendChild(copyrightP);
    
    createGrid();

}

function placeSquareAndListen(square, row, column){
        square.classList.add('square');
        square.classList.add(row + "_" + column);
    
    
        square.style.gridRowStart = row;
        square.style.gridRowEnd = row + 1;
            
        square.style.gridColumnEnd = column;
        square.style.gridColumnEnd = column + 1;
        square.addEventListener('mouseover', changeColor);
        square.addEventListener('mousedown', changeColor);

}

function randomColor(){
    let R = Math.floor(Math.random() * 255);
    let G = Math.floor(Math.random() * 255);
    let B = Math.floor(Math.random() * 255);

    return `rgb(${R},${G},${B})` ;
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
            e.target.style.backgroundColor = 'white';
            
            break;

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



slider.addEventListener('input', () =>{ 
    destroyGrid();
    gridDimension = slider.value;
    sliderText.textContent = gridDimension + 'X' + gridDimension;
    createGrid();
});

colorPicker.addEventListener('input', () =>{
    currColor = colorPicker.value; 
    colorPicker.style.backgroundColor = currColor; 

});

colorButton.addEventListener('click', () =>{
    
    mode = 'color';
});

rainbowButton.addEventListener('click', () =>{
    mode = 'rainbow';
});

eraserButton.addEventListener('click', () =>{

    mode = 'eraser'
});

clearButton.addEventListener('click', () =>{
    grid.forEach(square => {
        square.style.backgroundColor = 'white';
    });
})
initalize()
