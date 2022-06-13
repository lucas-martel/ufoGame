class UFOGame {
    constructor(fps, taxa_atualizacao, statusSom) {
        this.fps = fps
        this.taxa_atualizacao = taxa_atualizacao
        this.velocidadePlayer = 4
        this.velocidadeTiro = 10
        this.velocidadeBomba = -2
        this.velocidadeEstrela = -0.3
        this.velocidadeVaca = -2.4

        this.bombasDestruidas = 0
        this.maxVidaNaveMae = 10
        this.tempoParaUsoBonus = 2
        this.alvoBombasDestruidas = this.escolheProxAlvoBombasDestruidas(5, 20)
        
        this.movX = 0
        this.movY = 0

        let terrenoOBJ = new Objeto("terreno", "terreno", document.body)

        this.width_terreno = terrenoOBJ.obj.offsetWidth - 3
        this.height_terreno = terrenoOBJ.obj.offsetHeight - 3

        this.terreno = new GameObject(terrenoOBJ, null, null, null)
        this.criaJogador(terrenoOBJ.obj)
        this.criaEstrelas(terrenoOBJ.obj)
        this.criaBombas(terrenoOBJ.obj)
        this.criaVacas(terrenoOBJ.obj)
        this.criaNaveMaeVida(terrenoOBJ.obj)
        this.tiros = new Tiros(terrenoOBJ.obj)
        this.criaAlertas()
        this.somControl = new SongController(statusSom)
        this.acabouJogo = false
        this.iniciaAumentoDeVelocidade = true
    }

    //#region criacao de variaveis

    aumentoDeVelocidade() {
        if(this.acabouJogo) return
        setTimeout(() => {
                this.bombas.velMax -= 0.2
                this.instanciadorBombas.seed -= 0.2
                this.aumentoDeVelocidade()
        }, 60000)
    }

    criaNaveMaeVida(pai) {
        let obj = new Objeto("", "vida-nave-mae", pai)
        let posBarra = new Vector2(0, 0)
        let transform = new Transform(obj, posBarra)
        let barraObj = new GameObject(obj, transform, null, null)
        let largura = 10
        this.barraDeVidaNaveMae = new Barra(barraObj, transform, this.maxVidaNaveMae, largura, this.height_terreno)
    }

    criaEstrelas(pai) {
        this.estrelas = new Estrelas(pai)
        let pos = new Vector2(0, 0)
        this.estrelas.add(pos)
        let fpsAlvo = Instancia.getRandomInt(1, 3) * this.fps
        this.instanciadorEstrelas = new Instancia(fpsAlvo, this.estrelas, this.width_terreno, 0, 10, 20, this.fps)
    }

    criaJogador(pai) {
        let jogObj = new Objeto("Player", "ufo", pai)
        let posInicial = new Vector2(0, this.height_terreno / 2)
        let transform = new Transform(jogObj, posInicial)
        let colisor = new Colisao(jogObj, "ufo-colisor", false)
        let animador = new Animador(jogObj)
        let jog = new GameObject(jogObj, transform, colisor, animador)
        this.player = new Player(jog)
    }

    criaBombas(pai) {
        this.bombas = new Bombas(pai, this.velocidadeBomba)
        let fpsAlvo = Instancia.getRandomInt(1, 3) * this.fps
        this.instanciadorBombas = new Instancia(fpsAlvo, this.bombas, this.width_terreno, this.height_terreno, 0, 3, this.fps)
    }

    criaVacas(pai) {
        this.vacas = new Vacas(pai)
        this.instanciadorVacas = new Instancia(0, this.vacas, this.width_terreno, this.height_terreno, 0, 0, this.fps)
    }

    criaAlertas() {
        this.alertaBonus = new Alerta("alerta-bonus", "alerta-bonus", "terreno", new Vector2(this.width_terreno / 2.5, this.height_terreno / 1.1))
        this.alertaJogo = new Alerta("alerta-jogo", "inicio-jogo", "terreno", new Vector2(this.width_terreno / 3, this.height_terreno / 2.5))

        this.alertaJogo.setMSG("Jogar", -1)

        this.score = new Alerta("score", "pontuacao", "terreno", new Vector2(this.width_terreno / 3, 0))
        this.score.setMSG("Score: 0", -1)
    }
    //#endregion

    update() {
        if (this.iniciaAumentoDeVelocidade) {
            this.iniciaAumentoDeVelocidade = false
            this.aumentoDeVelocidade()
        }
        this.jogoAcabou()

        this.instanciadorEstrelas.InstanciadorSystem()
        this.instanciadorBombas.InstanciadorSystem()

        if (this.bombasDestruidas >= this.alvoBombasDestruidas) {
            this.instanciadorVacas.InstanciadorSystem()
            this.alvoBombasDestruidas = this.escolheProxAlvoBombasDestruidas(5, 10)
        }

        this.moveObjetos()

        if (this.bombas.atingiuNaveMae()) {
            this.barraDeVidaNaveMae.setValue(-1, new Vector2(0, 1))
            this.somControl.play(explosao2Sound)
        }
        if (this.player.colidiuBomba(this.bombas, bombaExplodiu_anim, animPlayerExplodiu, this.taxa_atualizacao).colidiu) this.somControl.play(explosaoSound)
        this.addPonto(this.tiros.colisao(this.bombas, bombaExplodiu_anim, this.taxa_atualizacao))

        if (this.player.colidiuVaca(this.vacas)) {
            this.somControl.play(cowNoiseSound)
            this.bonusDeColisaoComVaca()
        }
        return this.acabouJogo
    }

    jogoAcabou() {
        if (!this.naveMaeFoiDestruida() && this.player.vivo) return

        if (this.naveMaeFoiDestruida()) {
            this.alertaJogo.setMSG("A nave mae Foi Destruida!", -1)
            this.player.explodiu(animPlayerExplodiu, this.taxa_atualizacao)
        }
        else if (!this.player.vivo)
            this.alertaJogo.setMSG("Voce Explodiu", -1)
        this.acabouJogo = true
    }

    escolheProxAlvoBombasDestruidas(min, max) {
        return this.bombasDestruidas + Instancia.getRandomInt(min, max)
    }

    dentroDoJogo() {
        this.alertaJogo.setMSG("Proteja A Nave Mãe", 2)
    }

    naveMaeFoiDestruida() {
        if (this.barraDeVidaNaveMae.valor <= 0) return true
        return false
    }

    moveObjetos() {
        this.player.move(this.movX, this.movY, this.height_terreno, this.width_terreno, animNaveGirando)
        this.bombas.move()
        this.tiros.move(this.velocidadeTiro, 0, this.width_terreno)
        this.estrelas.move(this.velocidadeEstrela, 0)
        this.vacas.move(this.velocidadeVaca, 0)
    }

    mudouTam() {
        let heightAtual = this.terreno.obj.obj.offsetHeight - 3
        let widthAtual = this.terreno.obj.obj.offsetWidth - 3
        let widthIgual = this.width_terreno == widthAtual
        let heightIgual = this.height_terreno ==  heightAtual
        if(widthIgual && heightIgual) return false

        this.width_terreno = widthAtual
        this.height_terreno = heightAtual

        this.instanciadorBombas.height = this.height_terreno
        this.instanciadorBombas.width = this.width_terreno
        this.instanciadorVacas.width = this.width_terreno
        this.instanciadorVacas.height = this.height_terreno
        this.instanciadorEstrelas.width = this.width_terreno

        this.alertaBonus.setPos(new Vector2(this.width_terreno/2.5, this.height_terreno/1.1))
        this.alertaJogo.setPos(new Vector2(this.width_terreno/3, this.height_terreno/2.5))
        this.score.setPos(new Vector2(this.width_terreno/3,0))
        
        this.barraDeVidaNaveMae.resetValues(this.height_terreno)
        return true
    }

    //#region bonus
    bonusDeColisaoComVaca() {
        switch (Instancia.getRandomInt(0, 5)) {
            case 0: this.tiroTriplo(this.tiros, true); break
            case 1: this.aumentaVelocidade(); break
            case 2: this.escudo(this.player, true); break
            case 3: this.aumentaTempoParaUsoDeBonus(); break
            case 4: this.recuperaUmaVidaNaveMae(); break
        }
    }

    tiroTriplo(tiros, status) {
        tiros.tirosAdicionais = status
        if (status) {
            this.alertaBonus.setMSG(`tiro Triplo`, this.tempoParaUsoBonus)
            setTimeout(this.tiroTriplo, this.tempoParaUsoBonus * 1000, tiros, false)
        }
    }

    aumentaVelocidade() {
        this.velocidadePlayer += 0.1
        this.alertaBonus.setMSG("+1 de Velocidade", 3)
    }

    escudo(player, status) {
        player.setEscudo(status)
        if (status) {
            setTimeout(this.escudo, this.tempoParaUsoBonus * 1000, player, false)
            this.alertaBonus.setMSG(`escudo Ativo`, this.tempoParaUsoBonus)
        }
    }

    aumentaTempoParaUsoDeBonus() {
        this.tempoParaUsoBonus += 0.2
        this.alertaBonus.setMSG(`+tempo ${this.tempoParaUsoBonus.toFixed(1)} segundos`, 3)
    }

    recuperaUmaVidaNaveMae() {
        let atual = this.barraDeVidaNaveMae.valor
        let max = this.barraDeVidaNaveMae.valorMax
        if (atual == max){
            this.alertaBonus.setMSG(`max nave mãe`, 3)
            return    
        }
        this.barraDeVidaNaveMae.setValue(1, new Vector2(0, 1))
        this.alertaBonus.setMSG(`+1 de vida para nave mãe`, 3)
    }
    //#endregion

    jogoParado(){
        this.alertaJogo.setMSG("Jogar", -1)
    }

    addPonto(acertados) {
        if (acertados == 0) return
        this.bombasDestruidas += acertados
        this.score.box.innerText = `Score: ${this.bombasDestruidas}`
        this.somControl.play(explosaoSound)
    }

    setMovX(direcao) {
        this.movX = direcao * this.velocidadePlayer
    }

    setMovY(direcao) {
        this.movY = direcao * this.velocidadePlayer
    }

    atira() {
        this.tiros.add(this.player.jogador.transform.position.x + 36, this.player.jogador.transform.position.y + (this.player.jogador.obj.obj.offsetHeight/2))
        this.somControl.play(tiroSound)
    }

    mudouStatusSom(novoStatus) {
        this.somControl.setSomAtivo(novoStatus)
    }

    getBombasDestruidas() {
        return this.bombasDestruidas
    }
}