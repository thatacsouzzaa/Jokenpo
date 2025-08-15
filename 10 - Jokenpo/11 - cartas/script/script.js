let cartas = [
    { id: 'carta1', valor: 120 }, { id: 'carta2', valor: 130 },
    { id: 'carta3', valor: 190 }, { id: 'carta4', valor: 110 },
    { id: 'carta5', valor: 180 }, { id: 'carta6', valor: 150 }
];

let jogadorCartas = [], computadorCartas = [], escolha = null;
let pontosJogador = 0, pontosComputador = 0, rodada = 1;

function distribuirCartas() {
    let embaralhadas = cartas.sort(() => Math.random() - 0.5);
    jogadorCartas = embaralhadas.slice(0, 3);
    computadorCartas = embaralhadas.slice(3, 6);

    // Atualiza as imagens do jogador
    document.querySelectorAll('.jogador img').forEach((img, index) => {
        img.src = `/img${jogadorCartas[index].id}.png`; // Define a imagem correta

        img.id = jogadorCartas[index].id;
        img.classList.remove('desativada', 'selecionada');
    });

    // Define o verso das cartas do computador
    document.querySelectorAll('.computador img').forEach((img, index) => {
        img.src = `/img/verso.png`; // Define o verso da carta
        img.id = computadorCartas[index].id;
    });

    console.log(`Rodada ${rodada}:`, jogadorCartas, computadorCartas);
}

distribuirCartas();

document.querySelectorAll('.jogador img').forEach(img => {
    img.addEventListener('click', e => {
        if (e.target.classList.contains('desativada')) return;

        document.querySelectorAll('.jogador img').forEach(i => i.classList.remove('selecionada'));

        escolha = jogadorCartas.find(c => c.id === e.target.id);
        e.target.classList.add('selecionada');
        console.log('Escolheu:', escolha);
    });
});

document.querySelector('#jogar').addEventListener('click', () => {
    if (!escolha) return alert('Escolha uma carta!');

    let escolhaPC = computadorCartas[Math.floor(Math.random() * 3)];
    console.log('Computador escolheu:', escolhaPC);

    // Revela a carta do computador alterando a imagem
    let imgPC = document.getElementById(escolhaPC.id);
    imgPC.src = `imagens/${escolhaPC.id}.png`;

    if (escolha.valor > escolhaPC.valor) {
        pontosJogador += escolha.valor - escolhaPC.valor;
    } else if (escolha.valor < escolhaPC.valor) {
        pontosComputador += escolhaPC.valor - escolha.valor;
    }

    document.querySelector('#pontos-jogador').innerText = pontosJogador;
    document.querySelector('#pontos-maquina').innerText = pontosComputador;

    let imgEscolhida = document.getElementById(escolha.id);
    imgEscolhida.classList.add('desativada');
    escolha = null;

    rodada++;
    if (rodada > 3) reiniciarJogo();
    else distribuirCartas();
});

function reiniciarJogo() {
    rodada = 1;
    pontosJogador = 0;
    pontosComputador = 0;
    document.querySelector('#pontos-jogador').innerText = 0;
    document.querySelector('#pontos-maquina').innerText = 0;
    distribuirCartas();
}
