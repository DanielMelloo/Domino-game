
// http://127.0.0.1:5500/game/teste1.html


// (obj) --> Key

// (gameComponentsList[obj]) --> Value


// Apaga o menu

// let menu = document.querySelector('#menu');
// menu.style.display = "none";


// // Mostra o Jogo

// let gameComponentsList = {
//     '.handbox': 2,
//     '.horizontalBox': 29,
//     '.verticalBox': 26,
//     // '.UsableRectangleW': 55,
//     // '.UsableRectangleH': 55,
// };


// for (let obj in gameComponentsList) {   

// let k = document.querySelectorAll(obj);
    
//     for (let i = 0; i < gameComponentsList[obj]; i++ ){
        
//             k[i].classList.remove('classNone');
//             console.log ()
//     }
// }



// ============================ //
//         Daniel Space         //
// ============================ //



let player1HandBox = document.getElementById('player1HandInner'); // Hand Player1 para parâmetro
let player2HandBox = document.getElementById('player2HandInner'); // Hand Player2 para parâmetro

let idPieces = 1 // contador de ids para diferenciar ids (será substituido)




function updateTable(){

    let parentPiece = generatePiece();
   someBox.appendChild(parentPiece);
    
}

function updateHandP(){

    // generatePiece (playerHandBox)
    let parentPiece = generatePiece ();
    player1HandBox.appendChild(parentPiece);
    parentPiece.setAttribute("class", "handSlot");

}

function initHand (){
    
    for ( let i = 0 ; i < 7 ; i++ ){                // Começa com 7 peças (escolha de implementação)
        
        let parentPiece = generatePiece ();     1   // Gera 1 peça
        let idPiece = parentPiece.id;               // Atribui a id da peça gerada
        
        parentPiece.setAttribute ('class', 'handSlot'); // Atribui a classe handSlot

        parentPiece.setAttribute ('onclick', 'handPieces("' + idPiece + '")' ); // a função de clique na peça referenciando ela mesma
        player1HandBox.appendChild (parentPiece)     // torna a peça parte da hand
    }       
}



function generatePiece (){  // Gera uma peça e retorna ela
    
    // ======================== //
    // Seta Informaçãoes da div //
    // ======================== //


    let parentPiece = document.createElement('div');     // Cria uma div 
    parentPiece.setAttribute('id', 'slotId' + idPieces); // Atribui um id para essa div

    idPieces++;                                          // Aumenta o contador de ids (mudar para id das peças no jogo)

    // ================== //
    // seta filhos da div //
    // ================== //



    // ======= //
    // Side Up //
    // ======= //
    
    let child1 = document.createElement('div');     // Cria uma div (será SideUp)
    parentPiece.appendChild (child1)                     // Tornna essa div descendente de parentPiece
    child1.setAttribute('class', 'sideup');         // Atribui uma classe para essa div para estilização

    // =========== //
    // Def do svg1 //
    // =========== //

    // let svg1 = document.getElementById("values_svg").children[0].cloneNode(true);   // Cria um svg da respectiva peça solicitada
    let svg1 = createSVG_3()
    child1.appendChild(svg1);                       // Tornna esse svg descendente de child1


    // ========= //
    // Side Down //
    // ========= //

    let child2 = document.createElement('div');     // Cria uma div (será SideDown)
    parentPiece.appendChild (child2)                     // Tornna essa div descendente de parentPiece
    child2.setAttribute('class', 'sideDown');       // Atribui uma classe para essa div para estilização
    

    // =========== //
    // Def do svg2 //
    // =========== //

    // let svg2 = document.getElementById("values_svg").children[0];   // Cria um svg da respectiva peça solicitada
    let svg2 = createSVG_5()
    child2.appendChild(svg2);                       // Tornna esse svg descendente de child1


    return parentPiece
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















// ============================= //
//         Gabriel Space         //
// ============================= //

















































// ============================ //
//         Rafael Space         //
// ============================ //


// function createSVG_6() {

//     let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     svg.setAttribute('width', '45');
//     svg.setAttribute('height', '45');
    
//     for(let i = 0; i < 6; i++) {
//         let cx = (i % 2 === 0) ? 12 : 34;
//         let cy = 11 + (i * 11.5);
//         let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//         circle.setAttribute('cx', cx);
//         circle.setAttribute('cy', cy);
//         circle.setAttribute('r', '3');
//         circle.setAttribute('fill', 'black');
//         svg.appendChild(circle);
//     }
    
//     return svg;
// }


// function createSVG() {
//     // Cria o elemento SVG
//     let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     svg.setAttribute("width", "45");
//     svg.setAttribute("height", "45");

//     // Cria o elemento rect
//     let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
//     rect.setAttribute("x", "0");
//     rect.setAttribute("y", "0");
//     rect.setAttribute("width", "100%");
//     rect.setAttribute("height", "100%");
//     rect.setAttribute("style", "filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));;opacity:0");

//     svg.appendChild(rect);
//     // Cria os elementos circle
//     let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     circle1.setAttribute("cx", "12");
//     circle1.setAttribute("cy", "11");
//     circle1.setAttribute("r", "3");
//     circle1.setAttribute("fill", "black");

//     let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     circle2.setAttribute("cx", "12");
//     circle2.setAttribute("cy", "22.5");
//     circle2.setAttribute("r", "3");
//     circle2.setAttribute("fill", "black");

//     let circle3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     circle3.setAttribute("cx", "12");
//     circle3.setAttribute("cy", "34");
//     circle3.setAttribute("r", "3");
//     circle3.setAttribute("fill", "black");

//     let circle4 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     circle4.setAttribute("cx", "34");
//     circle4.setAttribute("cy", "11");
//     circle4.setAttribute("r", "3");
//     circle4.setAttribute("fill", "black");
//     svg.appendChild(circle4);
//     let circle5 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     circle5.setAttribute("cx", "34");
//     circle5.setAttribute("cy", "22.5");
//     circle5.setAttribute("r", "3");
//     circle5.setAttribute("fill", "black");
//     svg.appendChild(circle5);

//     let circle6 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     circle6.setAttribute("cx", "34");
//     circle6.setAttribute("cy", "34");
//     circle6.setAttribute("r", "3");
//     circle6.setAttribute("fill", "black");
//     svg.appendChild(circle6);


// }

// createSVG();



    // let svg_valor = getElementById("values_svg").children[0];



    // <rect x="0" y="0" width="100%" height= "100%"
    // style="filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));;opacity:0" />

    // <circle cx="12" cy="11" r="3" fill="black"/>
    // <circle cx="12" cy="22.5" r="3" fill="black"/>
    // <circle cx="12" cy="34" r="3" fill="black"/>

    // <circle cx="34" cy="11" r="3" fill="black"/>
    // <circle cx="34" cy="22.5" r="3" fill="black"/>
    // <circle cx="34" cy="34" r="3" fill="black"/>







    















// modificações de movimentação 

// function updateOpponentHand(piecesRemaining) {
//     const opponentHand = document.querySelector(".opponent");
//     for (let i = 0; i < 7; i++) {
//         const handSlot = opponentHand.children[i];
//         if (i < piecesRemaining) {
//             handSlot.classList.remove("remaining-0");
//             handSlot.classList.add("remaining-" + (piecesRemaining - i));
//         } else {
//             handSlot.classList.remove("remaining-" + (piecesRemaining - i));
//             handSlot.classList.add("remaining-0");
//         }
//     }
// }
// function play_piece_on_hand(idPiece) {
//     var position = piece01;
//     play_piece(position);
// }
// function hideOpponentHand() {
//     const opponentHand = document.querySelectorAll('.opponent .handSlot');
//     opponentHand.forEach(piece => {
//         piece.classList.add('hidden');
//     });
// }

// function showOpponentHand() {
//     const opponentHand = document.querySelectorAll('.opponent .handSlot');
//     opponentHand.forEach(piece => {
//         piece.classList.remove('hidden');
//     });
// }


// function hideOpponentHand() {
//     document.querySelector('.opponent').classList.add('hide-opponent-hand');
// }

// function showOpponentHand() {
//     document.querySelector('.opponent').classList.remove('hide-opponent-hand');
// }
// // Quando é a vez do inimigo jogar
// showOpponentHand();
// // faz a jogada
// hideOpponentHand();




















    
    // class ='handSlot' 
    // id = 'slotId' + idDaPeça

        


// (function generatePiece(){
    
//     let l1 = document.querySelector('#');
    
//     // ============ //
//     // Rodar função //
//     // ============ //
    
//     l1.addEventListener('click', function generatePiece(){
    
//         // ============= //
//         // Criando a div //
//         // ============= //

//         let cHDiv = document.createElement('div');

//         // ========= //
//         // Atributos //
//         // ========= //

//         cHDiv.classList.add('horizontalPiece');
//         // cDiv.id.add('piece01')

//         // ========== //
//         // Posicionar //
//         // ========== //

//         let containerEl = document.querySelector('#table');
//         containerEl.appendChild (cHDiv);

//         piecesPlaced++;
//         console.log(piecesPlaced);

//     })
// }())


// ================== //
// |  Gabriel-Zone  | //
// ================== //



function generate_piece_svg(value_up, value_down){  // Gera uma peça e retorna ela

    let piece_frame_svg = document.createElement('div');     // Cria uma div 
    let value_up_svg = document.getElementById("template_values_svg").children[value_up].cloneNode(true);
    let value_down_svg = document.getElementById("template_values_svg").children[value_down].cloneNode(true);
   
    piece_frame_svg.setAttribute("class", "handSlot");
    piece_frame_svg.appendChild(value_up_svg);
    piece_frame_svg.appendChild(value_down_svg);

    return piece_frame_svg;
}

function add_piece_svg_hand(piece_svg){ // transformar em metodo
    
    this.hand_div;

    let player_hand_div = document.getElementById('playerHandInner');
    player_hand_div.appendChild(parentPiece);
    parentPiece.setAttribute("class", "handSlot");
    
    
}