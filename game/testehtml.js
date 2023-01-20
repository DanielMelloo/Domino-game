function game(mode = "Jogador vs Bot"){

    // Apaga o menu

    let menu = document.querySelector('#menu');
    menu.style.display = "none";


    // Mostra o Jogo

    let gameComponentsList = {
        '.handbox': 2,
        '.horizontalBox': 29,
        '.verticalBox': 26,
        // '.UsableRectangleW': 55,
        // '.UsableRectangleH': 55,
    };


    for (let obj in gameComponentsList) {   

    let k = document.querySelectorAll(obj);
        
        for (let i = 0; i < gameComponentsList[obj]; i++ ){
            
                k[i].classList.remove('classNone');
                console.log ()
        }
    }
}