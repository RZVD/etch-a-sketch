const GRID_DIMENSION = 16;
const container = document.querySelector('.container');

let grid = [];

function initalize(grid){
    createGrid(grid);
}
function changeColor(square) {
    square.style.backgroundColor = 'red'
}
function placeSquareAndListen(square, row, column){
        square.classList.add('square');
        square.classList.add(row + "_" + column);
    
    
        square.style.gridRowStart = row;
        square.style.gridRowEnd = row + 1;
            
        square.style.gridColumnEnd = column;
        square.style.gridColumnEnd = column + 1;
        square.textContent = '[' + row + ']' + '[' + column + ']';
        square.addEventListener('mouseover', () => {
            changeColor(square);
        });
}

function createGrid(){
    for (let row = 0; row < GRID_DIMENSION; row++) {
        let gridColumn = [];
        for (let column = 0; column < GRID_DIMENSION; column++) {
            let square = document.createElement('div');
            placeSquareAndListen(square, row, column);
            container.appendChild(square);
            gridColumn.push(square);
        }
        grid.push(gridColumn);       
    }
}

initalize()
