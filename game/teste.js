
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




//         Daniel Space

let playerHandBox = document.getElementById('playerHandInner');
let someBox= document.getElementById('algo');

let idPieces = 1

function updateHandP(){

    generatePiece (playerHandBox)
}

function updateTable(){

    generatePiece (someBox)
}

function initHand (){
    
    for ( let i = 0 ; i < 7 ; i++ ){
        
        let parent = updateHandP ();
        parent.setAttribute ('class', 'handSlot');
        parent.setAttribute ('onclick', 'handPieces("slotId1")');
    }       
}


function generatePiece(Gparent){
    

    // Seta Informaçãoes da div

    let parent = document.createElement('div');
    Gparent.appendChild(parent);
    parent.setAttribute('id', 'SlotId' + idPieces);

    idPieces++;

    
    // seta filhos da div

    // Side Up
    
    let child1 = document.createElement('div');
    parent.appendChild (child1)
    child1.setAttribute('class', 'sideup');


    // Def do svg1

    let svg1 = document.getElementById("values_svg").children[0].cloneNode(true);
    console.log(svg1);
    child1.appendChild(svg1);



    // Side Down 

    let child2 = document.createElement('div');
    parent.appendChild (child2)
    child2.setAttribute('class', 'sideDown');
    
    // Def do svg2

    let svg2 = document.getElementById("values_svg").children[0];
    child2.appendChild(svg2);


    return parent
}




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







    















//                      Rafael space


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
    // id = 'SlotId' + idDaPeça

        


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