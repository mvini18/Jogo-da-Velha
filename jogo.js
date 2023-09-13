// Variáveis globais para o jogo
var jogador, vencedor = null;

// Elementos do DOM para exibir o jogador atual e o vencedor
var jogadorSelecionado = document.getElementById('jogador-selecionado');
var vencedorSelecionado = document.getElementById('vencedor-selecionado');

// Elemento do DOM representando o tabuleiro do jogo
var tabuleiro = document.querySelector('.tabuleiro');

// Adiciona um ouvinte de eventos de clique diretamente aos quadrados
var quadrados = document.querySelectorAll('.quadrado');
quadrados.forEach(function(quadrado) {
    quadrado.addEventListener('click', escolherQuadrado);
});

// Função que é chamada quando um quadrado é escolhido
function escolherQuadrado(event) {
    var quadrado = event.target;

    // Verifica se já há um vencedor ou se o quadrado já foi escolhido
    if (vencedor || quadrado.classList.contains('quadrado-escolhido')) {
        return;
    }

    // Define o símbolo do jogador no quadrado escolhido
    quadrado.innerHTML = jogador;
    quadrado.classList.add('quadrado-escolhido');

    // Alterna entre os jogadores '❌' e '⭕'
    if (jogador === '❌') {
        jogador = '⭕';
    } else {
        jogador = '❌';
    }

    // Atualiza o jogador atual no DOM
    mudarJogador(jogador);

    // Verifica se há um vencedor após a jogada
    checaVencedor();
}

// Função para atualizar o jogador atual no DOM
function mudarJogador(valor) {
    jogador = valor;
    jogadorSelecionado.textContent = jogador;
}

// Array de sequências vitoriosas no tabuleiro
var sequenciasVitoriosas = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // Linhas
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // Colunas
    [1, 5, 9], [3, 5, 7] // Diagonais
];

// Função para verificar empate
function checaEmpate() {
    var quadrados = document.querySelectorAll('.quadrado');
    for (var i = 0; i < quadrados.length; i++) {
        if (quadrados[i].innerHTML === '-') {
            return false; // Ainda há pelo menos um quadrado vazio, não é empate
        }
    }
    return true; // Todos os quadrados estão preenchidos, é empate
}

// Função para verificar o vencedor
function checaVencedor() {
    for (var i = 0; i < sequenciasVitoriosas.length; i++) {
        var [a, b, c] = sequenciasVitoriosas[i];
        var quadradoA = document.getElementById(a);
        var quadradoB = document.getElementById(b);
        var quadradoC = document.getElementById(c);

        // Verifica se uma das sequências vitoriosas foi alcançada
        if (checaSequencia(quadradoA, quadradoB, quadradoC)) {
            mudarCorQuadrado(quadradoA, quadradoB, quadradoC);
            mudarVencedor(quadradoA);
            return;
        } 
    }

    // Se não houver um vencedor, chame mudarVencedorEmpate
    if (checaEmpate()) {
        mudarVencedorEmpate();
    }
}

// Função para verificar se três quadrados têm o mesmo símbolo
function checaSequencia(quadradoA, quadradoB, quadradoC) {
    return (
        quadradoA.innerHTML !== '-' &&
        quadradoA.innerHTML === quadradoB.innerHTML &&
        quadradoB.innerHTML === quadradoC.innerHTML
    );
}

// Função para atualizar o vencedor e exibi-lo no DOM
function mudarVencedor(quadrado) {
    vencedor = quadrado.innerHTML;
    if (vencedor === '❌' || vencedor === '⭕') {
        vencedorSelecionado.innerHTML = vencedor;
    }
    if (vencedor === '❌' || vencedor === '⭕' || vencedor === 'Empate') {
        jogador = '';
    }
    jogadorSelecionado.innerHTML = jogador;
}

// Função para atualizar o vencedor no caso de empate
function mudarVencedorEmpate() {
    vencedorSelecionado.innerHTML = 'Empate';
    jogadorSelecionado.innerHTML = '';
}

// Função para alterar a cor dos quadrados vencedores
function mudarCorQuadrado(quadradoA, quadradoB, quadradoC) {
    quadradoA.style.background = '#19e05c';
    quadradoB.style.background = '#19e05c';
    quadradoC.style.background = '#19e05c';
}

// Função para reiniciar o jogo
function reiniciar() {
    vencedor = null;
    vencedorSelecionado.textContent = '';
    jogadorSelecionado.textContent = '';

    var quadrados = document.querySelectorAll('.quadrado');
    quadrados.forEach(function (quadrado) {
        quadrado.innerHTML = '-';
        quadrado.classList.remove('quadrado-escolhido');
        quadrado.style.background = '#ffffff';
    });

    mudarJogador('❌');
}

// Inicializa o jogo chamando a função reiniciar
reiniciar();
