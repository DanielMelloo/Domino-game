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