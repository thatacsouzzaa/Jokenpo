let escolha = ''
let computador = ['pedra', 'papel', 'tesoura']
let pontosjogador = 0
let pontosmaquina = 0


document.querySelectorAll('.escolha img').forEach(img => {
    img.addEventListener('mouseover', (tag) => {
        tag.currentTarget.classList.add('a-jello-horizontal')
    })
    img.addEventListener('mouseout', (tag) => {
        tag.currentTarget.classList.remove('a-jello-horizontal')
    })
    img.addEventListener('click', (tag) => {
        document.querySelectorAll('.escolha img').forEach(el => el.style.filter = 'brightness(100%)')
        tag.currentTarget.style.filter = 'brightness(50%)'
        escolha = tag.currentTarget.id
        console.log('Jogador escolheu:', escolha)
    })
})


function gerarNumero() {
    return Math.floor(Math.random() * 3)
}


document.querySelector('button').addEventListener('click', () => {
    if (!escolha) {
        console.log('Escolha uma opção antes de jogar!')
        return
    }

    let aleatorio = gerarNumero()
    let escolhaComputador = computador[aleatorio]
    console.log('Computador escolheu:', escolhaComputador)

   
    document.querySelectorAll('.escolha-pc img').forEach(img => img.style.filter = 'brightness(0%)')


    let obj2 = document.querySelector(`#${escolhaComputador}-pc`)
    if (obj2) {
        obj2.style.filter = 'brightness(100%)'
        obj2.classList.add('a-dance')
    }

    function exibirMensagem(texto) {
        document.querySelector('.resultado').innerText = `Resultado: ${texto}`
    }

    if (escolha === escolhaComputador) {
        exibirMensagem('EMPATE!')
    } else if (
        (escolha === 'pedra' && escolhaComputador === 'tesoura') ||
        (escolha === 'papel' && escolhaComputador === 'pedra') ||
        (escolha === 'tesoura' && escolhaComputador === 'papel')
    ) {
        pontosjogador++ 
        document.querySelector('#pontos-jogador').innerText = pontosjogador
        exibirMensagem('JOGADOR GANHOU!')
    } else {
        pontosmaquina++ 
        document.querySelector('#pontos-maquina').innerText = pontosmaquina
        exibirMensagem('COMPUTADOR GANHOU!')
    }
})