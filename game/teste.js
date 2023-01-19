





    // (obj) --> Key
    
    // (gameComponentsList[obj]) --> Value


let gameComponentsList = {
                    '.handbox': 2,
                    '.UsableRectangleW': 55,
                    '.UsableRectangleH': 55,
};


for (let obj in gameComponentsList) {

    let k = document.querySelectorAll(obj);

    for (let i = 0; i < gameComponentsList[obj]; i++ ){
        k[i].classList.remove('classNone');
    }
    

    console.log (obj)
}
