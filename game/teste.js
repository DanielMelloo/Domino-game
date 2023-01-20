



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


hand = [1,2,3,4,5,6,7]


function handPieces(idPiece){
    
    
    
    for (let i in hand){
        let l1 = document.querySelector('#slodId' + i);
        
        console.log (l1)
    }
}
    
function generatePiece (){
    
    // <ddiv class="handSlot" id="slotId1" onclick='play_piece("slotId1")'>]

    handBox =
    
    class='handSlot' 
    id = 'SlotId' + idDaPeça

        


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