let yIni
let minToMov = 3
let atira = false
let dedoMovimentodor = -1
const rangeTempoParaTiro = 120


document.getElementById("alerta-jogo").addEventListener("click", (e) => {
    e.preventDefault()
    if(jogando) return
    iniciaJogo()
    document.body.style.cursor = "none"
})

function usaTouch() {
    let terreno = document.getElementById("terreno")

    terreno.addEventListener("touchstart", (e) => {
        if (!jogando) return

        atira = true
        setTimeout(() => { atira = false }, rangeTempoParaTiro)

        if (dedoMovimentodor == -1) {
            dedoMovimentodor = e.changedTouches[0].identifier
            yIni = e.changedTouches[0].screenY
        }
    })

    terreno.addEventListener("touchmove", (e) => {
        e.preventDefault()
        if (!jogando) return
        if (e.changedTouches[0].identifier == dedoMovimentodor)
            movimentos(e.changedTouches[0].screenY)
    })

    terreno.addEventListener("touchend", (e) => {
        if (!jogando) return
        
        if (atira) {
            podeAtirar = true
            atira = false
            atirar()
        }
        if (e.changedTouches[0].identifier == dedoMovimentodor) {
            dedoMovimentodor = -1
            moveX = '0'
            moveY = '0'
        }
    })

}

function movimentos(posY) {
    let dirY = moverDirecao(yIni, posY)
    moveY = dirY == 0 ? '0' : dirY > 0 ? ctrl.baixo : ctrl.cima
}

function moverDirecao(i_touch, f_touch) {
    let f = f_touch - i_touch
    let aux = f < 0 ? f * -1 : f
    if (aux < minToMov) f = 0
    return f == 0 ? 0 : f > 0 ? 1 : -1
}

function setSomImg() {
    let btn = document.getElementById("btn-som")
    if (ctrl.som)
        btn.setAttribute("src", "./estilos/img/volume-up.png")
    else
        btn.setAttribute("src", "./estilos/img/mute.png")
}

usaTouch()

let btnSom = document.createElement("button")
btnSom.innerHTML = `<img id="btn-som" src="./estilos/img/volume-up.png" alt="somAtivo"></img>`
btnSom.style.position = "absolute"
btnSom.style.zIndex = 3
btnSom.style.opacity = "0.5"
document.getElementById("terreno").appendChild(btnSom)
setSomImg()
btnSom.addEventListener("click", (e) => {
    e.preventDefault()
    ctrl.som = !ctrl.som
    localStorage.setItem('controles', JSON.stringify(ctrl))
    setSomImg()
    mudouStatusSom()
})
