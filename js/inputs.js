(()=>{

let esq_press = false
let dir_press = false
let cima_press = false
let baixo_press = false

criaScript(document.body, "./js/form.js")
mouseOnTerreno()
sistemaDeTeclas()

function mouseOnTerreno() {
    document.getElementById("alerta-jogo").addEventListener("click", (e) => {
        e.preventDefault()
        if(jogando) return
        iniciaJogo()
        document.body.style.cursor = "none"
    })

    document.getElementById("terreno").addEventListener("mouseleave", (e) => {
        e.preventDefault()
        document.body.style.cursor = "crosshair"
    })
}
//#region sistema de movimentacao
function sistemaDeTeclas() {
    window.addEventListener('keydown', (e) => {
        e.preventDefault()
        if (!jogando) return
        switch (e.code) {
            case ctrl.tiro: atirar(); break
            case ctrl.restart:
                document.location.reload()
                break
            default: ativaMov(e.code); break
        }
    })

    window.addEventListener('keyup', (e) => {
        e.preventDefault()
        if (!jogando) return
        if(e.code == ctrl.tiro) podeAtirar = true
        desativaMov(e.code)
    })
}

function ativaMov(ativo) {
    if (!permitidoMov(ativo)) return

    let ehX = ativo == ctrl.esq || ativo == ctrl.dir

    ref = ehX ? moveX : moveY

    if (ativo === ref) return

    if (ehX) {
        ativo == ctrl.esq ? esq_press = true : dir_press = true
        moveX = ativo
    }
    else {
        ativo == ctrl.cima ? cima_press = true : baixo_press = true
        moveY = ativo
    }

}

function permitidoMov(ativo) {
    return ativo == ctrl.esq || ativo == ctrl.dir || ativo == ctrl.cima || ativo == ctrl.baixo
}

function desativaMov(key) {
    if (key == ctrl.esq) {
        esq_press = false
        moveX = dir_press ? ctrl.dir : '0'
    }
    else if (key == ctrl.dir) {
        dir_press = false
        moveX = esq_press ? ctrl.esq : '0'
    }
    else if (key == ctrl.cima) {
        cima_press = false
        moveY = baixo_press ? ctrl.baixo : '0'
    }
    else if (key == ctrl.baixo) {
        baixo_press = false
        moveY = cima_press ? ctrl.cima : '0'
    }
}
//#endregion

})()