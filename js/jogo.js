var tempo_milseg = 1000;
var FPS = 50;
var taxa_atualizacao = this.tempo_milseg / this.FPS;
let ufoGame
var moveX = '0'
var moveY = '0'
var jogando = false
var podeAtirar = true
var idLoop
var ctrl = {
    dir: 'ArrowRight',
    cima: 'ArrowUp',
    baixo: 'ArrowDown',
    esq: 'ArrowLeft',
    tiro: 'Space',
    restart: 'KeyR',
    som: true
}

var highScores = {
    score: [0, 0, 0]
}

function getHighScoresFromLocalStorage(){
    let hs = localStorage.getItem("highscores")
    if(!hs){
        salvaHighScores()
        return
    }
    const hs_ = JSON.parse(hs)
    highScores.score = hs_.score
}

getHighScoresFromLocalStorage()

function getControlesFromLocalStorage() {
    let control = localStorage.getItem('controles')
    if (!control) return
    const controles_ = JSON.parse(control)
    ctrl.dir = controles_.dir
    ctrl.cima = controles_.cima
    ctrl.baixo = controles_.baixo
    ctrl.esq = controles_.esq
    ctrl.tiro = controles_.tiro
    ctrl.restart = controles_.restart
    ctrl.som = controles_.som
}

getControlesFromLocalStorage()

start()

function start() {
    ufoGame = new UFOGame(FPS, taxa_atualizacao, ctrl.som);
    novoTamanhoTerreno()
    inicializaTipoEntrada()
}

function inicializaTipoEntrada() {
    let isMobile = JSON.parse(localStorage.getItem('ismobile'))
    let dir = isMobile.val ? "./js/touch.js" : "./js/inputs.js"
    criaScript(document.body, dir)
}

function criaScript(pai, dir) {
    let scp = document.createElement("script")
    scp.src = dir
    pai.appendChild(scp)
}

function iniciaJogo() {
    if (jogando) return
    idLoop = setInterval(update, ufoGame.taxa_atualizacao)
    ufoGame.dentroDoJogo()
    jogando = true
}

function update() {
    if (jogando) {
        if (ufoGame.mudouTam())
            mudouTamanho()
        mover()
        let acabouJogo = ufoGame.update()
        if(acabouJogo)
            setTabelaDePontos();
            
    }
}

function setTabelaDePontos(){
    stop()
    setHighScores()
    salvaHighScores()
    criaScript(document.getElementById("terreno"), "./js/tabela.js")
}

function setHighScores(){
    let pontoAtual = ufoGame.getBombasDestruidas()
    highScores.score.push(pontoAtual)
    highScores.score.sort((a, b)=>{
        return b - a
    })
    highScores.score.pop()
}

function salvaHighScores(){
    localStorage.setItem("highscores", JSON.stringify(highScores))
}

function stop(){
    clearInterval(idLoop)
    jogando = false     
}

function mudouTamanho() {
    clearInterval(idLoop)
    jogando = false
    novoTamanhoTerreno()
    iniciaJogo()
}

function novoTamanhoTerreno() {
    if (ufoGame.width_terreno == 700) {
        ufoGame.taxa_atualizacao = 20
        ufoGame.FPS = 50
    } else if (ufoGame.width_terreno == 600) {
        ufoGame.taxa_atualizacao = 22
        ufoGame.FPS = 58
    }
    else if (ufoGame.width_terreno == 430) {
        ufoGame.taxa_atualizacao = 28
        ufoGame.FPS = 68
    }
}

function mover() {
    ufoGame.setMovX(moveX == '0' ? 0 : moveX == ctrl.esq ? -1 : 1)
    ufoGame.setMovY(moveY == '0' ? 0 : moveY == ctrl.cima ? -1 : 1)
}

function atirar() {
    if(jogando && podeAtirar)
        ufoGame.atira()
        podeAtirar = false
}

function mudouStatusSom(){
    ufoGame.mudouStatusSom(ctrl.som)
}