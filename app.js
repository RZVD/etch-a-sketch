const GRID_DIMENSION = 16;

const container = document.querySelector('.container');


function initalize(){
    createGrid()
}

function placeSquare(square, i, j){
        square.style.gridRowStart = i;
        square.style.gridRowEnd = i + 1;
            
        square.style.gridColumnEnd = i + 1;
        square.style.gridColumnEnd = j + 1;
            
            
}

function createGrid(){
    for (let i = 0; i < GRID_DIMENSION; i++) {
        for (let j = -0; j < GRID_DIMENSION; j++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.classList.add(i + "_" + j);
            placeSquare(square, i, j);
            square.textContent = '[' + i + ']' + '[' + j + ']';
            
            container.appendChild(square);

        }        
    }

}
initalize()