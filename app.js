const INITIAL_GRID_DIMENSION = 16;
const container = document.querySelector('.container');
let gridDimension = INITIAL_GRID_DIMENSION;

const slider = document.querySelector('.slider');
console.log(slider.value);

let grid = [];
let mouseButton;

function initalize(){
    createGrid();
}

function placeSquareAndListen(square, row, column){
        square.classList.add('square');
        square.classList.add(row + "_" + column);
    
    
        square.style.gridRowStart = row;
        square.style.gridRowEnd = row + 1;
            
        square.style.gridColumnEnd = column;
        square.style.gridColumnEnd = column + 1;
        //square.textContent = '[' + row + ']' + '[' + column + ']';
        square.addEventListener('mouseover', changeColor);
        square.addEventListener('mousedown', changeColor);


}
function changeColor(e) {
    if(e.type === 'mouseover' && !mouseButton) return;
    e.target.style.backgroundColor = 'red' 
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
document.body.onmousedown = () => (mouseButton = true);
document.body.onmouseup = () => (mouseButton = false);

slider.addEventListener('click', () =>{
    destroyGrid();
    gridDimension = slider.value;
    createGrid();
    
});

initalize()
