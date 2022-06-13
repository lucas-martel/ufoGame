(() => {
    let configBTN //botao de entrada para o form de btns
    let proximosBTNS //recebe entrada do teclado
    let atuaisBTNS //nao recebe entrada do teclado

    function createConfigBTN() {
        configBTN = document.createElement("button")
        configBTN.type = "button"
        configBTN.setAttribute("data-door", "set-teclado")
        configBTN.className = "config"
        configBTN.innerText = "Config"
        document.getElementById("terreno").append(configBTN)
    }

    //#region criacao do form
    function criaForm() {
        let form = document.createElement('form');
        form.innerHTML = criaFields()
        criaCampoDeConfiguracao().appendChild(form)
        criaDivMovimento()
        criaDivAcoes()
        criaDivSistema()
        createButton("#div-form-set-botoes form", "salvar-btns", "Salvar")
        createButton("#div-form-set-botoes form", "cancelar-btn", "Cancelar")
    }

    function criaFields() {
        return `
    <fieldset data-field="movimento"></fieldset>
    <fieldset data-field="acoes"></fieldset>
    <fieldset data-field="sistema"></fieldset>`
    }

    function criaCampoDeConfiguracao() {
        let config_teclado = document.createElement('div')
        config_teclado.id = "div-form-set-botoes"
        config_teclado.className = "configuracoes"
        document.getElementById("terreno").append(config_teclado)
        return config_teclado
    }

    function criaDivMovimento() {
        let fieldMovimento = document.querySelector('[data-field="movimento"]')
        let conteudo =
            `<legend>MOVIMENTO</legend>
        ${criaDiv("cima")} 
        ${criaDiv("baixo")}
        ${criaDiv("direita", "dir")}
        ${criaDiv("esquerda", "esq")}
        `;

        fieldMovimento.innerHTML = conteudo
    }

    function criaDivAcoes() {
        let field = document.querySelector('[data-field="acoes"]')
        let conteudo =
            `<legend>AÇÕES</legend>
        ${criaDiv("tiro")}
        `;
        field.innerHTML = conteudo
    }

    function criaDivSistema() {
        let field = document.querySelector('[data-field="sistema"]')
        let conteudo =
            `<legend>SISTEMA</legend>
        ${criaDiv("restart")}
        <div id="som-jogo"></div>
        `;
        field.innerHTML = conteudo
        let btn = createButton(`#som-jogo`, 'som', statusSom())
        btn.setAttribute("data-btn-atual", "som")
    }

    function statusSom(){
        if(ctrl.som) return "desativar som"
        return "ativar som"
    }

    function criaDiv(label, nome = "") {
        if (nome === "") nome = label
        return `
    <div id="${nome}">
        <label>${label.toUpperCase()}</label><br>
        <input type="text" data-btn-atual="${nome}" disabled>
        <input type="text" data-btn="${nome}" placeholder="Próx" autocomplete="off">
    </div>`
    }

    function createButton(pai, id, value) {
        let btn = document.createElement("input")
        btn.type = "button"
        btn.value = value
        btn.id = id
        document.querySelector(`${pai}`).appendChild(btn)
        return btn
    }


    //#endregion

    function startEventsFromBTNS() {
        let formulario = document.getElementById("div-form-set-botoes")

        configBTN.addEventListener("click", (e) => {
            e.preventDefault()
            stop()
            set_atuais_btns_from_ctrl()
            formulario.style.display = "inline-block"
            ufoGame.jogoParado()
        })

        let salvarBTN = document.getElementById("salvar-btns")
        salvarBTN.addEventListener("click", (e) => {
            e.preventDefault()
            localStorage.setItem('controles', JSON.stringify(ctrl))
            formulario.style.display = "none"
            mudouStatusSom()
        })

        let cancelarBTN = document.getElementById("cancelar-btn")
        cancelarBTN.addEventListener("click", (e) => {
            e.preventDefault()
            getControlesFromLocalStorage()
            formulario.style.display = "none"
        })

        proximosBTNS.forEach(input => {
            input.addEventListener("keydown", e => {
                e.preventDefault()
                if (e.code === "enter") return
                UpdateCtrlAndSetAtuaisBTNS(e, input.dataset.btn)
            })
        })

        let som = document.querySelector("#som") 
        som.addEventListener("click", (e)=>{
            e.preventDefault()
            ctrl.som = !ctrl.som
            som.value = statusSom()
        })

        
    }

    function UpdateCtrlAndSetAtuaisBTNS(e, nome) {
        switch (nome) {
            case "dir": ctrl.dir = e.code; break
            case "cima": ctrl.cima = e.code; break
            case "baixo": ctrl.baixo = e.code; break
            case "esq": ctrl.esq = e.code; break
            case "tiro": ctrl.tiro = e.code; break
            case "restart": ctrl.restart = e.code; break
        }
        document.querySelector(`[data-btn-atual="${nome}"]`).value = e.code
    }

    const set_atuais_btns_from_ctrl = () => {
        atuaisBTNS.forEach(btn => {
            switch (btn.dataset.btnAtual) {
                case "dir": btn.value = ctrl.dir; break;
                case "cima": btn.value = ctrl.cima; break
                case "baixo": btn.value = ctrl.baixo; break
                case "esq": btn.value = ctrl.esq; break
                case "tiro": btn.value = ctrl.tiro; break
                case "restart": btn.value = ctrl.restart; break
                case "som": btn.value = statusSom(); break
            }
        })
    }

    createConfigBTN()
    criaForm()
    proximosBTNS = document.querySelectorAll(`[data-btn]`)
    atuaisBTNS = document.querySelectorAll(`[data-btn-atual]`)
    startEventsFromBTNS()
})()