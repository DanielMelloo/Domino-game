/* search keywords:

    - issues:
    - (...)
    - (desnecessario?)
    
*/

// =============== //
// Debug Variables //
// =============== //

let debugMode = false;
let botDrag = false; // Só da pra usar quando o debug mode esta ativo
let botInit = true;

////////////////////////////////////////
// Consts:
////////////////////////////////////////

const left = 0;
const right = 1;
const player1 = 0;
const player2 = 1;
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
        this.piece_svg = generateHandPiece(value_left, value_right);
        // this.onluSvgs = 
        this.piece_svg.setAttribute('class', 'handSlot'); 
        // this.piece_svg.setAttribute('id', '');
        this.piece_svg.setAttribute('ondragstart', 'drag(this)');
        // this.piece_svg.setAttribute('onclick', 'check_playable_onclick()');

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

        if(table.length === empty){
            return yes;
        }

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
        this.update_classes_by_playable();
    }

    update_classes_by_playable (){

        if (this.check_playable(right)){
            this.piece_svg.setAttribute('draggable', 'true');
            this.piece_svg.classList.add('left');
            this.piece_svg.classList.add('playable');
 
        }

        else if (this.check_playable(right)){
            this.piece_svg.setAttribute('draggable', 'true');
            this.piece_svg.setAttribute('ondragstart', 'drag(event)');
            this.piece_svg.classList.add('right');
            this.piece_svg.classList.add('playable');
        }

        else if(!(debugMode && botDrag)){
            
            this.piece_svg.setAttribute('draggable', 'false');
        }
    }
}



class Player {
    constructor(name = "generic", input_type = "Bot", hand_div_id){
        this.name = name;
        this.hand = new Array();
        this.hand_div = document.getElementById(hand_div_id);
        this.score = 0;
        this.can_play;
        this.input_type = input_type; // guarda se o objeto Player é Humano ou Bot
    }

    add_piece_svg_to_hand_div(piece_svg){ // transformar em metodo (Gabriel)
        
        
        if (this.input_type == 'Bot'){
            if (!debugMode){
                setUnview (piece_svg)
            }

        }

        else if (this.input_type == "Jogador"){

        }
        
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
        if (debugMode){
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
    }
    print_hand_playables() { // imprime cada peça da mão do jogador que podem ser jogadas na hora
        
        if (debugMode){
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

            if (debugMode){
                console.log("------------------------------");
            }
        }
    }
    update_playables(){

        if(this.hand.length === empty){
            console.error("error: update_playables, hand empty");
            return false;
        }
        if (debugMode){
            console.log(">>>> [Updating-Playables: "+this.name+"] <<<<");
        }
        for(let i = 0; i < this.hand.length; i++) {
            this.hand[i].update_playable();
            this.hand[i].piece_svg.setAttribute('id', 'slotId' + i); 
            
            if(this.input_type === "Bot" && !(debugMode && b    )){  // se a peça estivar com o bot...

                this.hand[i].piece_svg.setAttribute('draggable', 'false'); // ...remover propriedade "dragable" da peça          
            //     this.piece_svg.setAttribute('draggable', 'false'); // ...remover propriedade "dragable" da peça
            }

        }
        // update_playable();
        
        this.update_can_play();

        return true;
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
    
    hand_is_empty(){
        if(this.hand.length == 0){
            return true;
        } else {
            return false;
        }
    }
    play_piece(position, side = right){
        if(this.hand[position].playable[side] === yes_rotate) {
            this.hand[position].rotate();
        }

        if(this.hand[position].playable[side] === yes) {
            if(side == left) { // jogar na ponta esquerda da mesa
                // this.set_left(position);
                var piece = remove_piece(this.hand, position);
                table.unshift(piece);  
                update_table(piece.value[left], piece.value[right], side);
                piece.piece_svg.remove();
                // console.log(piece.value[left]);
                // console.log(piece.value[right]);
            } else if(side == right) { // jogar na ponta direita da mesa
                // this.set_right(position);
                var piece = remove_piece(this.hand, position);
                console.log("[Playing Piece "+position+"]");
                table.push(piece);
                update_table(piece.value[left], piece.value[right], side);
                piece.piece_svg.remove();
                // console.log(piece.value[left]);
                // console.log(piece.value[right]);
            } else {
                console.log("error: invalid play!");
                return false;
            }
        } else {
            console.log("unexpected error: Player.play_piece()");
            return false;
        }
        
        // this.update_playables(); // (desnecessario?)

        return true;
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
    
    // let svgs = document.getElementById("template_values_svg").children;

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
    if (debugMode)
    {
        console.log("--------------------------");
        console.log(">>>> [Printing-Shop] <<<<");
        print_pile(shop);
        console.log("--------------------------");
    }
    
}
function print_table() {
    if (debugMode){
        console.log("--------------------------");
        console.log(">>>> [Printing-Table] <<<<");
        print_pile(table);

        let first = 0;
        let last = table.length-1;
        let tail = [table[first].value[left], table[last].value[right]];
        console.log("Left: "+tail[left]+" Right: "+tail[right]);
    
        console.log("--------------------------");
    }

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
    
    mirrored[player1] = false;
    mirrored[player2] = false;
    highest_value[player1] = (-1);
    highest_value[player2] = (-1);

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
    
    if((mirrored[player1] === true) && (mirrored[player2] === true)) { // se ambos tiverem peça espelhada, quem tiver a de maior valor, ganha.
        if(highest_value[player1] > highest_value[player2]){
            winner = player_list[player1];
            winner_position = highest_position[player1];
            
        } else if(highest_value[player2] > highest_value[player1]) {
            winner = player_list[player2];
            winner_position = highest_position[player2];
        } else { // error testing 1.
            console.log("ERROR:1");
        }
    } else if((mirrored[player1] === true) && (mirrored[player2] === false)) { // se somente o human tiver a espelhada, o human ganha.
        winner = player_list[player1];
        winner_position = highest_position[player1];
    } else if((mirrored[player2] === true) && (mirrored[player1] === false)){ // se somente o bot tiver a espelhada, o bot ganha.
        winner = player_list[player2];
        winner_position = highest_position[player2];
    } else if((mirrored[player1] === false) && (mirrored[player2] === false)){ // se nenhum que tiver peça espelhada, vão ser comparadas as não-espelhadas
        
        // reiniciando array que guarda maiores valores.
        highest_value[player1] = (-1);
        highest_value[player2] = (-1);

        for(let i = 0; i < player_list.length; i++){ // itera por cada jogador
            for(let j = 0; j < player_list[i].hand.length; j++){ // itera por cada peça na mão do jogador
                if(((player_list[i].hand[j].sum()) > (highest_value[i]))){  // compara com o ultimo valor.
                    highest_position[i] = j;
                    highest_value[i] = player_list[i].hand[j].sum();
                }
            }
        }

        
        if(highest_value[player1] > highest_value[player2]){ // se o human tiver a peça não-espelhada de maior soma de valores, então human ganha.
            winner = player_list[player1];
            winner_position = highest_position[player1];
        } else if(highest_value[player2] > highest_value[player1]) { // se o bot tiver a peça não-espelhada de maior soma de valores, então bot ganha.
            winner = player_list[player2];
            winner_position = highest_position[player2];
        } else { // error testing 2.
            console.log("ERROR:2"); 
        }
    } else { // (Somente para debugging)
        console.log("fatal-error!!!");
        console.log(mirrored[player1]);
        console.log(mirrored[player2]);
        console.log(highest_value[player1]);
        console.log(highest_value[player2]);
        console.log(highest_position[player1]);
        console.log(highest_position[player2]);
        console.log(winner_position);
    }
    
    // o jogador que ganhar só poderá jogar a peça ganhadora no primeiro turno do jogo.
    for(let i = 0; i < winner.hand.length; i++){ // itera por todas as peças na mão do jogador.
        for(let j = 0; j < winner.hand[i].playable.length; j++){ 
            winner.hand[i].playable[j] = no; // marca como não jogavel em ambos os lados da mesa.
        }
        winner.hand[i].piece_svg.setAttribute('id', 'slotId' + i); // marca o indice da peça na mão como id do svg da peça
    }
    
    winner.hand[winner_position].update_playable(); // marca somente a peça ganhadora como jogavel.
    winner.hand[winner_position].piece_svg.setAttribute('id', 'slotId' + winner_position); // marca o indice da peça na mão como id do svg da peça
    if(winner.input_type === "Bot" && !(debugMode && botDrag)){ // transforma em não arrastavel se pertencer ao bot 
        winner.hand[winner_position].piece_svg.setAttribute('draggable', 'false');     
    }
    // botDrag = false
    // !botDrag = true


    // botDrag = true
    // !botDrag = false

    /* for(let i = 0; i < winner.hand[winner_position].playable.length; i++){ // marca somente a peça ganhadora como jogavel.
       
        winner.hand[winner_position].update_playable();
        winner.hand[winner_position].piece_svg.setAttribute('id', 'slotId' + i); 
        // winner.hand[winner_position].playable[i] = yes; // (old!)
        // winner.hand[winner_position].update_classes_by_playable();
    } */

    
    
    if (debugMode){
        console.log("First: "+winner.name);
    }

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
    
    if(current_player === player_list[player1]){
        next = player_list[player2];
    } else {
        next = player_list[player1];
    }

    if (debugMode)
    {
        console.log("changing to: "+next.name+"");
    }
    
    current_player = next;

    // current_player.update_playables();
}
function ask_play(position, side) {
    if (debugMode){
        console.log("Chosen: "+position+" Side: "+ side);
    }

    current_player.play_piece(position, side); 
    current_player.update_playables();
    change_player();
    current_player.update_playables();
    return true;
}
function ask_play_prompt() {
    
    let position;
    let side = right;
    
    // position = prompt("which piece: "); // PROMPT!

    if(table.length) {
        // side = prompt("which side:\n0: Left\n1: Right"); // PROMPT!
    }
    
    ask_play(position, side);
    
    return true;
}
function bot_play(mode = "easy"){

    switch(mode){
        case "easy": // itera pelas peças na mão do BOT procurando a primeira peça que pode ser jogada, e joga ela // broken here 20230120
            for(let position = 0; position < current_player.hand.length; position++){
                for(let side = 0; side < current_player.hand[position].playable.length; side++){
                    if(current_player.hand[position].playable[side] === yes || current_player.hand[position].playable[side] === yes_rotate){       
                        current_player.play_piece(position, side);
                        // ask_play(position, side);
                        return "worked!";
                    }
                }
            }
            console.error("Error: AI easy mode");
            break;

        case "hard":

            let highest_sum = -1;
            let highest_sum_position;
            let highest_sum_side;

            for(let position = 0; position < current_player.hand.length; position++){
                for(let side = 0; side < current_player.hand[position].playable.length; side++){
                    if((current_player.hand[position].playable[side] == true && current_player.hand[position].sum() > highest_sum)){
                        highest_sum = current_player.hand[position].sum();
                        highest_sum_position = position;
                        highest_sum_side = side;
                    }
                }
            }
            
            if (debugMode){
                console.log("highest_sum: "+highest_sum); // debug
                console.log("highest_sum_position: "+highest_sum_position); // debug
                console.log("highest_sum_side: "+highest_sum_side); // debug
            }

            ask_play(highest_sum_position, highest_sum_side); // debug


            // console.error("Error: AI hard mode");

            /* 
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
            } */   
            
            break;

        case "mittens":
            // (W.I.P)
            break;

        default:
            console.error("error");

    }
}
function check_shop_empty(){
    if(shop.length === empty){
        return true;
    } else {
        return false;
    }
}
function match_over(){
    
    let over = false;

    player_list[player1].update_can_play();
    player_list[player2].update_can_play();

    if(player_list[player1].hand_is_empty()){
        var winner = player_list[player1];
        var loser = player_list[player2];
        over = true;
        console.log("hand-empty: "+winner.name);
    } else if(player_list[player2].hand_is_empty()){
        var winner = player_list[player2];
        var loser = player_list[player1];
        over = true;
        console.log("hand-empty: "+winner.name);

    } else if((player_list[player1].can_play === false) && (player_list[player2].can_play === false) && check_shop_empty()){
        // test who wins...
        if((player_list[player1].hand_sum()) < (player_list[player2].hand_sum())){
            // human win.
            var winner = player_list[player1];
            var loser = player_list[player2];
            over = true;
        } else if((player_list[player2].hand_sum()) < (player_list[player1].hand_sum())) {
            // bot win.
            var winner = player_list[player2];
            var loser = player_list[player1];
            over = true;
        } /* else {
            if((player_list[player1].hand_sum()) < (player_list[player2].hand_sum())) {
                var winner = player_list[player1];
                var loser = player_list[player2];
                over = true;
            } else if ((player_list[player2].hand_sum()) < (player_list[player1].hand_sum())) {
                var winner = player_list[player2];
                var loser = player_list[player1];
                over = true;
            } else {
                console.log("IMPOSSIBLE!!!");
            }
        } */
    } else {
        console.log(">>> Next-Turn <<<");
    }

    if(over) {
        let points = loser.hand_sum();
        winner.add_score(points);
        
        if(game_over(winner)){
            return true;
        }
        
        // overlay Daniel
        displayOverlayMatchOn(winner.name, points);


        if(debugMode){
            console.log("=========================================");
            console.log(">>>> Match-Winner: ["+winner.name+"] <<<<");
            console.log("added points: "+points);
            console.log("=========================================");
            alert(">>>> Match-Winner: ["+winner.name+"] <<<<"+"\n"+"added points: "+points);    
        }
        
        return true;
    } else {
        return false;
    } 
}
function game_over(winner){
    for(let player of player_list){
        if(player.score >= 100){

            displayOverlayGameOn(winner.name, winner.score);
            
            if(debugMode){
                console.log(">>> Winner: "+player.name+" <<<");
            }
            
            return true;
        } else {
            if(debugMode){
                console.log(">>> Next-Game <<<");
            }
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
    

    if (mode = "Jogador vs Bot"){
        // player2Hand.setAttribute.children[1].remove()  
    }
    else if (mode = "Bot vs Bot"){
        
    }

    dificulty_mode = "hard"; // tag: change

    player_list[player1] = new Player("Player1", "Jogador", "player1HandInner"); // objeto que representa o jogador
    player_list[player2] = new Player("Player2", "Bot", "player2HandInner"); // objeto que representa o BOT

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
    player_list[player1].draw_piece(hand_size); 
    player_list[player2].draw_piece(hand_size);

    // decidindo qual jogador joga primeiro.
    current_player = going_first();

    if(current_player.input_type === "Bot" && botInit){
        bot_play(dificulty_mode); // Bot faz primeira jogada
    }
    
    // ask_play();


    /* do { // Original gampla 
        do {
            
            dificulty_mode = "hard"; // tag: change

            player_list[human] = new Player("Player1", "Jogador", "player1HandInner"); // objeto que representa o jogador
            player_list[bot] = new Player("Player2", "Bot", "player2HandInner"); // objeto que representa o BOT

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
    
            //

            // player_list[human].update_classes_by_playable();
            // player_list[bot].update_classes_by_playable();
            
            
            // update_classes_by_playable()

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
                        if(debugMode){
                            console.log("Can't Play | piece-drawn: "+drawn);
                        }
                        current_player.update_playables();
                    } else { 
                        if(debugMode){
                            console.log("[shop-empty, draw]");
                        }
                        
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
                    
                    // ask_play_prompt(); // 
                    // mostrar a mesa com a peça jogada.
                    print_table();
                }
        
            } while(match_over() === false);
        }while(game_over() === false);
    }while(restart());
    console.log("[Game-Over]");

    return true;
     */
}

// function generate_piece_svg(value_up, value_down){  // Gera uma peça e retorna ela (Gabriel)

//     let piece_frame_svg = document.createElement('div');     // Cria uma div 
//     let value_up_svg = document.getElementById("template_values_svg").children[value_up].cloneNode(true);
//     let value_down_svg = document.getElementById("template_values_svg").children[value_down].cloneNode(true);
   
//     piece_frame_svg.setAttribute("class", "handSlot");
//     piece_frame_svg.appendChild(value_up_svg);
//     piece_frame_svg.appendChild(value_down_svg);

//     // class="handSlot" id="slotId1"

//     return piece_frame_svg;
// }

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
    player_list[player1] = new Player("Player1", "Jogador", "player1HandInner"); // objeto que representa o jogador
    player_list[player2] = new Player("Player2", "Bot", "player2HandInner"); // objeto que representa o BOT
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
*/




// =============================== //
// |         Daniel Init         | //
// =============================== //

/** Componentes que deverão aparecer após iniciar o game
 * 
 *  Elementos dever ser dispostos na forma <'classe': quantidade> 
 * */
let gameComponentsList = {
    '.handbox': 2,
    // '.horizontalBox': 29,
    // '.verticalBox': 26,
    // '.UsableRectangleW': 55,
    // '.UsableRectangleH': 55,
};


/** Seleção da table para utilizar de referência de inserçãp */
let containerTable = document.getElementById('table'); 
let containerHand = document.getElementById('player1HandInner'); 

let player2Hand = document.getElementById ('player2HandInner');




/**
 * Verifica se não tem nenhum elemento em algum dos cards,
 * de modo geral, retorna true se pode dar apply de mais um card
 * 
 * Retorno: true < bool > ou console.error referente ao elemento que gerou o erro
 */
function canDisplayResults (){

    let matchCardInner = document.getElementById('matchCardInner');
    let gameCardInner = document.getElementById('gameCardInner');

    if (matchCardInner.children.length == 0 && gameCardInner.children.length == 0){
        return true;
    }

    else if (matchCardInner.children.length != 0){
        console.error('Need to display match overlay off')
    }

    else if (gameCardInner.children.length != 0){
        console.error('Need to game display overlay off')
    }
}


/**
 * Mostra o vencedor da >> partida <<
 * 
 * Parâmetros de entrada <nome_do_jogador, pontos>
 * 
 * player: Um nome <'string'>
 * 
 * pontos: Um valor <'int'>
 * 
 * Necessário chamar a função displayOverlayMatchOff para retirar esse overlay
 */
function displayOverlayMatchOn (player = 'unknown player', score = '0x1337'){

    if (canDisplayResults()){

        // =============== //
        // Create Elements //
        // =============== //


        let card = document.getElementById('matchCard');
        let matchCardInner = document.getElementById('matchCardInner');
        let cardText = document.createElement('h1');
        let btn = document.createElement('button');

        
        // ==== //
        // Sets //
        // ==== //


        btn.setAttribute ('onclick', 'continueGame ()')
        btn.textContent = 'Continue'
        
        cardText.textContent =`O vencedor desse round é ${player} com um total de ${score} pontos`;

        matchCardInner.appendChild (cardText);
        matchCardInner.appendChild (btn);
        
        card.classList.remove('classNone');
    }
}


/**
 * Mostra o vencedor do >> Jogo <<
 * 
 * Parâmetros de entrada <nome_do_jogador, pontos>
 * 
 * player: Um nome <'string'>
 * 
 * pontos: Um valor <'int'>
 * 
 * Necessário chamar a função displayOverlayGameOff para retirar esse overlay
 */
function displayOverlayGameOn (player = 'unkn0wn pl4yer', score = '0x1337'){

    if (canDisplayResults()){

        // =============== //
        // Create Elements //
        // =============== //


        let card = document.getElementById('gameCard');
        let gameCardInner = document.getElementById('gameCardInner');
        let cardText = document.createElement('h1');
        let btn = document.createElement('button');

        
        // ==== //
        // Sets //
        // ==== //


        btn.setAttribute ('onclick', 'resetGame ()')
        btn.textContent = 'Continue'
        
        cardText.textContent =`O vencedor do jogo é ${player} com um total de ${score} pontos`;

        gameCardInner.appendChild (cardText);
        gameCardInner.appendChild (btn);
        
        card.classList.remove('classNone');
    }
}

/**
 * Retira o Overlay da >> partida << da tela
 */
function displayOverlayMatchOff (){
    
    let card = document.getElementById('matchCard');
    card.classList.add('classNone');

    let cardInner = document.getElementById('matchCardInner');

    removeChild (cardInner)
}

/**
 * Retira o Overlay do >> jogo << da tela
 */
function displayOverlayGameOff (){
    
    let card = document.getElementById('gameCard');
    card.classList.add('classNone');

    let cardInner = document.getElementById('gameCardInner');

    removeChild (cardInner)
}



/**
 * Apaga todos os filhos do elemento passado como parâmetro
 * 
 * Parâmetro de entrada: (parent)
 * 
 * parent: elemento do < DOM >
 */
function removeChild (parent){

    // console.log (parent.children.length)

    for (let i = 0; i <= parent.children.length; i++){

        let child = parent.children[0]
        
        child.remove();
    }
}


/**
 * Chama o displayOverlayMatchOff
 */
function continueGame (){
    displayOverlayMatchOff ()
}

/**
 * Chama o displayOverlayGameOff
 */
function resetGame (){
    displayOverlayGameOff ()
}





/**
 * 
 */
function references(id){

    let ref = document.getElementById('reference' + id);
    let parent = ref.parentElement;
    let grand = parent.parentElement;

    grand.classList.remove('classNone');

    ref.classList.add('1');
    ref.classList.remove('classNone');

}


/**
 * 
 */
function setUnview (piece_svg) {

    for (let i = 0; i < piece_svg.children.length; i++) {

        // let subStr = 'playable'
        // console.log (piece_svg.getAttributeNode("class").value)

        
        let pieces = piece_svg.children[i]
        pieces.setAttribute('style', 'border: unset')


        for (let j = 0; j < pieces.children.length; j++){

            let svgs = pieces.children[j]
            
            svgs.classList.add ('classNone')
        }
    }

}

/**  */

// const mao = document.getElementById("player1Hand");
// mao.addEventListener("click", someFun);

// function someFun() {
//     console.log ('algo')
// }



let masterPiece

function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(piece) {
    masterPiece = piece
    
}




// function  addToTable (side) {


//     id = parseInt(masterPiece.id.slice(6), 10);

//     if (current_player.hand[id].value[left] == current_player.hand[id].value[right]){
//         masterPiece.setAttribute('class', 'piece UsableRectangleH');
//     }

//     else{
//         masterPiece.setAttribute('class', 'piece UsableRectangleW');
//     }
    
//     if (side == left){
//         containerTable.prepend(masterPiece);
//     }
    
//     else if (side == right){
//         containerTable.appendChild(masterPiece);
//     }

// }

function drop(side){
    
    // sistema drag & drop
    let masterPiece_id = parseInt(masterPiece.id.slice(6));
    player_list[player1].play_piece(masterPiece_id, side);

    // verifica se ganhou a partida
    if(match_over()){
        return "match-over-reached";
    }

    // muda de turno (para o bot)
    change_player();

    // atualiza os status do Bot
    current_player.update_playables();
    current_player.update_can_play();
    
    // verifica se o Bot pode jogar
    do{
        if(current_player.can_play){
            // Bot faz sua jogada
            bot_play(dificulty_mode);
        } else {
            // Bot compra peça até poder jogar ou até não poder mais comprar
            current_player.draw_piece();
            current_player.update_playables();
            current_player.update_can_play();
        }
    }while(current_player.can_play === false && check_shop_empty() === false);
    
    // verifica se ganhou a partida
    if(match_over()){
        return "match-over-reached";
    }

    // muda de volta para o Jogador
    change_player();
    current_player.update_playables();
    current_player.update_can_play();
    
    return "drop()-end-reached";
}



/** Função de testes com valores arbitrarios e aleatorios */
function updateTableSP (){

    let tableSide = 'r'
    
    let value1 = Math.floor(Math.random() * 6);
    let value2 = Math.floor(Math.random() * 6);

    
    updateTableWP (tableSide, value1, value2);
}

/** Função de testes com valores arbitrarios e aleatorios */
function updateTableWP (tableSide, value1, value2){

    let piece = createTablePieceWP (value1, value2);

    if (tableSide == 'l'){
        containerTable.prepend (piece);
    }

    else if (tableSide == 'r'){
        
        containerTable.appendChild (piece);
    }

    else {
        return console.error('Invalid Entry');

    }
}

/** Função de testes com valores arbitrarios e aleatorios */
function createTablePieceWP (value1, value2){
    
    let piece = generateTablePiece (value1,value2);

    if (value1 == value2){                              // Peça na Vertical

        piece.setAttribute ('class', 'piece UsableRectangleH'); // Seta a classe de peça na Vertical (height)
    }
    
    else {   

        piece.setAttribute ('class', 'piece UsableRectangleW'); // Seta a classe de peça na Horizontal (width)
    }

    return piece
}





/** Apaga o menu de seleção de modo de jogo */
function deleteModeMenu ()
{  
    let menu = document.querySelector('#menu');
    menu.style.display = "none";
}


/** Mostra Componentes que devem aparecer após iniciar o game */
function displayGame (){

    for (let obj in gameComponentsList) {   

        let k = document.querySelectorAll(obj);
            
            for (let i = 0; i < gameComponentsList[obj]; i++ ){
                
                k[i].classList.remove('classNone');
                console.log ()
        }
    }
}


/** Inicializa o jogo mostrando elementos necessários e deletando desnecessários */
function initGame (mode){
    deleteModeMenu ();
    displayGame ();
    game(mode);
}


/**
 * Gera uma peça a partir dos parâmetros de entrada
 * 
 * Números iguais: peça em pé // Números diferentes: peça deitada
 * 
 * A definição da orientação da peça é dada pela classe side, sendo elas: Up, Down, Left e Ritgh
 * 
 * > ( Essa função não define classe de permanencia da peça como a table) 
 * 
 * > ( A classe de permanencia da peça deverá ser definida após ela ser gerada)
 */
function generateTablePiece (value1, value2){


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


/** 
 * Cria uma peça preparada para ser colocada na mesa já com sua rotação correta.
 * 
 * Atualmente admite como parâmetros internos os valores dos lados a ser gerada via prompt, mudar para peça da hand.
 * 
 * Ordem de escolha: ( sideLeft, sideRight ) ou ( sideUp, sideDown ).
 * 
 * Parametros aceitos atualmente: [0, 1, 2, 3, 4, 5, 6]
*/
function createTablePiece(){ // [Daniel]
    

    let userInput1 = prompt("Insira um valor:");                // Entrada de Usuário 1
    userInput1 = parseInt(userInput1, 10);                      // Seta a entrada como inteiro

    
    let userInput2 = prompt("Insira outro valor:");             // Entrada de Usuário 2
    userInput2 = parseInt(userInput2, 10);                      // Seta a entrada como inteiro

    let piece = generateTablePiece (userInput1,userInput2);

    if (userInput1 == userInput2){                              // Peça na Vertical

        piece.setAttribute ('class', 'piece UsableRectangleH'); // Seta a classe de peça na Vertical (height)
    }
    
    else {   

        piece.setAttribute ('class', 'piece UsableRectangleW'); // Seta a classe de peça na Horizontal (width)
    }

    return piece
}


/** 
 * Coloca uma peça na table 
 * 
 * Atualemente admite como parâmetro interno o lado a ser colocado via prompt, mudar para parâmetro intrinseco da peça
 *
 * Parametros aceitos atualmente: [L] ou [R]
*/
function updateTable(){

    let piece = createTablePiece ();
    let tableSide = prompt("Insira um lado: [L] ou [R]");

    tableSide = tableSide.toLowerCase();

    if (tableSide == 'l'){
        containerTable.prepend (piece);
    }

    else if (tableSide == 'r'){
        
        containerTable.appendChild (piece);
    }
}


function set_piece_table_svg (){

    let piece = createTablePiece ();
    let tableSide = prompt("Insira um lado: [L] ou [R]");

    tableSide = tableSide.toLowerCase();

    if (tableSide == 'l'){
        containerTable.prepend (piece);
    }

    else if (tableSide == 'r'){
        
        containerTable.appendChild (piece);
    }
}


/**
 * Gera uma peça a partir dos parâmetros de entrada
 * 
 * Números iguais: peça em pé // Números diferentes: peça deitada
 * 
 * A definição da orientação da peça é dada pela classe side, sendo elas: Up, Down, Left e Ritgh
 * 
 * > ( Essa função não define classe de permanencia da peça, como hand ou table) 
 * 
 * > ( A classe de permanencia da peça deverá ser definida após ela ser gerada)
 */
function generateHandPiece (value1, value2){


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

    // ======= //
    // Side Up //
    // ======= //
    
    child1.setAttribute('class', 'sideUp');         // Atribui uma classe para essa div para estilização

    // ========= //
    // Side Down //
    // ========= //

    child2.setAttribute('class', 'sideDown');       // Atribui uma classe para essa div para estilização


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
    
    child2.appendChild(svg2);                       // Torna esse svg descendente de child1


    return parentPiece;
}


// ========== //
// SVG Create //
// ========== //


/** Cria SVG da peça 6 */
function createSVG_6() {  

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

/** Cria SVG da peça 5 */ 
function createSVG_5() {  

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

/** Cria SVG da peça 4 */
function createSVG_4() {  

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

/** Cria SVG da peça 3 */
function createSVG_3() {  

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

/** Cria SVG da peça 2 */
function createSVG_2() {  

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

/** Cria SVG da peça 1 */
function createSVG_1() {  

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

/** Cria SVG da peça 0 */
function createSVG_0() {  
    
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '45');
    svg.setAttribute('height', '45');


    return svg;
}



// ============== //
// Sleep Function //
// ============== //
function text (){
    console.log ('bom dia')
}

setTimeout(function() {
    text ();
}, 1000);

setTimeout(function() {
    text ();
}, 1000);
/**
 * Executa uma função após um determinado tempo
 * 
 * Parâmetros de entrada <função, tempo>
 * 
 * Função: qualquer função a ser executada, sem parâmetros de entrada
 * 
 * tempo: Um valor <int> em ms
 */

// ============================= //
// |         Daniel End        | //  
// ============================= //

// =============================== //
// |        Gabriel-Begin        | //  
// =============================== //

function update_table(value1, value2, side){ // [Gabriel(adaptação)]

    let piece = create_table_piece(value1, value2);

    if (side === left){
        containerTable.prepend (piece);
    }

    else if (side === right){
        containerTable.appendChild (piece);
    }
}

function create_table_piece(value1, value2){ // [Gabriel(adaptação)]

    let piece = generateTablePiece (value1, value2);

    if (value1 == value2){                              // Peça na Vertical
        piece.setAttribute ('class', 'piece UsableRectangleH'); // Seta a classe de peça na Vertical (height)
    } else {  
        piece.setAttribute ('class', 'piece UsableRectangleW'); // Seta a classe de peça na Horizontal (width)
    }

    return piece
}
function players_cannot_play(){
    player_list[player1].update_can_play();
    player_list[player2].update_can_play();
    if(((player_list[player1].can_play === false) && (player_list[player2].can_play === false)) && (shop.length === empty)){
        return true;
    } else {

    }
    
}

function reset_match(){ // issue: not called yet, call it on call it on displayOverlayMatchOff()
    dificulty_mode = "hard"; // tag: change

    // player_list[player1] = new Player("Player1", "Jogador", "player1HandInner"); // objeto que representa o jogador
    // player_list[player2] = new Player("Player2", "Bot", "player2HandInner"); // objeto que representa o BOT

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
    player_list[player1].draw_piece(hand_size); 
    player_list[player2].draw_piece(hand_size);

    // decidindo qual jogador joga primeiro.
    current_player = going_first();

    if(current_player.input_type === "Bot" && botInit){
        bot_play(dificulty_mode); // Bot faz primeira jogada
    }

    // issue: reset_match() still doesn't delete the graphical pieces automatically, the SVGs still linger
    // (...)
}

function reset_game(){ // issue: not called yet, call it on displayOverlayGameOff()
    
    player_list[player1].reset_score();
    player_list[player2].reset_score();
    reset_match();

}

// function player_vs_bot_flow(){
    
// }
// function bot_vs_bot_flow(){

// }

// =============================== //
// |        Gabriel-End          | //  
// =============================== //




