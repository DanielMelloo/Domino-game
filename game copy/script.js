





// let containerTable = document.querySelector('#table');


let containerTable = document.getElementById('table'); 


function createTablePiece (){


    let userInput1 = prompt("Insira um valor:");                // Entrada de Usuário 1
    userInput1 = parseInt(userInput1, 10);                      // Seta a entrada como inteiro

    
    let userInput2 = prompt("Insira outro valor:");             // Entrada de Usuário 2
    userInput2 = parseInt(userInput2, 10);                      // Seta a entrada como inteiro

    let piece = generatePiece (userInput1,userInput2);

    if (userInput1 == userInput2){                              // Peça na Vertical

        piece.setAttribute ('class', 'piece UsableRectangleH'); // Seta a classe de peça na Vertical (height)
    }
    
    else {   

        piece.setAttribute ('class', 'piece UsableRectangleW'); // Seta a classe de peça na Horizontal (width)
    }

    return piece
}

function updateTable (){

    let piece = createTablePiece ();
    let tableSide = prompt("Insira um lado: [L] ou [R]");

    tableSide.toLowerCase();

    if (tableSide == 'l'){
        containerTable.prepend (piece);
    }

    else if (tableSide == 'r'){
        
        containerTable.appendChild (piece);
    }
}







function generatePiece (value1, value2){  // Gera uma peça e retorna ela


    // ======================== //
    // Seta Informaçãoes da div //
    // ======================== //


    let parentPiece = document.createElement('div');     // Cria uma div 


    // ================== //
    // seta filhos da div //
    // ================== //


    let child1 = document.createElement('div');     // Cria uma div (será SideUp)
    parentPiece.appendChild (child1)                // Tornna essa div descendente de parentPiece

    let child2 = document.createElement('div');     // Cria uma div (será SideDown)
    parentPiece.appendChild (child2)                // Tornna essa div descendente de parentPiece


    // ============================== //
    // Verifica se tem números iguais //
    // ============================== //

    if (value1 == value2) {

        // ======= //
        // Side Up //
        // ======= //
        
        child1.setAttribute('class', 'sideUp');         // Atribui uma classe para essa div para estilização

        // ========= //
        // Side Down //
        // ========= //

        child2.setAttribute('class', 'sideDown');       // Atribui uma classe para essa div para estilização
    }

    else{
        
        // ========= //
        // Side Left //
        // ========= //

        child1.setAttribute('class', 'sideLeft');         // Atribui uma classe para essa div para estilização

        // ========== //
        // Side Right //
        // ========== //

        child2.setAttribute('class', 'sideRight');       // Atribui uma classe para essa div para estilização
    }
    // =========== //
    // Def do svg1 //
    // =========== //

    
    let svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    
    switch(value1){
        case 0:
            svg1 = createSVG_0();
            break;
        case 1:
            svg1 = createSVG_1();
            break;
        case 2:
            svg1 = createSVG_2();
            break;
        case 3:
            svg1 = createSVG_3();
            break;
        case 4:
            svg1 = createSVG_4();
            break;
        case 5:
            svg1 = createSVG_5();
            break;
        case 6:
            svg1 = createSVG_6();
            break;
    }
    
    child1.appendChild (svg1);                       // Tornna esse svg descendente de child1

    // =========== //
    // Def do svg2 //
    // =========== //
    
    let svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    
    switch(value2){
        case 0:
            svg2 = createSVG_0();
            break;
        case 1:
            svg2 = createSVG_1();
            break;
        case 2:
            svg2 = createSVG_2();
            break;
        case 3:
            svg2 = createSVG_3();
            break;
        case 4:
            svg2 = createSVG_4();
            break;
        case 5:
            svg2 = createSVG_5();
            break;
        case 6:
            svg2 = createSVG_6();
            break;
    }
    
    child2.appendChild(svg2);                       // Tornna esse svg descendente de child1


    return parentPiece;
}



function createSVG_6() {  // Gera svg da peça 6

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.setAttribute('width', '45');
    svg.setAttribute('height', '45');

        // =========== //
        // Set Circles //
        // =========== //


    // ======== //
    // Set left //
    // ======== //

    let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute('cx', 12);
    circle1.setAttribute('cy', 11);
    circle1.setAttribute('r', '3');
    circle1.setAttribute('fill', 'black');
    svg.appendChild(circle1);

    let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle2.setAttribute('cx', 12);
    circle2.setAttribute('cy', 22.5);
    circle2.setAttribute('r', '3');
    circle2.setAttribute('fill', 'black');
    svg.appendChild(circle2);

    let circle3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle3.setAttribute('cx', 12);
    circle3.setAttribute('cy', 34);
    circle3.setAttribute('r', '3');
    circle3.setAttribute('fill', 'black');
    svg.appendChild(circle3);



    // ========= //
    // Set right //
    // ========= //


    let circle4 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle4.setAttribute('cx', 34);
    circle4.setAttribute('cy', 11);
    circle4.setAttribute('r', '3');
    circle4.setAttribute('fill', 'black');
    svg.appendChild(circle4);

    let circle5 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle5.setAttribute('cx', 34);
    circle5.setAttribute('cy', 22.5);
    circle5.setAttribute('r', '3');
    circle5.setAttribute('fill', 'black');
    svg.appendChild(circle5);

    let circle6 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle6.setAttribute('cx', 34);
    circle6.setAttribute('cy', 34);
    circle6.setAttribute('r', '3');
    circle6.setAttribute('fill', 'black');
    svg.appendChild(circle6);

    return svg;

}

    
function createSVG_5() {  // Gera svg da peça 5

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '45');
    svg.setAttribute('height', '45');

        // =========== //
        // Set Circles //
        // =========== //


    // ======== //
    // Set left //
    // ======== //

    let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute('cx', 12);
    circle1.setAttribute('cy', 11);
    circle1.setAttribute('r', '3');
    circle1.setAttribute('fill', 'black');
    svg.appendChild(circle1);



    let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle2.setAttribute('cx', 12);
    circle2.setAttribute('cy', 34);
    circle2.setAttribute('r', '3');
    circle2.setAttribute('fill', 'black');
    svg.appendChild(circle2);



    // ========= //
    // Set right //
    // ========= //


    let circle3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle3.setAttribute('cx', 34);
    circle3.setAttribute('cy', 11);
    circle3.setAttribute('r', '3');
    circle3.setAttribute('fill', 'black');
    svg.appendChild(circle3);


    let circle4 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle4.setAttribute('cx', 34);
    circle4.setAttribute('cy', 34);
    circle4.setAttribute('r', '3');
    circle4.setAttribute('fill', 'black');
    svg.appendChild(circle4);



    // ========= //
    // Set Midle //
    // ========= //


    let circle5 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle5.setAttribute('cx', 22.5);
    circle5.setAttribute('cy', 22.5);
    circle5.setAttribute('r', '3');
    circle5.setAttribute('fill', 'black');
    svg.appendChild(circle5);
    

    return svg;

} 


function createSVG_4() {  // Gera svg da peça 4

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '45');
    svg.setAttribute('height', '45');

        // =========== //
        // Set Circles //
        // =========== //


    // ======== //
    // Set left //
    // ======== //

    let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute('cx', 12);
    circle1.setAttribute('cy', 11);
    circle1.setAttribute('r', '3');
    circle1.setAttribute('fill', 'black');
    svg.appendChild(circle1);



    let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle2.setAttribute('cx', 12);
    circle2.setAttribute('cy', 34);
    circle2.setAttribute('r', '3');
    circle2.setAttribute('fill', 'black');
    svg.appendChild(circle2);



    // ========= //
    // Set right //
    // ========= //


    let circle3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle3.setAttribute('cx', 34);
    circle3.setAttribute('cy', 11);
    circle3.setAttribute('r', '3');
    circle3.setAttribute('fill', 'black');
    svg.appendChild(circle3);


    let circle4 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle4.setAttribute('cx', 34);
    circle4.setAttribute('cy', 34);
    circle4.setAttribute('r', '3');
    circle4.setAttribute('fill', 'black');
    svg.appendChild(circle4);

    

    return svg;

} 


function createSVG_3() {  // Gera svg da peça 3

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '45');
    svg.setAttribute('height', '45');

        // =========== //
        // Set Circles //
        // =========== //


    // ======== //
    // Set left //
    // ======== //


    let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute('cx', 12);
    circle1.setAttribute('cy', 34);
    circle1.setAttribute('r', '3');
    circle1.setAttribute('fill', 'black');
    svg.appendChild(circle1);


    // ========= //
    // Set right //
    // ========= //


    let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle2.setAttribute('cx', 34);
    circle2.setAttribute('cy', 11);
    circle2.setAttribute('r', '3');
    circle2.setAttribute('fill', 'black');
    svg.appendChild(circle2);



    // ========= //
    // Set Midle //
    // ========= //


    let circle3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle3.setAttribute('cx', 22.5);
    circle3.setAttribute('cy', 22.5);
    circle3.setAttribute('r', '3');
    circle3.setAttribute('fill', 'black');
    svg.appendChild(circle3);
    

    return svg;

} 


function createSVG_2() {  // Gera svg da peça 2

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '45');
    svg.setAttribute('height', '45');

        // =========== //
        // Set Circles //
        // =========== //


    // ======== //
    // Set left //
    // ======== //

    let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute('cx', 12);
    circle1.setAttribute('cy', 34);
    circle1.setAttribute('r', '3');
    circle1.setAttribute('fill', 'black');
    svg.appendChild(circle1);

    
    // ========= //
    // Set right //
    // ========= //


    let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle2.setAttribute('cx', 34);
    circle2.setAttribute('cy', 11);
    circle2.setAttribute('r', '3');
    circle2.setAttribute('fill', 'black');
    svg.appendChild(circle2);


    return svg;

}


function createSVG_1() {  // Gera svg da peça 1

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '45');
    svg.setAttribute('height', '45');

    
        // =========== //
        // Set Circles //
        // =========== //


    let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute('cx', 22.5);
    circle1.setAttribute('cy', 22.5);
    circle1.setAttribute('r', '3');
    circle1.setAttribute('fill', 'black');
    svg.appendChild(circle1);
    

    return svg;

} 


function createSVG_0() {  // Gera svg da peça 0
    
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '45');
    svg.setAttribute('height', '45');


    return svg;
}





























































// function addSVGtoTable(svg) {
//     let table = document.querySelector('#table');
//     table.appendChild(svg.cloneNode(true));
// }


// for (let i = 0; i < 7; i++) {
//     let piece = document.createElement('div');
//     piece.classList.add('domino-piece');
//     piece.appendChild(createSVG_1());
//     pieces.appendChild(piece);
// }

// let pieces = document.getElementById('player-hand');
