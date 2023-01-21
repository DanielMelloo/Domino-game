// Função para atualizar o estado da mão do jogador na interface
function updateHand() {
    // Faz uma requisição ao servidor para pegar as peças da mão do jogador
    fetch('/get_hand')
        .then(response => response.json())
        .then(hand => {
            // Limpa a lista de peças atualmente exibida na tela
            let handList = document.getElementById("hand");
            handList.innerHTML = "";
            // Adiciona as peças retornadas pelo servidor à lista
            for (let piece of hand) {
                let pieceElement = document.createElement("li");
                pieceElement.innerHTML = piece.string();
                handList.appendChild(pieceElement);
            }
        });
}

// Função para atualizar as peças jogáveis na interface
function updatePlayables() {
    // Faz uma requisição ao servidor para pegar as peças jogáveis
    fetch('/get_playables')
        .then(response => response.json())
        .then(playables => {
            // Limpa a lista de peças jogáveis atualmente exibida na tela
            let playableList = document.getElementById("playables");
            playableList.innerHTML = "";
            // Adiciona as peças jogáveis retornadas pelo servidor à lista
            for (let piece of playables) {
                let pieceElement = document.createElement("li");
                pieceElement.innerHTML = piece.string();
                playableList.appendChild(pieceElement);
            }
        });
}

// Função para lidar com o clique em uma peça jogável
function handlePlay(event) {
    // Pega o elemento clicado
    let pieceElement = event.target;
    // Pega o índice da peça na lista de peças jogáveis
    let index = Array.from(pieceElement.parentNode.children).indexOf(pieceElement);
    // Faz uma requisição ao servidor para jogar a peça
    fetch('/play?index=' + index)
    .then(response => response.json())
    .then(result => {
    if (result.success) {
    // Atualiza as mãos e peças jogáveis na tela
    updateHand();
    updatePlayables();
    // Exibe uma mensagem de sucesso
    alert("Jogada realizada com sucesso!");
    } else {
    // Exibe uma mensagem de erro
    alert("Essa jogada não é válida. Por favor, selecione outra peça ou posição.");
    }
    });
    }
    
    // Inicializa o jogo
    game.init();
    
    // Adiciona os eventos de clique nas peças da mão do jogador
    for (let i = 0; i < playerHand.children.length; i++) {
    playerHand.children[i].addEventListener("click", game.selectPiece);
    }
    
    // Adiciona os eventos de clique nas posições válidas para jogar
    for (let i = 0; i < playablePositions.children.length; i++) {
    playablePositions.children[i].addEventListener("click", game.playPiece);
    }
    
    // Adiciona evento de clique no botão de passar a vez
    passTurnButton.addEventListener("click", game.passTurn);
    
    // Adiciona evento para esconder as opções de jogada quando o jogador clicar fora da lista de opções
    document.addEventListener("click", event => {
    if (!playablePositions.contains(event.target)) {
    playablePositions.style.display = "none";
    }
    });
