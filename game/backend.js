////////////////////////////////////////
// Consts:
////////////////////////////////////////

const left = 0;
const right = 1;
const human = 0;
const bot = 1;
const no = 0;
const yes = 1;
const yes_rotate = 2;
const empty = 0; 

////////////////////////////////////////

////////////////////////////////////////
// classes:
////////////////////////////////////////

// classe das peças
class Piece {
    constructor(value_left, value_right){ 

        this.value = new Array();
        this.value[left] = value_left;
        this.value[right] = value_right;
        
        this.playable = new Array();
        this.playable[left] = no;
        this.playable[right] = no;
        // this.piece_svg = generate_piece_svg(value_left, value_right);
        this.piece_svg = generatePiece(value_left, value_right);
        this.piece_svg.setAttribute('class', 'handSlot');

    }
    string(){ // (W.I.P)
        return "["+this.value[left]+"|"+this.value[right]+"]";
    }
    rotate(){
        let temp = this.value[left];
        this.value[left] = this.value[right];
        this.value[right] = temp;    

        this.update_playable();
    }
    is_mirror(){ // (W.I.P)
        if(this.value[left] == this.value[right]){
            return true;
        } else {
            return false;
        }
    }
    sum(){
        return (this.value[left] + this.value[right]);
    }
    check_playable(side) { // verifica se a peça é jogavel
        
        let piece = this;

        if(side === left) {
            const first = 0;

            if((table[first].value[left]) === (piece.value[right])) {
                return yes;
            } else if ((table[first].value[left]) === (piece.value[left])) {
                return yes_rotate;
            } else {
                return no;
            }

        } else if(side === right) {
            const last = ((table.length)-1);

            if((table[last].value[right]) === (piece.value[left])) {
                return yes;
            } else if((table[last].value[right]) === (piece.value[right])) {
                return yes_rotate;
            } else {
                return no;
            }
        }
    }
    update_playable() { // atualiza o status se peça é jogavel
        this.playable[left] = this.check_playable(left);
        this.playable[right] = this.check_playable(right);
    }
}

class Player {
    constructor(name = "generic", input_type = "bot", hand_div_id){
        this.name = name;
        this.hand = new Array();
        this.hand_div = document.getElementById(hand_div_id);
        this.score = 0;
        this.can_play;
        this.input_type = input_type;
    }
    add_piece_svg_to_hand_div(piece_svg){ // transformar em metodo (Gabriel)
        
        this.hand_div.appendChild(piece_svg);

    }
    draw_piece(quantity = 1) { // compra uma peça da pilha inicial
        if(quantity <= shop.length){
            for(var i = 0; i < quantity; i++){
                var piece = shop.pop();                
                this.hand.push(piece);
                this.add_piece_svg_to_hand_div(piece.piece_svg);
            }
            return piece.string();
        } else {
            console.log("error: not enough pieces!");
            return false;
        }
    }
    print_hand() { // imprime cada peça da mão do jogador no terminal, e a posição em que ela está
        console.log("------------------------------");
        console.log(">>>> [Printing Hand"+this.name+"] <<<<");
        for(var i = 0; i < this.hand.length; i++){
            console.log("Piece "+i+": "+this.hand[i].string());
        }
        console.log("------------------------------");
    }
    print_playables() { // imprime cada peça da mão do jogador que podem ser jogadas na hora
        console.log("------------------------------");
        console.log(">>>> [Printing-Playables: "+this.name+"] <<<<");
        
        let piece;

        for(var i = 0; i < this.hand.length; i++){
            
            piece = this.hand[i];

            if(piece.playable[left] === yes || piece.playable[right] === yes) {
            
                console.log("Piece "+i+": "+piece.string()+" {Playable}.");
                
                if(piece.playable[left] === yes) {
                    console.log("left: yes.");
                } else if(piece.playable[left] === yes_rotate) {
                    console.log("left: yes_rotate.");
                } else {
                    console.log("left: no.");
                }
                if(piece.playable[right] === yes) {
                    console.log("right: yes.");
                } else if(piece.playable[right] === yes_rotate) {
                    console.log("right: yes_rotate.");
                } else {
                    console.log("right: no.");
                }
            }
        }
    }
    print_hand_playables() { // imprime cada peça da mão do jogador que podem ser jogadas na hora
        console.log("------------------------------");
        console.log(">>>> [Printing-Playables: "+this.name+"] <<<<");
        
        let piece;

        for(var i = 0; i < this.hand.length; i++){
            
            piece = this.hand[i];
            
            if(piece.playable[left] >= yes || piece.playable[right] >= yes){
                console.log(">> Piece "+i+": "+piece.string()+" {Playable}");

                switch (piece.playable[left]) {
                    case yes:
                        console.log("left: yes.");    
                        break;
                    case yes_rotate:
                        console.log("left: yes_rotate.");
                        break;
                    case no:
                        console.log("left: no.");
                        break;
                    default:
                        console.log("left: Error.");
                        break;
                } switch (piece.playable[right]) {
                    case yes:
                        console.log("right: yes.");    
                        break;
                    case yes_rotate:
                        console.log("right: yes_rotate.");
                        break;
                    case no:
                        console.log("right: no.");
                        break;
                    default:
                        console.log("right: Error.");
                        break;
                }
            } else {
                console.log("> Piece "+i+": "+piece.string());
                console.log("left: no.");
                console.log("right: no.");
            }
        } 
        console.log("------------------------------");
    }
    update_playables() { // 
        console.log(">>>> [Updating-Playables: "+this.name+"] <<<<");
        for(let i = 0; i < this.hand.length; i++) {
            this.hand[i].update_playable();
        }
        this.update_can_play();
    }
    update_can_play() { //
        
        let player = this;

        // iterar por todas as peças.
        for(let i = 0; i < player.hand.length; i++){
            for(let j = 0; j < player.hand[i].playable.length; j++){
                if((player.hand[i].playable[j] === yes) || (player.hand[i].playable[j] === yes_rotate)) { // se uma achada como jogavel, retornar true.
                    player.can_play = true;
                    return true;
                }
            }
        }

        // caso não retornar falso.
        player.can_play = false;
        return false;
    }
    
    hand_is_empty() {
        if(this.hand.length == 0){
            return true;
        } else {
            return false;
        }
    }
    play_piece(position, side = right) {
        if(this.hand[position].playable[side] === yes_rotate) {
            this.hand[position].rotate();
        }

        if(this.hand[position].playable[side] === yes) {
            if(side == left) { // jogar na ponta esquerda da mesa
                // this.set_left(position);
                var piece = remove_piece(this.hand, position);
                table.unshift(piece);
                return true;
            } else if(side == right) { // jogar na ponta direita da mesa
                // this.set_right(position);
                var piece = remove_piece(this.hand, position);
                console.log("[Playing Piece "+position+"]");
                table.push(piece);
                return true;
            } else {
                console.log("error: invalid play!");
                return false;
            }
        }
        else{
            console.log("unexpected error: Player.play_piece()");
            return false;
        }
    }
    hand_sum() {
        let player = this;
        let total = 0;

        for(let i = 0; i < player.hand.length; i++){
            total += player.hand[i].sum();
        }

        return total;
    }
    /* set_left(hand_position) { // (obsoleta) joga uma peça escolhida da mão do jogador na ponta esquerda da sequencia da mesa se possivel (é escolhida pela numeração mostrada no method print_hand())

        if(hand_is_empty(table)){
            var piece = remove_piece(this.hand, hand_position);
            table.unshift(piece);
            return 1;
        } else if((table[0].value_left) == (this.hand[hand_position].value_right)) {
            var piece = remove_piece(this.hand, hand_position);
            table.unshift(piece);
            return 1;
        } else if((table[0].value_left) == (this.hand[hand_position].value_left)) {
            var piece = remove_piece(this.hand, hand_position);
            piece.rotate();
            table.unshift(piece);
            return 1;
        } else {
            console.log('not empty or incompatible');
            return 0;
        }
    } */
    /* set_right(hand_position) { //(obsoleta)joga uma peça escolhida da mão do jogador na ponta direita da sequencia da mesa

        if(hand_is_empty(table)){
            var piece = remove_piece(this.hand, hand_position);
            console.log("[Playing Piece "+hand_position+"]");
            table.push(piece);
            return 1;
        } else if((table[table.length-1].value_right) == (this.hand[hand_position].value_left)) {
            var piece = remove_piece(this.hand, hand_position)
            table.push(piece);
            return 1;
        } else if((table[table.length-1].value_right) == (this.hand[hand_position].value_right)) {
            var piece = remove_piece(this.hand, hand_position)
            piece.rotate();
            table.push(piece);
            return 1;
        } else {
            console.log('not empty or incompatible');
            return 0;
        }
    } */
    /* check_can_play() { // (obsoleta) retorna quantas peças que estão na mão do jogador que ele pode jogar na hora

        let how_many = 0;
        
        for(let i = 0; i < this.hand.length; i++){
            if(this.check_fit_left(i)){
                how_many++;
            }
            if(this.check_fit_right(i)){
                how_many++;
            }
        }

        // compra peça se não puder jogar
        // passa o turno se não puder jogar ou comprar

        return how_many;
        
    } */
    reset_score() {
        this.score = 0;
    }
    reset_hand() {
        let player = this;
        player.hand = new Array();
        return true;
    }
    add_score(points) {
        this.score += points;
    }
    
}

////////////////////////////////////////

////////////////////////////////////////
// functions:
////////////////////////////////////////

function generate_pile(pile) { // gera a pilha inicial de peças. 
    
    let svgs = document.getElementById("template_values_svg").children;

    for(let i = 0; i <= 6; i++){
        pile.push(new Piece(i,i));
    }
    for(let i = 0; i <= 6; i++){
        for(let j = i; j <= 6; j++){
            if(!(i === j)){
                pile.push(new Piece(i,j));
            }
        }
    }
}



function print_pile(pile) { // imprime no console as peças de grupo de peças
    
    let last = ((pile.length)-1)

    for(let i = 0; i <= last; i++){
        console.log("Piece "+i+":"+pile[i].string())
    }

}
function print_shop() {
    console.log("--------------------------");
    console.log(">>>> [Printing-Shop] <<<<");
    print_pile(shop);
    console.log("--------------------------");
}
function print_table() {
    console.log("--------------------------");
    console.log(">>>> [Printing-Table] <<<<");
    print_pile(table);

    let first = 0;
    let last = table.length-1;
    let tail = [table[first].value[left], table[last].value[right]];
    console.log("Left: "+tail[left]+" Right: "+tail[right]);

    console.log("--------------------------");
}
function shuffle_pile(pile) {

    let last = (pile.length - 1)
    
    for(let i = last; i > 0; i--){
        
        let j = Math.floor(Math.random() * (i + 1)); // numero aleatorio
        
        let temp = pile[i];
        pile[i] = pile[j];
        pile[j] = temp;
    }
}
function draw_piece(pile, player, quantity = 1) { // passa uma peça da pilha de compra para o jogador (ou BOT)
    
    for(let i = quantity; i > 0; i--){
        let tmp = pile.pop()
        player.hand.push(tmp)
    }
    
}
function remove_piece(pile, position) { // remove uma peça de um grupo de peças (contagem começa do 1, não do 0)
    return pile.splice((position), 1)[0];
}
function check_empty(pile) { // verifica se tem peças na mesa

    return Boolean(!(pile.length));
}
function going_first() {

    // (temp) precisa retornar objeto do jogador vencedor
    let winner_position = (-1);
    let mirrored = new Array();
    let highest_value = new Array();
    let highest_position = new Array();

    // inicializando as variaveis
    
    mirrored[human] = false;
    mirrored[bot] = false;
    highest_value[human] = (-1);
    highest_value[bot] = (-1);

    // testando peças espelhadas
    for(let i = 0; i < player_list.length; i++){ // itera por cada jogador
        for(let j = 0; j < player_list[i].hand.length; j++){ // itera por cada peça na mão do jogador
            if((player_list[i].hand[j].is_mirror()) && ((player_list[i].hand[j].value[left]) > (highest_value[i]))){  // verifica se é espelhado, soma dois valores, compara com o ultimo valor.
                highest_position[i] = j;
                highest_value[i] = player_list[i].hand[j].value[left];
                mirrored[i] = true;
            }
        }
    }
    
    if((mirrored[human] === true) && (mirrored[bot] === true)) { // se ambos tiverem peça espelhada, quem tiver a de maior valor, ganha.
        if(highest_value[human] > highest_value[bot]){
            winner = player_list[human];
            winner_position = highest_position[human];
            
        } else if(highest_value[bot] > highest_value[human]) {
            winner = player_list[bot];
            winner_position = highest_position[bot];
        } else { // error testing 1.
            console.log("ERROR:1");
        }
    } else if((mirrored[human] === true) && (mirrored[bot] === false)) { // se somente o human tiver a espelhada, o human ganha.
        winner = player_list[human];
        winner_position = highest_position[human];
    } else if((mirrored[bot] === true) && (mirrored[human] === false)){ // se somente o bot tiver a espelhada, o bot ganha.
        winner = player_list[bot];
        winner_position = highest_position[bot];
    } else if((mirrored[human] === false) && (mirrored[bot] === false)){ // se nenhum que tiver peça espelhada, vão ser comparadas as não-espelhadas
        
        // reiniciando array que guarda maiores valores.
        highest_value[human] = (-1);
        highest_value[bot] = (-1);

        for(let i = 0; i < player_list.length; i++){ // itera por cada jogador
            for(let j = 0; j < player_list[i].hand.length; j++){ // itera por cada peça na mão do jogador
                if(((player_list[i].hand[j].sum()) > (highest_value[i]))){  // compara com o ultimo valor.
                    highest_position[i] = j;
                    highest_value[i] = player_list[i].hand[j].sum();
                }
            }
        }

        
        if(highest_value[human] > highest_value[bot]){ // se o human tiver a peça não-espelhada de maior soma de valores, então human ganha.
            winner = player_list[human];
            winner_position = highest_position[human];
        } else if(highest_value[bot] > highest_value[human]){ // se o bot tiver a peça não-espelhada de maior soma de valores, então bot ganha.
            winner = player_list[bot];
            winner_position = highest_position[bot];
        } else { // error testing 2.
            console.log("ERROR:2"); 
        }
    } else { // (Somente para debugging)
        console.log("fatal-error!!!");
        console.log(mirrored[human]);
        console.log(mirrored[bot]);
        console.log(highest_value[human]);
        console.log(highest_value[bot]);
        console.log(highest_position[human]);
        console.log(highest_position[bot]);
        console.log(winner_position);
    }
    
    // o jogador que ganhar só poderá jogar a peça ganhadora no primeiro turno do jogo.
    for(let i = 0; i < winner.hand.length; i++){ // itera por todas as peças na mão do jogador.
        for(let j = 0; j < winner.hand[i].playable.length; j++){ 
            winner.hand[i].playable[j] = no; // marca como não jogavel em ambos os lados da mesa.
        }
    }

    for(let i = 0; i < winner.hand[winner_position].playable.length; i++){ // marca somente a peça ganhadora como jogavel.
        winner.hand[winner_position].playable[i] = yes;
    }
    
    console.log("First: "+winner.name);

    return winner;
}
/* function change_player() {
    if(current_player === player_list[human]){
        console.log("--------------------------");
        console.log("[changing to: "+player_list[bot].name+"]");
        console.log("--------------------------");
        current_player = player_list[bot];
        console.log("--------------------------");
    } else {
        console.log("--------------------------");
        console.log("changing to: "+player_list[human].name);
        current_player = player_list[human];
        console.log("--------------------------");
    }
    current_player.update_playables();
    current_player.update_can_play();
} */
function change_player() {
    
    let next;
    
    if(current_player === player_list[human]){
        next = player_list[bot];
    } else {
        next = player_list[human];
    }

    console.log("changing to: "+next.name+"");
    current_player = next;

    current_player.update_playables();
}
function ask_play(position, side) {
    console.log("Chosen: "+position+" Side: "+ side);
    current_player.play_piece(position, side); 
    current_player.update_playables();
    return true;
}
function ask_play_prompt() {
    
    let position;
    let side = right;
    
    position = prompt("which piece: ");

    if(table.length) {
        side = prompt("which side:\n0: Left\n1: Right");
    }
    
    ask_play(position, side);
    
    return true;
}
function bot_play(mode = "easy"){

    switch(mode){
        case "easy": // broken here 20230120
            for(let position = 0; position < (player_list[bot].hand.length); position++){
                for(let side = 0; (side < player_list[bot].hand[position].playable.length); side++){
                    if(player_list[bot].hand[position].playable[side] === true){
                        ask_play(position, side);
                        return true;
                    }
                }
            }
            break;

        case "hard":
            let highest_sum = -1;
            for(let position = 0; position < (current_player.hand.length); position++){
                for(let side = 0; side < (current_player.hand[position].playable.length); side++){
                    if(current_player[position].playable[side] === true && current_player[position].sum() > highest_sum){
                        highest_sum = current_player[position].sum();
                        highest_sum_position = position;
                        highest_sum_side = side;
                    }
                }
                if(highest_sum >= 0){
                    ask_play(highest_sum_position, highest_sum_side);
                } else {
                    console.error("Error: AI hard mode");
                }
            }   
            break;

        case "mittens":
            break;

        default:
            console.error("error");
        
    }
    
    

}
function check_shop_empty() {
    if(shop.length === empty){
        return true;
    } else {
        return false;
    }
}
function match_over() {
    
    let over = false;

    if(player_list[human].hand_is_empty()) {
        var winner = player_list[human];
        var loser = player_list[bot];
        over = true;
        console.log("hand-empty: "+winner.name);
    } else if(player_list[bot].hand_is_empty()) {
        var winner = player_list[bot];
        var loser = player_list[human];
        over = true;
        console.log("hand-empty: "+winner.name);

    } else if((player_list[human].can_play === false) && (player_list[bot].can_play === false)) {
        // test who wins...
        if((player_list[human].hand.length) < (player_list[bot].hand.length)) {
            // human win.
            var winner = player_list[human];
            var loser = player_list[bot];
            over = true;
        } else if((player_list[bot].hand.length) < (player_list[human].hand.length)) {
            // bot win.
            var winner = player_list[bot];
            var loser = player_list[human];
            over = true;
        } else {
            
            if((player_list[human].hand_sum()) < (player_list[bot].hand_sum())) {
                var winner = player_list[human];
                var loser = player_list[bot];
                over = true;
            } else if ((player_list[bot].hand_sum()) < (player_list[human].hand_sum())) {
                var winner = player_list[bot];
                var loser = player_list[human];
                over = true;
            } else {
                console.log("IMPOSSIBLE!!!");
            }
        }
    } else {
        console.log(">>> Next-Turn <<<");
    }

    if(over) {
        let points = loser.hand_sum();
        winner.add_score(points);
        console.log("=========================================");
        console.log(">>>> Match-Winner: ["+winner.name+"] <<<<");
        console.log("added points: "+points);
        console.log("=========================================");
        alert(">>>> Match-Winner: ["+winner.name+"] <<<<"+"\n"+"added points: "+points);
        return true;
    } else {
        return false;
    } 
}
function game_over(){
    for(let player of player_list){
        if(player.score >= 100){
            console.log(">>> Winner: "+player.name+" <<<");
            return true;
        } else {
            console.log(">>> Next-Game <<<");
            return false;
        }
    }          
}

function restart(){

    let answer;
    do {
        answer = prompt("Play againg?\n1: yes\n0: no");
    }while(answer < 0 || answer > 1);

    return answer;
    
}



function game(mode = "Jogador vs Bot"){

    // ============ //
    // Apaga o menu //
    // ============ //

    let menu = document.querySelector('#menu');
    menu.style.display = "none";

    // ============= //
    // Mostra o Jogo //
    // ============= //


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

    switch(mode) {

        case "Jogador vs Bot":
            // alert("jogador!");
            break;
        
        case "Bot vs Bot":
            // alert("bot!");
            break;
    
        default:
            // alert("erro!");
            break;
    
    }


    do {
        do {
            
            dificulty_mode = "easy";

            player_list[human] = new Player("Generic-1", "Jogador", "player1HandInner"); // objeto que representa o jogador
            player_list[bot] = new Player("Generic-2", "Bot", "player2HandInner"); // objeto que representa o BOT

            for(let player of player_list){
                player.reset_score();
                player.reset_hand();
                player.can_play = false;
            }

            table = new Array();
            shop = new Array();

            // gerando as peças do shop.
            generate_pile(shop);
            shuffle_pile(shop);
    
            //comprando peças.
            player_list[human].draw_piece(hand_size); 
            player_list[bot].draw_piece(hand_size);
    
            // decidindo qual jogador joga primeiro.
            current_player = going_first();
            
            // começando a primeira jogada.
            // mostra quais peças podem ser jogadas atualmente.
            current_player.print_hand_playables();
            
            // pergunta qual peça o jogador quer jogar.
            switch(current_player) {
                case player_list[human]:
                    ask_play_prompt();
                    break;
                case player_list[bot]:
                    bot_play(dificulty_mode);
                    break;
            }
            
            // mostrar a mesa com a peça jogada.
            print_table();
    
    
            do { // gameplay loop da partida.
    
                // mudar de jogador (automaticamente atualiza as peças que podem ser jogadas para o jogador seguinte).
                change_player();
        
                // se não tive peças jogaveis & o shop não estiver vazio, comprar peça.
                while(current_player.can_play === false) {
                    if(check_shop_empty() === false) { // verifica se ainda tem peças para comprar
                        
                        let drawn = current_player.draw_piece(1); // compra peça
                        console.log("Can't Play | piece-drawn: "+drawn);
                        current_player.update_playables();
                    } else { 
                        console.log("[shop-empty, draw]");
                        break; // sai do loop se não houverem mais peças para compras
                    }
                }
        
                if(current_player.can_play) {
                    print_table();
                    // mostra quais peças podem ser jogadas.
                    current_player.print_hand_playables();
                    // pergunta qual peça o jogador quer jogar.
                    
                    switch(current_player) {
                        case player_list[human]:
                            ask_play_prompt();
                            break;
                        case player_list[bot]:
                            bot_play(dificulty_mode);
                            break;
                    }
                    
                    // ask_play_prompt(); // (...) (switch-case)   
                    // mostrar a mesa com a peça jogada.
                    print_table();
                }
        
            } while(match_over() === false);
        }while(game_over() === false);
    }while(restart());
    console.log("[Game-Over]");

    return true;
}

function generate_piece_svg(value_up, value_down){  // Gera uma peça e retorna ela (Gabriel)

    let piece_frame_svg = document.createElement('div');     // Cria uma div 
    let value_up_svg = document.getElementById("template_values_svg").children[value_up].cloneNode(true);
    let value_down_svg = document.getElementById("template_values_svg").children[value_down].cloneNode(true);
   
    piece_frame_svg.setAttribute("class", "handSlot");
    piece_frame_svg.appendChild(value_up_svg);
    piece_frame_svg.appendChild(value_down_svg);

    // class="handSlot" id="slotId1"

    return piece_frame_svg;
}

////////////////////////////////////////

////////////////////////////////////////
// Main:
////////////////////////////////////////

    // declaração

    let hand_size; // quantidade inicial de peças
    let player_name;
    let player_list;
    let table; // objeto que representa o grupo de peças na mesa
    let shop; // objeto que representa a pilha de compra
    let current_player;

    hand_size = 7; // quantidade inicial de peças
    player_name = "Jogador1";
    
    // criando players.
    player_list = new Array();
    

    

    // (to-do) criar Função para mudar o turno de jogadores. change_player()                                    {Pronto!}
    // (to-do) Metodo na Classe Player para mostrar peças jogaveis.  Player.print_playables()                   {Pronto!}
    // (to-do) criar Função para perguntar qual peça jogar. ask_play()                                          {Pronto!}
    // (to-do) Metodo na Classe Player para verificar se o jogador está com a mão vazia. Player.check_empty()   {Pronto!}
    // (to-do) criar Função "check_shop_empty()".                                                               {Pronto!}
    // (to-do) criar mecanica para verificar se ambos os jogadores ainda podem podem jogar. 
    // (to-do) calcular quantidade de pontos para o que ganha. score_calculation()
    
////////////////////////////////////////

//Usar a função de exibição de mensagem quando ocorre uma jogada inválida:

/* if (!is_valid_move(move)){
    show_error_message("Invalid move. Please try again.")

    return 
} */


// const playButton = document.querySelector('#play-button');
// playButton.addEventListener('click', play_game);
// function updateBoard() {
//     const board = document.querySelector("#board");
//     // Use o código já existente para atualizar o tabuleiro com as peças
//     // ex: board.innerHTML = getBoardHTML()
// }

//function isValidMove(move) {
    // Use o código já existente para validar a jogada
    // ex: return isValidMove(move);
//}
// const playButton = document.querySelector("#play-button");
// playButton.addEventListener("click", function() {
//     const move = getPlayerMove();
//     if (isValidMove(move)) {
//         updateBoard();
//     } else {
//         // Exibir mensagem de erro para jogada inválida
//     }
// });

/* // Daniel
const hand = document.querySelector("#hand");
hand.addEventListener("click", selectPiece);
hand.addEventListener("dragstart", dragPiece);

const board = document.querySelector("#board");
board.addEventListener("drop", dropPiece);
board.addEventListener("dragover", allowDrop);

// const playButton = document.querySelector("#play-button");
playButton.addEventListener("click", play_game);

function play_game() {
    const move = getPlayerMove();
    if (isValidMove(move)) {
        updateBoard();
    } else {
        show_error_message("Invalid move. Please try again.");
    }
}

console.log("daniellllllllllllllll")
const playButton = document.querySelector("#play-button");
playButton.addEventListener("click", function() {
    const result = confirm("Vamos começar a jogar?");
    if (result) {
        // código para iniciar o jogo
    } else {
        // código para cancelar o jogo
    }
});


console.log('Java');

setTimeout(() => {
  console.log('Script');
}, 5000); 

*/


// ========== //
// | Daniel | //  
// ========== //

function generatePiece(value1, value2){  // Gera uma peça e retorna ela
    
    // ======================== //
    // Seta Informaçãoes da div //
    // ======================== //


    let parentPiece = document.createElement('div');     // Cria uma div 
    // parentPiece.setAttribute('id', 'slotId' + idPieces); // Atribui um id para essa div

    // idPieces++;                                          // Aumenta o contador de ids (mudar para id das peças no jogo)

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
    
    let svg1;
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
    
    
    
    let svg2;
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
    
    // let svg2 = createSVG_5()
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