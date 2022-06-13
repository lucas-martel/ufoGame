let caixas = document.querySelectorAll("[data-caixa]");
let btns_caixa = document.getElementById("botoes-caixa");
let ultimaCaixa = null
let ref_btn = "data-ref-caixa"
let btn_classe = "bola-btn"
let estiloDefaultBola = "linear-gradient(90deg, red, blue)"
let estiloSelecionadoBola = "linear-gradient(90deg, #ffc707, blue)"


function criaBotoesParaCaixa() {
    caixas.forEach(caixa => {
        let btn = document.createElement('div')
        btn.className = btn_classe
        btn.setAttribute(ref_btn, `${caixa.dataset.caixa}`)
        btns_caixa.appendChild(btn)
        startListenButton(btn, caixa)
    })
    setBotao(caixas[0])
}

function startListenButton(btn, caixa) {
    btn.addEventListener("mouseenter", (e) => {
        e.preventDefault();
        setBotao(caixa)
    })
}

function setBotao(caixa) {
    let btn_ref_caixa = document.querySelector(`[${ref_btn}="${caixa.dataset.caixa}"]`)
    if(ultimaCaixa != null && ultimaCaixa.dataset.caixa == caixa.dataset.caixa) return
    if(ultimaCaixa == null)
        ultimaCaixa = caixa
    let btn_ultima = document.querySelector(`[${ref_btn}=${ultimaCaixa.dataset.caixa}]`)
    btn_ultima.style.backgroundImage = estiloDefaultBola
    btn_ref_caixa.style.backgroundImage = estiloSelecionadoBola
    ultimaCaixa = caixa
    scroolCaixa(ultimaCaixa.dataset.caixa)
}

function scroolCaixa(dataCaixa){
    document.querySelector(`[data-caixa="${dataCaixa}"]`).scrollIntoView({inline: 'center', behavior: 'smooth'})
}

criaBotoesParaCaixa()
