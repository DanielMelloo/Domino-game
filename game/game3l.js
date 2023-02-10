let board = document.getElementById("board");

// Criar algumas peças de domino com valores aleatórios
for (let i = 0; i < 10; i++) {
    let left = Math.floor(Math.random() * 6) + 1;
    let middle = Math.floor(Math.random() * 6) + 1;
    let right = Math.floor(Math.random() * 6) + 1;

    
    // let dominoPiece = createSVG_3(left, middle, right);
        let dominoPiece = create_triangle_svg(left, middle, right);

    if (i%2 != 0){ // não é divisivel por 2
        dominoPiece = create_triangle_svg(left, middle, right);

    }
    else { // é divisivel por 2
        dominoPiece = create_triangleInv_svg(left, middle, right)
    }
    
    board.appendChild(dominoPiece);
}   

// if ((i/2)%2 == 0){
//     dominoPiece.classList.add ('spaceIn')
// }
// else{
//     dominoPiece.classList.add ('spaceOut')
// }

function create_triangle_svg(left, middle, right){
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "45");
    svg.setAttribute("height", "45");

    let triangle = document.createElementNS("http://www.w3.org/2000/svg", "path");

    triangle.setAttribute('d', 'M0 45 L22.5 0 L45 45 Z');
    triangle.setAttribute('stroke' ,'black');
    triangle.setAttribute('fill','white');

    svg.appendChild(triangle);

    let textLeft = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textLeft.setAttribute("x", "7");
    textLeft.setAttribute("y", "43");
    textLeft.setAttribute("font-size", "20");
    textLeft.setAttribute("fill", "black");
    textLeft.innerHTML = left;
    svg.appendChild(textLeft);

    let textMiddle = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textMiddle.setAttribute("x", "17");
    textMiddle.setAttribute("y", "23");
    textMiddle.setAttribute("font-size", "20");
    textMiddle.setAttribute("fill", "black");
    textMiddle.innerHTML = middle;
    svg.appendChild(textMiddle);

    let textRight = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textRight.setAttribute("x", "27");
    textRight.setAttribute("y", "43");
    textRight.setAttribute("font-size", "20");
    textRight.setAttribute("fill", "black");
    textRight.innerHTML = right;
    svg.appendChild(textRight);


    return svg;
}

function create_triangleInv_svg(left, middle, right){
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "45");
    svg.setAttribute("height", "45");

    let triangle = document.createElementNS("http://www.w3.org/2000/svg", "path");

    triangle.setAttribute('d', 'M0 0 L22.5 45 L45 0 Z');
    triangle.setAttribute('stroke' ,'black');
    triangle.setAttribute('fill','white');
    // triangle.setAttribute('style', 'rotate:180deg;');
    

    svg.appendChild(triangle);

    let textLeft = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textLeft.setAttribute("x", "7");
    textLeft.setAttribute("y", "16");
    textLeft.setAttribute("font-size", "20");
    textLeft.setAttribute("fill", "black");
    // textLeft.setAttribute('style', 'rotate:180deg;');
    textLeft.innerHTML = left;
    svg.appendChild(textLeft);

    let textMiddle = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textMiddle.setAttribute("x", "17");
    textMiddle.setAttribute("y", "36");
    textMiddle.setAttribute("font-size", "20");
    textMiddle.setAttribute("fill", "black");
    // textMiddle.setAttribute('style', 'rotate:180deg;');
    textMiddle.innerHTML = middle;
    svg.appendChild(textMiddle);

    let textRight = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textRight.setAttribute("x", "27");
    textRight.setAttribute("y", "16");
    textRight.setAttribute("font-size", "20");
    textRight.setAttribute("fill", "black");
    // textRight.setAttribute('style', 'rotate:180deg;');
    textRight.innerHTML = right;
    svg.appendChild(textRight);


    return svg;
}

// Criaçao da funçao createSVG_3
function createSVG_3(left, middle, right) {
    // Criaçao do elemento svg
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "45");
    svg.setAttribute("height", "45");
    // Criaçao do elemento circle para o lado esquerdo
    let circleLeft = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circleLeft.setAttribute("cx", "10");
    circleLeft.setAttribute("cy", "35");
    circleLeft.setAttribute("r", "10");
    circleLeft.setAttribute("fill", "white");
    svg.appendChild(circleLeft);

    // Criaçao do elemento text para o lado esquerdo
    let textLeft = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textLeft.setAttribute("x", "6");
    textLeft.setAttribute("y", "42");
    textLeft.setAttribute("font-size", "20");
    textLeft.setAttribute("fill", "black");
    textLeft.innerHTML = left;
    svg.appendChild(textLeft);

    // Criaçao do elemento circle para o lado esquerdo
    let circlemiddle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circlemiddle.setAttribute("cx", "22.5");
    circlemiddle.setAttribute("cy", "10");
    circlemiddle.setAttribute("r", "10");
    circlemiddle.setAttribute("fill", "white");
    svg.appendChild(circlemiddle);

    // Criaçao do elemento text para o meio
    let textMiddle = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textMiddle.setAttribute("x", "16");
    textMiddle.setAttribute("y", "16");
    textMiddle.setAttribute("font-size", "20");
    textMiddle.setAttribute("fill", "black");
    textMiddle.innerHTML = middle;
    svg.appendChild(textMiddle);

    // Criaçao do elemento circle para o lado direito
    let circleRight = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circleRight.setAttribute("cx", "35");
    circleRight.setAttribute("cy", "35");
    circleRight.setAttribute("r", "10");
    circleRight.setAttribute("fill", "white");
    svg.appendChild(circleRight);

    // Criaçao do elemento text para o lado direito
    let textRight = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textRight.setAttribute("x", "29.5");
    textRight.setAttribute("y", "42");
    textRight.setAttribute("font-size", "20");
    textRight.setAttribute("fill", "black");
    textRight.innerHTML = right;
    svg.appendChild(textRight);

    return svg;
}
const dominoPieces = document.querySelectorAll('.domino-piece');


dominoPieces.forEach(piece => {
    const side1 = piece.getAttribute('data-side1');
    const side2 = piece.getAttribute('data-side2');
    const side3 = piece.getAttribute('data-side3');
    
    // Check if the piece is a triangle
    if (side1 + side2 > side3 && side1 + side3 > side2 && side2 + side3 > side1) {
    console.log(`This piece with sides ${side1}, ${side2}, and ${side3} is a triangle.`);
    } else {
    console.log(`This piece with sides ${side1}, ${side2}, and ${side3} is not a triangle.`);
    }
    });
    
    // Listen for click events on all pieces
    dominoPieces.forEach((piece) => {
    piece.addEventListener('click', classifyPiece);
    });
    
    
    
    


