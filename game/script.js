// http://127.0.0.1:5500/game%20copy/gamecopy.html


// google.load("visualization", "1", {packages:["corechart"]});
// google.setOnLoadCallback(drawCharts);


google.charts.load('current', {'packages':['corechart']});


/* search keywords:

    - issues:
    - (...)
    - (desnecessario?)

    - [-]: criar uma botão para tela de "como jogar"
    - [-]: uma janela de status
    
*/

// =============== //
// Debug Variables //
// =============== //

let debugMode = false;
let botDrag = false; // Só da pra usar quando o debug mode esta ativo
let botInit = true;
let dualBot = false;

////////////////////////////////////////
// Consts:
////////////////////////////////////////

let masterPiece
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
        // this.piece_div = generate_piece_svg(value_left, value_right);
        this.piece_div = generateHandPiece(value_left, value_right);
        // this.onluSvgs = 
        this.piece_div.setAttribute('class', 'handSlot');
        // this.piece_div.setAttribute('id', '');
        this.piece_div.setAttribute('ondragstart', 'drag(this)');
        // this.piece_div.setAttribute('onclick', 'check_playable_onclick()');
        this.owner;

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

        if (this.check_playable(left)){
            this.piece_div.setAttribute('draggable', 'true');
            this.piece_div.classList.add('left');
            this.piece_div.classList.remove('right');
            if(this.owner.input_type !== 'Bot'){
                this.piece_div.classList.add('playable');
            }
        }

        else if (this.check_playable(right)){
            this.piece_div.setAttribute('draggable', 'true');
            // this.piece_div.setAttribute('ondragstart', 'drag(event)');
            this.piece_div.classList.add('right');
            this.piece_div.classList.remove('left');
            if(this.owner.input_type !== 'Bot'){
                this.piece_div.classList.add('playable');
            }
        }
        
        else if (!(this.check_playable(right)) && !(this.check_playable(left))){
            this.piece_div.classList.remove('right');
            this.piece_div.classList.remove('left');
            if(this.owner.input_type !== 'Bot'){
                this.piece_div.classList.remove('playable');
            }
            this.piece_div.setAttribute('draggable', 'false');
        }

        // if(!(debugMode && botDrag)){
            
        //     this.piece_div.setAttribute('draggable', 'false');
        // }
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
    add_piece_svg_to_hand_div(piece_div){ // ???
        
        if (this.input_type == 'Bot'){
            if (!debugMode){
                setUnview (piece_div)
            }

        }

        /* else if (this.input_type == "Jogador"){

        } */
        
        this.hand_div.appendChild(piece_div);
        

    }
    draw_piece(quantity = 1) { // compra uma peça da pilha inicial
        if(quantity <= shop.length){
            if(this.can_play){
                alert('já tem peças jogaveis')
                return false;
            } 
            for(var i = 0; i < quantity; i++) {
                var piece = shop.pop();
                piece.owner = this;
                this.hand.push(piece);
                this.add_piece_svg_to_hand_div(piece.piece_div);
            }
            update_status_window_all();
            if(debugMode){
                console.log(this.name+"-buy: "+piece.string());
            }
            return true;
        } else {
            alert ('Tá sem peça ja')
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
            this.hand[i].piece_div.setAttribute('id', 'slotId' + i); 
            
            if(this.input_type === "Bot" && !(debugMode && botDrag)){  // se a peça estivar com o bot...

                this.hand[i].piece_div.setAttribute('draggable', 'false'); // ...remover propriedade "dragable" da peça          
            //     this.piece_div.setAttribute('draggable', 'false'); // ...remover propriedade "dragable" da peça
            }

        }
        
        return true;
    }
    update_can_play() { // marca em uma variavel do objeto Player que ele tem pelo menos uma jogada possivel
        
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

        // caso não, retornar falso.
        player.can_play = false;
        return false;
    }
    update_draggables(){
        for(let i = 0; i < this.hand.length; i++){
            this.hand[i].update_classes_by_playable();

            if(this.input_type === "Bot"){
                if(!(debugMode && botDrag)){
                    this.hand[i].piece_div.setAttribute('draggable', 'false');
                    // this.piece_div.setAttribute('draggable', 'false');   
                }
            }
        }
    }
    block_all_draggables(){
        for(let i = 0; i < this.hand.length; i++){
            this.hand[i].piece_div.setAttribute('draggable', 'false');
            this.hand[i].piece_div.classList.remove('right');
            this.hand[i].piece_div.classList.remove('left');
            this.hand[i].piece_div.classList.remove('playable');
        }
        if (debugMode){
            console.log(`blocking for: ${this.name}`);
        }
    }
    update_all(){
        this.update_playables();
        this.update_can_play();
        this.update_draggables();
        if (debugMode){
            console.log(`updating: ${this.name}`);
        }
    }
    hand_is_empty(){
        if(this.hand.length == 0){
            return true;
        } else {
            return false;
        }
    }
    play_piece(position, side = right){

        if (debugMode){
            console.log(`${this.name}: chosen piece ${position}`); // debug?
        }

        if(this.hand[position].playable[side] === yes_rotate) {
            this.hand[position].rotate();
        }

        if(this.hand[position].playable[side] === yes) {
            
            if(side == left) { // jogar na ponta esquerda da mesa
                // this.set_left(position);
                var piece = remove_piece(this.hand, position);
                if (debugMode){
                    console.log("[Playing Piece "+position+"]");
                }
                table.unshift(piece);  
                update_table(piece.value[left], piece.value[right], side);
                piece.piece_div.remove();
                // console.log(piece.value[left]);
                // console.log(piece.value[right]);
            } else if(side == right) { // jogar na ponta direita da mesa
                // this.set_right(position);
                var piece = remove_piece(this.hand, position);
                if (debugMode){
                    console.log("[Playing Piece "+position+"]");
                }
                table.push(piece);
                update_table(piece.value[left], piece.value[right], side);
                piece.piece_div.remove();
                // console.log(piece.value[left]);
                // console.log(piece.value[right]);
            } else {
                console.log("error: invalid play!");
                return false;
            }
        } else {
            if (debugMode){
                console.log("unexpected error: Player.play_piece()");
            }
            return false;
        }
        
        
        turn_counter++;
        if (debugMode){
            console.log(`>>>> current turn: ${turn_counter} <<<<`);
        }
        update_status_window_all();
        // updateByTurn(turn_counter);
        // updateByMove(shop.length);
        // updateByMatches(player_list[player1].name, player_list[player1].score, player_list[player2].name, player_list[player2].score);
        
        // function updatebleByTurn (actualTurn = 1){
        // function updateByMove (remainingPieces = 14){
        // function updatebleByMatches (player1Name='Player1', player1Score=0, player2Name='Player2', player2Score=0){
    
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
    clear_hand() {
        for(let i = this.hand_div.children.length-1; i >= 0; i--){
            this.hand_div.children[i].remove();
        }

        this.hand = new Array();
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

/* // funciona, porém predefinida
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
} */

function generate_pile(pile, min = 0, max = 6) { // gera a pilha inicial de peças. 
    
    // let svgs = document.getElementById("template_values_svg").children;

    for(let i = min; i <= max; i++){
        pile.push(new Piece(i,i));
    }
    for(let i = min; i <= max; i++){
        for(let j = i; j <= max; j++){
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
    update_status_window_all();
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
        winner.hand[i].piece_div.setAttribute('id', 'slotId' + i); // marca o indice da peça na mão como id do svg da peça
    }
    
    winner.hand[winner_position].update_playable(); // marca somente a peça ganhadora como jogavel.
    winner.update_can_play();
    winner.hand[winner_position].piece_div.setAttribute('id', 'slotId' + winner_position); // marca o indice da peça na mão como id do svg da peça
    if(winner.input_type === "Bot" && !(debugMode && botDrag)){ // transforma em não arrastavel se pertencer ao bot 
        winner.hand[winner_position].piece_div.setAttribute('draggable', 'false');     
    }
    // botDrag = false
    // !botDrag = true


    // botDrag = true
    // !botDrag = false

    /* for(let i = 0; i < winner.hand[winner_position].playable.length; i++){ // marca somente a peça ganhadora como jogavel.
       
        winner.hand[winner_position].update_playable();
        winner.hand[winner_position].piece_div.setAttribute('id', 'slotId' + i); 
        // winner.hand[winner_position].playable[i] = yes; // (old!)
        // winner.hand[winner_position].update_classes_by_playable();
    } */

    
    if (debugMode){
        console.log("First: "+winner.name);
    }

    return winner;
}
function change_player(){
    /* old code (it works)
    let next;
    
    if(current_player === player_list[player1]){
        next = player_list[player2];
    } else {
        next = player_list[player1];
    }

    console.log("changing to: "+next.name+"");
    current_player = next;
    everyone_update_all();
    block_everyone_not_playing(); */

    let next_player;

    for(let i = 0; i < player_list.length; i++){
        if(player_list[i] == current_player){
            if(i == player_list.length-1){
                next_player = player_list[0];
            } else {
                next_player = player_list[i+1];
            }
        }
    }

    if (debugMode){
        console.log("changing to: "+next_player.name+"");
    }
    current_player = next_player;

    everyone_update_all();
}

function bot_strategy(){

    switch(dificulty_mode){
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
                    
                    if((current_player.hand[position].playable[side] >= yes && current_player.hand[position].sum() > highest_sum)){
                        // console.log(`found: ${position}|${side}`);
                        highest_sum = current_player.hand[position].sum();
                        highest_sum_position = position;
                        highest_sum_side = side;
                        // [breaking-here]
                    } else {
                        // console.log(`checked: ${position}|${side}`);
                    }
                }
            }
            
            if (debugMode){
                console.log("highest_sum: "+highest_sum); // debug
                console.log("highest_sum_position: "+highest_sum_position); // debug
                console.log("highest_sum_side: "+highest_sum_side); // debug
            }

            current_player.play_piece(highest_sum_position, highest_sum_side); // debug


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
            console.error("error: AI mode invalid!");
            break;

    }
}
function shop_is_empty(){
    if(shop.length === empty){
        return true;
    } else {
        return false;
    }
}
function match_over(){
    
    let over = false;

    // player_list[player1].update_all();
    // player_list[player2].update_all();
    everyone_update_all();

    if(player_list[player1].hand_is_empty()){
        // Player 1 win
        var winner = player_list[player1];
        var loser = player_list[player2];
        over = true;
        if (debugMode){
            console.log("hand-empty: "+winner.name);
        }
    } else if(player_list[player2].hand_is_empty()){
        // Player 2 win
        var winner = player_list[player2];
        var loser = player_list[player1];
        over = true;
        console.log("hand-empty: "+winner.name);

    } else if(players_cannot_play()){
        // test who wins...
        if((player_list[player1].hand_sum()) < (player_list[player2].hand_sum())){
            // Player 1 win.
            var winner = player_list[player1];
            var loser = player_list[player2];
            over = true;
        } else if((player_list[player2].hand_sum()) < (player_list[player1].hand_sum())) {
            // Player 2 win.
            var winner = player_list[player2];
            var loser = player_list[player1];
            over = true;
        } else {
            console.warn("Empate?(sei la...)");
        }
    } else {
        // console.log(">>> Next-Turn <<<");
        return false;
    }

    let points = loser.hand_sum();
    winner.add_score(points);
    
    if(game_over(winner)){ 
        return true;
    }
    
    // mostrar tela de vitória da partida
    displayOverlayMatchOn(winner.name, points);
    everyone_update_all();


    if(debugMode){
        console.log("=========================================");
        console.log(">>>> Match-Winner: ["+winner.name+"] <<<<");
        console.log("added points: "+points);
        console.log("=========================================");
        // alert(">>>> Match-Winner: ["+winner.name+"] <<<<"+"\n"+"added points: "+points);    
    }
    
    // init_match();

    return true;
}
function game_over(winner){
    for(let player of player_list){ // passa por todos os jogadores
        if(player.score >= 100){ // verifica se o jogador tem 100 pontos ou mais
            // mostra a tela de vitória do jogo
            displayOverlayGameOn(winner.name, winner.score);
            
            if(debugMode){
                console.log(">>> Winner: "+player.name+" <<<");
            }
            return true;

        } else {
            if(debugMode){
                console.log(">>> Next-Match <<<");
            }
            return false;

        }
    }          
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
    let dificulty_mode = "hard";
    let turn_counter = 1;

    hand_size = 7; // quantidade inicial de peças
    player_name = "Jogador1";

    shop = new Array();
    table = new Array();
    
    // criando players.
    player_list = new Array();
    // player_list[player1] = new Player("Player1", "Jogador", "player1HandInner"); // objeto que representa o jogador
    // player_list[player2] = new Player("Player2", "Bot", "player2HandInner"); // objeto que representa o BOT

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


/**  */


/** Componentes que deverão aparecer após iniciar o game
 * 
 *  Elementos dever ser dispostos na forma <'classe': quantidade> 
 * */
let gameComponentsList = {
    '.handbox': 2,
    '.cardStats': 1,
    '.buyable': 1,
    '.buyableInner': 1,
    '#graphBox': 1,
    // 'gameStats': 1,
    // '.horizontalBox': 29,
    // '.verticalBox': 26,
    // '.UsableRectangleW': 55,
    // '.UsableRectangleH': 55,
};


// ===================================================== //
// |         Tamanho da peça (definida no css)         | //
// ===================================================== //


const defaultSize = getComputedStyle(document.documentElement).getPropertyValue('--defaultSize').slice(1,3);

const default3 = defaultSize/15
const default11 = (defaultSize*11)/45
const default12 = (defaultSize*4)/15
const defaultMetade = defaultSize/2 // 22.5
const default34 = (defaultSize*34)/45

let ar = [
    ['Year', 'Jogador', 'Bot'],
]

let graphOptions = {
    title: 'Número de peças',
    backgroundColor: 'transparent',
    colors: ['#68b2f8', '#651f71'],
    fontName: 'Open Sans',
    focusTarget: 'category',
    tooltip:{textStyle:{
        // color:,
        fontSize: 15
        }
    },
    titleTextStyle: {
        color: '#68b2f8',
        fontSize: 15
    },
    chartArea: {
        left: 30,
        top: 20,
        right:20,

        width: '100%',
        height: '70%'
    },
    hAxis: {
        showTextEvery: 1,
        textStyle: {
            color: '#68b2f8',
            fontSize: 15
        },
        baselineColor: 'transparent',
        gridlines: {
            color: 'transparent',
            multiple: 1,
        }
    },
    vAxis: {
        // minValue: 0,
        // maxValue: 5,
        baselineColor: '#DDD',
        gridlines: {
            color: '#68b2f8',
        },
        textStyle: {
        
            color: '#68b2f8',     
            fontSize: 15
        },
        baselineColor: 'transparent',
        gridlines: {
            color: 'transparent',
            multiple: 1,
        }
    },
    legend: {
        position: 'bottom',
        textStyle: {
            fontSize: 15,
            color: '#68b2f8',
        }
    },
    // animation: {
    //     duration: 1200,
    //     easing: 'out',
    //         // startup: true
    // }
};
    

/** Seleção da table para utilizar de referência de inserção */
let containerTable = document.getElementById('table'); 


/** Seleção da table para utilizar de referência de inserção */
let player1Hand = document.getElementById('player1HandInner');


/** Seleção da table para utilizar de referência de inserção */ 
let player2Hand = document.getElementById ('player2HandInner');


// ====== //
// Cheats //
// ====== //


let cheats = [
    'genetate20pieces ()',
    'createCard ()',
    'drawPieceCurrentPlayer ()',
    'updateTableSP ()',
    'updateTableWP ()',
    'createTablePieceWP()',
];


/**
 * Executa uma função após um determinado tempo
 * 
 * Parâmetros de entrada <função, tempo>
 * 
 * Função: qualquer função a ser executada, sem parâmetros de entrada
 * 
 * tempo: Um valor <int> em ms
 */
function sleepFor(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){}
}


/**  */
function printCheats (){

    if (debugMode){
        console.log ('\n\n*** Cheats ***\n\n')

        for (i in cheats){

            console.log (cheats[i]);
        }
    }
    else{
        console.error('Change debug mode to on to use this function!!!')
    }
}


/**  */
function generate20pieces (){
    if (debugMode){
        for ( let i = 0; i< 20; i++){
            updateTableSP();
        }
    }
    else{
        console.error('Change debug mode to on to use this function!!!')
    }
    
}


/**  */
function createCard (){
    if (debugMode){
        updateByTurn ();
        updateByMatches ();
    }
    else{
        console.error('Change debug mode to on to use this function!!!')
    }
}


/**  */
function drawPieceCurrentPlayer (){
    if (debugMode){

        current_player.draw_piece();
    }
    else{
        console.error('Change debug mode to on to use this function!!!')
    }
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


// ========== //
// Cheats End //
// ========== //










function drawChart() {

    let data = google.visualization.arrayToDataTable(ar);
  
    let chart = new google.visualization.LineChart(document.getElementById('line-chart'));
  
    chart.draw(data, graphOptions);
}




function removePlayable (){
    player1Hand.classList.remove ('play')
}


function minimalMaxRandomize(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}


function reloadGraph (actualTurn){
    ar.push ([actualTurn, player1Hand.children.length, player2Hand.children.length])
    drawChart()
}


/**
 * Funções que devem ser atualizadas a cada turno
 * 
 * Parâmetro de entrada: acturalTurn < int >
 * 
 * actualTurn: Turno atual (após cada mudança de turno) que deverá aparecer no card
 * 
 * Valor Default: 1
 */
function updateByTurn (actualTurn = 1){
    turnsStats (actualTurn);
    reloadGraph (actualTurn)

    // opponent_playing_warning_on()
    // opponent_playing_warning_off()
    
}


/**
 * Funções que devem ser atualizadas a cada movimento
 * 
 * Parâmetro de entrada: remainingPieces < int >
 * 
 * remainingPieces: Peças restantes (após cada movimento) que deverá aparecer no card
 * 
 * Valor Default: 14
 */
function updateByMove (remainingPieces = 14){
    restingPiecesStats (remainingPieces);
}


/**
 * Funções que devem ser atualizadas a cada partida
 * 
 * Parâmetros de entrada: player1Name < string > , player1Score < int >, player2Name < string >, player2Score1 < int >
 * 
 * player1Name e player2Name: Nome do jogador 1 e jogador 2 respectivamente, que deveram aparecer no card
 * 
 * player1Score e player2Name: Score do jogador 1 e jogador 2 respectivamente, que deveram aparecer no card
 * 
 * Valor Default: 'Player1', 0, 'Bot', 0
 */
function updateByMatches (player1Name='Player1', player1Score=0, player2Name='Bot', player2Score=0){
    
    playerStats (player1Name, player1Score, 1);
    playerStats (player2Name, player2Score, 2);

}


/**
 * Atualiza pontuação do jogador no cardStats
 * 
 * Parâmetros de entrada: playerName < string > , playerScore < int >, PlayerOrder < int >
 * 
 * playerName: Nome do jogador que deverá aparecer no card
 * 
 * playerScore: Score do jogador que deverá aparecer no card
 * 
 * PlayerOrder: Qual jogador está sendo referenciado (1 ou 2)
 */
function playerStats (playerName, playerScore, playerOrder) {

    let playerStats = document.getElementById ('player'+ playerOrder + 'Stats'); // Nome: pontos
    
    playerStats.textContent = playerName + ': ' + playerScore + ' Pontos';
}


/**
 * Atualiza o turno no cardStats
 * 
 * Parâmetros de entrada: turn < int >
 * 
 * turn: turno atual do jogo que deverá aparecer no card
 * 
 * Valor Default: 1
 */
function turnsStats (turn = 1){

    let turns = document.getElementById ('turns');
    
    turns.textContent = 'Turno: ' + turn;
}


/**
 * Atualiza as peças no bolo (peças restantes) no cardStats
 * 
 * Parâmetros de entrada: remainingPieces < int >
 * 
 * remainingPieces: número de peças restantes no bolo/monte que deverá aparecer no card
 * 
 * Valor Default: 14
 */
function restingPiecesStats (remainingPieces = 14) {

    let amount = document.getElementById ('restingPieces');
    
    amount.textContent = remainingPieces;
}


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


        btn.setAttribute ('onclick', 'alert("will reset match");') // (...) use this button to reset_match
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
function setUnview (piece_div) {

    for (let i = 0; i < piece_div.children.length; i++) {

        // let subStr = 'playable'
        // console.log (piece_div.getAttributeNode("class").value)

        
        let pieces = piece_div.children[i]
        pieces.setAttribute('style', 'border: unset')


        for (let j = 0; j < pieces.children.length; j++){

            let svgs = pieces.children[j]
            
            svgs.classList.add ('classNone')
        }
    }

}


/** Permite o drop quando detectado dragevent em cima da div */
function allowDrop(ev) {
    ev.preventDefault();
}


/** Identifica qual peça está sendo arrastada */
function drag(piece) {
    masterPiece = piece
    
}


/** Executa movimentação da peça no back e no front */
function drop(side){ // [drop_event]
    
    /* // sistema drag & drop
    let masterPiece_id = parseInt(masterPiece.id.slice(6));
    if(player_list[player1].play_piece(masterPiece_id, side) === false){
        return false;
    } */

    
    if(human_play(side) === false){
        return false; // se a jogada for invalida
    }

    bot_play(minimalMaxRandomize(1000, 3000));


    if (debugMode){
        console.log("drop() function: [end reached]");
    }

    return true;
}


/** 
 * Gera uma peça na table, com as propriedades da table, e identificação visual da peça que foi arrastada 
 * 
 * Parâmetro de entrada: side < int > , typed: < left, right >
 * 
 * side: lado que a peça deverá ser colocada na mesa
*/
function addToTable (side) {

    let id = parseInt(masterPiece.id.slice(6), 10);

    if (current_player.hand[id].value[left] == current_player.hand[id].value[right]){
        masterPiece.setAttribute('class', 'piece UsableRectangleH');
    }

    else{
        masterPiece.setAttribute('class', 'piece UsableRectangleW');
    }
    
    if (side == left){
        containerTable.prepend(masterPiece);
    }
    
    else if (side == right){
        containerTable.appendChild(masterPiece);
    }

}


/** Apaga o menu de seleção de modo de jogo */
function hideModeMenu ()
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


/** Mostra o menu de seleção de modo de jogo */
function showModeMenu ()
{  
    let menu = document.querySelector('#menu');
    menu.style.display = "flex";
}


/** Mostra o card anterior */
function prevCard (btn){
    let card = btn.parentNode.parentNode
    let cardParent = card.parentNode
    let id = parseInt(card.id.slice(10), 10) -1;

    if (id > 0){ // Se pode voltar
        card.classList.toggle('classNone');
        cardParent.children[id-1].classList.toggle('classNone');
    }

    else {
        console.error ('Não tem mais cards para tras');
        return;
    }   
}


/** Mostra o próximo card */
function nextCard (btn){

    let card = btn.parentNode.parentNode
    let cardParent = card.parentNode
    let id = parseInt(card.id.slice(10), 10) -1;

    if ( id < cardParent.children.length - 1 ){  // Se pode avançar
        card.classList.toggle('classNone');
        cardParent.children[id+1].classList.toggle('classNone');
    }
    
    else {
        console.error ('Não tem mais cards para frente');
        return;
    }
}


/** Retorna ao menu inicial */
function returnToMenu (){
    displayHowToPlay ();
    showModeMenu ()
}


/** Mostra a aba de como jogar o dominó */
function displayHowToPlay (){
    document.getElementById('howToPlay').classList.toggle('classNone');
}


/** Inicializa o jogo mostrando elementos necessários e deletando desnecessários */
function initGame (mode){
    
    hideModeMenu ();
    

    switch(mode){
        case 0: // Player vs Bot

            displayGame ();

            init_match();
            // reset_game(mode);

            break;

        case 1: // Bot vs Bot
            displayGame ();
            bvb_flow();

            // reset_game(mode);
            dualBot = true;
            break;

        case 2: // Como jogar
            
            // howToPlay();
            displayHowToPlay ();
            break;
    }

    // createCard ()
    // game(mode);
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

/** Cria SVG da peça 6 */
function createSVG_6() {  

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', defaultSize);
    svg.setAttribute('height', defaultSize);

        // =========== //
        // Set Circles //
        // =========== //


    // ======== //
    // Set left //
    // ======== //

    let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute('cx', default12);
    circle1.setAttribute('cy', default11);
    circle1.setAttribute('r', default3);
    circle1.setAttribute('fill', 'black');
    svg.appendChild(circle1);

    let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle2.setAttribute('cx', default12);
    circle2.setAttribute('cy', defaultMetade);
    circle2.setAttribute('r', default3);
    circle2.setAttribute('fill', 'black');
    svg.appendChild(circle2);

    let circle3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle3.setAttribute('cx', default12);
    circle3.setAttribute('cy', default34);
    circle3.setAttribute('r', default3);
    circle3.setAttribute('fill', 'black');
    svg.appendChild(circle3);



    // ========= //
    // Set right //
    // ========= //


    let circle4 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle4.setAttribute('cx', default34);
    circle4.setAttribute('cy', default11);
    circle4.setAttribute('r', default3);
    circle4.setAttribute('fill', 'black');
    svg.appendChild(circle4);

    let circle5 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle5.setAttribute('cx', default34);
    circle5.setAttribute('cy', defaultMetade);
    circle5.setAttribute('r', default3);
    circle5.setAttribute('fill', 'black');
    svg.appendChild(circle5);

    let circle6 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle6.setAttribute('cx', default34);
    circle6.setAttribute('cy', default34);
    circle6.setAttribute('r', default3);
    circle6.setAttribute('fill', 'black');
    svg.appendChild(circle6);

    return svg;

}

/** Cria SVG da peça 5 */ 
function createSVG_5() {  

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', defaultSize);
    svg.setAttribute('height', defaultSize);

        // =========== //
        // Set Circles //
        // =========== //


    // ======== //
    // Set left //
    // ======== //

    let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute('cx', default12);
    circle1.setAttribute('cy', default11);
    circle1.setAttribute('r', default3);
    circle1.setAttribute('fill', 'black');
    svg.appendChild(circle1);



    let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle2.setAttribute('cx', default12);
    circle2.setAttribute('cy', default34);
    circle2.setAttribute('r', default3);
    circle2.setAttribute('fill', 'black');
    svg.appendChild(circle2);



    // ========= //
    // Set right //
    // ========= //


    let circle3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle3.setAttribute('cx', default34);
    circle3.setAttribute('cy', default11);
    circle3.setAttribute('r', default3);
    circle3.setAttribute('fill', 'black');
    svg.appendChild(circle3);


    let circle4 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle4.setAttribute('cx', default34);
    circle4.setAttribute('cy', default34);
    circle4.setAttribute('r', default3);
    circle4.setAttribute('fill', 'black');
    svg.appendChild(circle4);



    // ========= //
    // Set Midle //
    // ========= //


    let circle5 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle5.setAttribute('cx', defaultMetade);
    circle5.setAttribute('cy', defaultMetade);
    circle5.setAttribute('r', default3);
    circle5.setAttribute('fill', 'black');
    svg.appendChild(circle5);
    
    return svg;
} 

/** Cria SVG da peça 4 */
function createSVG_4() {  

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', defaultSize);
    svg.setAttribute('height', defaultSize);

        // =========== //
        // Set Circles //
        // =========== //


    // ======== //
    // Set left //
    // ======== //

    let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute('cx', default12);
    circle1.setAttribute('cy', default11);
    circle1.setAttribute('r', default3);
    circle1.setAttribute('fill', 'black');
    svg.appendChild(circle1);



    let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle2.setAttribute('cx', default12);
    circle2.setAttribute('cy', default34);
    circle2.setAttribute('r', default3);
    circle2.setAttribute('fill', 'black');
    svg.appendChild(circle2);



    // ========= //
    // Set right //
    // ========= //


    let circle3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle3.setAttribute('cx', default34);
    circle3.setAttribute('cy', default11);
    circle3.setAttribute('r', default3);
    circle3.setAttribute('fill', 'black');
    svg.appendChild(circle3);


    let circle4 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle4.setAttribute('cx', default34);
    circle4.setAttribute('cy', default34);
    circle4.setAttribute('r', default3);
    circle4.setAttribute('fill', 'black');
    svg.appendChild(circle4);

    

    return svg;

} 

/** Cria SVG da peça 3 */
function createSVG_3() {  

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', defaultSize);
    svg.setAttribute('height', defaultSize);

        // =========== //
        // Set Circles //
        // =========== //


    // ======== //
    // Set left //
    // ======== //


    let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute('cx', default11);
    circle1.setAttribute('cy', default34);
    circle1.setAttribute('r', default3);
    circle1.setAttribute('fill', 'black');
    svg.appendChild(circle1);


    // ========= //
    // Set right //
    // ========= //


    let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle2.setAttribute('cx', default34);
    circle2.setAttribute('cy', default11);
    circle2.setAttribute('r', default3);
    circle2.setAttribute('fill', 'black');
    svg.appendChild(circle2);



    // ========= //
    // Set Midle //
    // ========= //


    let circle3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle3.setAttribute('cx', defaultMetade);
    circle3.setAttribute('cy', defaultMetade);
    circle3.setAttribute('r', default3);
    circle3.setAttribute('fill', 'black');
    svg.appendChild(circle3);
    

    return svg;
} 

/** Cria SVG da peça 2 */
function createSVG_2() {  

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', defaultSize);
    svg.setAttribute('height', defaultSize);

        // =========== //
        // Set Circles //
        // =========== //


    // ======== //
    // Set left //
    // ======== //

    let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute('cx', default12);
    circle1.setAttribute('cy', default34);
    circle1.setAttribute('r', default3);
    circle1.setAttribute('fill', 'black');
    svg.appendChild(circle1);

    
    // ========= //
    // Set right //
    // ========= //


    let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle2.setAttribute('cx', default34);
    circle2.setAttribute('cy', default11);
    circle2.setAttribute('r', default3);
    circle2.setAttribute('fill', 'black');
    svg.appendChild(circle2);


    return svg;

}

/** Cria SVG da peça 1 */
function createSVG_1() {  

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', defaultSize);
    svg.setAttribute('height', defaultSize);

    
        // =========== //
        // Set Circles //
        // =========== //


    let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute('cx', defaultMetade);
    circle1.setAttribute('cy', defaultMetade);
    circle1.setAttribute('r', default3);
    circle1.setAttribute('fill', 'black');
    svg.appendChild(circle1);
    

    return svg;

} 

/** Cria SVG da peça 0 */
function createSVG_0() {  
    
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', defaultSize);
    svg.setAttribute('height', defaultSize);


    return svg;
}

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
    // player_list[player1].update_all();
    // player_list[player2].update_all();
    everyone_update_all();
    if(((player_list[player1].can_play === false) && (player_list[player2].can_play === false)) && (shop_is_empty() === true)){
        return true;
    } else {
        return false;
    }
}



function reset_match(){ // (...)  codigo precisa ser refeito apos ser segregado do init_match 

    turn_counter = 1;

    clear_table();

    shop = new Array();

    // gerando as peças do shop.
    generate_pile(shop);
    shuffle_pile(shop);

    for(let player of player_list){
        player.clear_hand();

        // player.reset_score();
        // player.reset_hand();
    }

    //comprando peças.
    player_list[player1].draw_piece(hand_size); 
    player_list[player2].draw_piece(hand_size);

    // update para janela de status:
    update_status_window_all();
    
    // decidindo qual jogador joga primeiro.
    current_player = going_first();
    update_status_window_all();

    if(current_player.input_type === "Bot" && botInit){
        bot_play(); // Bot faz primeira jogada
        // bot_strategy(); // Bot faz primeira jogada
        // change_player();
        // everyone_update_all();
    }
}

function reset_game(mode){ // issue: not called yet, call it on displayOverlayGameOff()
    
    player_list[player1].reset_score();
    player_list[player2].reset_score();
    init_match(mode);

}

function everyone_update_all(){
    
    for(let i = 0; i < player_list.length; i++){
        player_list[i].update_all();
    }
    update_status_window_all();
    block_everyone_not_playing();
    return true;
}

function draw_piece_button(){ // compra uma peça para o jogador humano pelo botão.
    if(player_list[player1].draw_piece(1)){
        everyone_update_all();
    }
}

function sleep(ms){ 
    return new Promise(resolve => setTimeout(resolve, ms));;
}

function update_status_window_all(){
    updateByTurn(turn_counter);
    updateByMove(shop.length);
    updateByMatches(player_list[player1].name, player_list[player1].score, player_list[player2].name, player_list[player2].score);
}

function clear_table(){
    let table_div = document.getElementById("table");
    
    for(let i = table_div.children.length-1; i >= 0; i--){
        table_div.children[i].remove();
    }

    table = new Array();
}

function block_everyone_not_playing(){
    
    if (debugMode){
        console.log("blocking everyone not playing");
    }
    for(let i = 0; i < player_list.length; i++){
        if(player_list[i] == current_player){
            if (debugMode){
                console.log(`${player_list[i].name} IS current_player`);
            }
            player_list[i].update_all();
            
        } else {
            if (debugMode){
                console.log(`${player_list[i].name} NOT current_player`);
            }
            player_list[i].block_all_draggables();
        }
    }
}

function human_play(side){
    
    // sistema drag & drop
    let masterPiece_id = parseInt(masterPiece.id.slice(6));
    if(player_list[player1].play_piece(masterPiece_id, side) === false){
        return false;
    }

    // verifica se ganhou a partida
    if(match_over()){
        if (debugMode){
            console.log("[match-over-reached!]");
        }
        return false;
    }

    // muda de turno (para o bot) & atualiza os status do jogo
    change_player();

    return true;
}

async function bot_play(delay){
    while(true){

        // verifica se o Bot pode jogar
        do{
            if(current_player.can_play){
                // Bot faz sua jogada
                await sleep(delay);
                bot_strategy();
                break;
            } else {
                // Bot compra peça até poder jogar ou até não poder mais comprar
                current_player.draw_piece(1);
                everyone_update_all();
                // current_player.update_all();
            }
        }while((current_player.can_play === false) && (shop_is_empty() === false));
        
        // verifica se ganhou a partida
        if(match_over()){
            console.log("match-over-reached");
            return true;
        }

        // muda de volta para o Jogador humano e atualiza status dos jogadores
        change_player();

        /* if(current_player.can_play){
            break;
        } else {
            change_player();
            console.log("bot playing again");
        } */
        
        if(current_player.can_play === false && shop_is_empty() === true){
            change_player();
            console.log("bot playing again");
        } else {
            break;
        }

    }
}

function opponent_playing_warning_toggle(){
    let stats = document.getElementById('gameStats');
    console.log (stats)

    stats.classList.toggle('classNone');

    console.log (stats)
    // document.getElementById('gameStats').classList.remove('classNone')
}

function opponent_playing_warning_on(){
    document.getElementById('gameStats').classList.remove('classNone');
}

function opponent_playing_warning_off(){
    document.getElementById('gameStats').classList.add('classNone');
}

function init_match(){ // issue: not called yet, call it on call it on displayOverlayMatchOff()

    hideModeMenu();

    // gerando as peças do shop.
    generate_pile(shop);
    shuffle_pile(shop);
    
    player_list[player1] = new Player("Player", "Jogador", "player1HandInner"); // objeto que representa o jogador
    player_list[player2] = new Player("Bot", "Bot", "player2HandInner"); // objeto que representa o BOT

    //comprando peças.
    player_list[player1].draw_piece(hand_size); 
    player_list[player2].draw_piece(hand_size);

    // update para janela de status:
    update_status_window_all();
    
    // decidindo qual jogador joga primeiro.
    current_player = going_first();
    update_status_window_all();

    if(current_player.input_type === "Bot" && botInit){
        bot_play(); // Bot faz primeira jogada
    }
}

function bvb_flow(){
    
    hideModeMenu();

    // gerando as peças do shop.
    generate_pile(shop);
    shuffle_pile(shop);
    
    player_list[player1] = new Player("Bot-1", "Bot", "player1HandInner"); // objeto que representa o jogador
    player_list[player2] = new Player("Bot-2", "Bot", "player2HandInner"); // objeto que representa o BOT

    //comprando peças.
    player_list[player1].draw_piece(hand_size); 
    player_list[player2].draw_piece(hand_size);

    // update para janela de status:
    update_status_window_all();
    
    // decidindo qual jogador joga primeiro.
    current_player = going_first();
    update_status_window_all();

    bot_play(); // Bot faz primeira jogada

    // (...) precisa criar o loop da partida
}

// function player_vs_bot_flow(){
    
// }
// function bot_vs_bot_flow(){

// }

// =============================== //
// |        Gabriel-End          | //  
// =============================== //