class UFOGame{
    constructor(){
        this.tempo_milseg = 1000;
        this.FPS = 50;
        this.taxa_atualizacao = this.tempo_milseg / this.FPS;
        this.velocidadePlayer = 4
        this.velocidadeTiro = 10
        this.velocidadeBomba = -2
        this.velocidadeEstrela = -0.3
        this.velocidadeVaca = -2.4
        this.bombasDestruidas = 0
        this.vidaNaveMae = 100

        this.pontuacaoParaBonus = 0
        this.bonusAtual = 0
        this.randorIntanciaVaca = Instancia.getRandomInt(0, 1)  
        this.maxIntanciaVaca = 0
        

        this.movX = 0
        this.movY = 0
        this.criaTerreno() //terreno height_terreno width_terreno
        this.criaPontuacao()
        this.criaEstrelas()
        this.criaJogador()
        this.tiros = new Tiros()
        this.criaBombas()
        this.criaVacas()
        this.barra = new Barra("","vida-nave-mae","terreno", this.vidaNaveMae, new Vector2(0, 0), 15, this.height_terreno)
        this.alertaBonus = new Alerta("alerta-bonus", "alerta-bonus", "terreno", new Vector2(this.width_terreno/2, this.height_terreno))
        this.alertaJogo = new Alerta("alerta-jogo", "inicio-jogo", "terreno", new Vector2(this.width_terreno/2, this.height_terreno/2))
        
    }

    //#region criacao de variaveis
    criaTerreno(){
        this.terreno = new GameObject("terreno", "terreno", "jogo")
        this.width_terreno = this.terreno.obj.offsetWidth - 2 
        this.height_terreno = this.terreno.obj.offsetHeight - 2
    }

    criaPontuacao(){
        this.pontuacao = document.createElement("p")
        this.pontuacao.innerText = `Score: ${this.bombasDestruidas}`
        this.pontuacao.className = "pontuacao"
        this.terreno.obj.appendChild(this.pontuacao)
        this.pontuacao.style.left = (this.width_terreno/2 - this.pontuacao.offsetWidth) + "px"
        this.pontuacao.style.top = -10 + 'px'
    }

    criaEstrelas(){
        this.estrelas = new Estrelas()
        this.estrelas.add(0, 0)
        let fpsAlvoEst = Instancia.getRandomInt(1, 3) * this.FPS
        this.instanciadorEstrelas = new Instancia(fpsAlvoEst, this.estrelas, this.width_terreno, 0, 10, 20, this.FPS)
    }

    criaJogador(){
        let jog = new GameObject("Player", "ufo", "terreno", new Vector2(0, 200))
        jog.colisao = new Colisao(jog.obj, 20, 72, 5, 14, true)
        jog.animador = new Animador(jog.obj)
        this.player = new Player(jog)
     }

     criaBombas(){
        this.bombas = new Bombas()
        let fpsAlvo = Instancia.getRandomInt(1, 3) * this.FPS
        this.instanciadorBombas = new Instancia(fpsAlvo, this.bombas, this.width_terreno, this.height_terreno, 0, 3, this.FPS)
     }

     criaVacas(){
        this.vacas = new Vacas()
        let fpsAlvo = Instancia.getRandomInt(0, 1) * this.FPS
        this.instanciadorVacas = new Instancia(0, this.vacas, this.width_terreno, this.height_terreno, 0, 0, this.FPS)
     }
     //#endregion

    update(){
        if(this.barra.valorAtual <= 0){
            this.alertaJogo.startMSG("A nave mae Foi Destruida!", -1)
            this.player.explodiu(animPlayerExplodiu, this.taxa_atualizacao)
        }
        else if(!this.player.vivo){
            this.alertaJogo.startMSG("Voce Explodiu", -1)
        }

        this.instanciadorEstrelas.controle()
        this.instanciadorBombas.controle()
        if(this.pontuacaoParaBonus >= this.maxIntanciaVaca + this.randorIntanciaVaca){
            this.instanciadorVacas.controle()
            this.pontuacaoParaBonus = -1
        }

        this.player.move(this.movX, this.movY, this.height_terreno, this.width_terreno, animNaveGirando)
        this.bombas.move(this.velocidadeBomba, 0, this.barra)
        this.tiros.move(this.velocidadeTiro, 0, this.width_terreno)
        this.estrelas.move(this.velocidadeEstrela, 0)
        this.vacas.move(this.velocidadeVaca, 0)

        this.player.colidiuBomba(this.bombas, bombaExplodiu_anim, animPlayerExplodiu, this.taxa_atualizacao)
        this.addPonto(this.tiros.colisao(this.bombas, bombaExplodiu_anim, this.taxa_atualizacao))
        
        if(this.player.colidiuVaca(this.vacas))
            this.bonusDeColisaoComVaca()
    }
    //#region bonus
    bonusDeColisaoComVaca(){
            this.pontuacaoParaBonus = 0
            this.randorIntanciaVaca = Instancia.getRandomInt(0, 10)
            if(this.bonusAtual >= 3) 
                this.bonusAtual = 0
            switch(this.bonusAtual){
                case 0: this.tiroTriplo(this.tiros, true); break
                case 1: this.aumentaVelocidade(); break
                case 2: this.escudo(this.player, true); break
            }
            this.bonusAtual++
    }

    tiroTriplo(tiros, status){ 
        tiros.tirosAdicionais = status
        if(status){ 
            this.alertaBonus.startMSG("tiro Triplo Ativado por 5 segundos", 3)
            setTimeout(this.tiroTriplo, 5000, tiros, false)
        }
    }

    aumentaVelocidade(){
        this.velocidadePlayer += 0.1
        this.alertaBonus.startMSG("+1 de Velocidade", 3)
    }

    escudo(player, status){
        player.setEscudo(status)
        if(status){
             setTimeout(this.escudo, 5000, player, false)
             this.alertaBonus.startMSG("escudo Ativado por 5 segundos", 3)
        }
    }

    //#endregion

    addPonto(acertados){
        if(acertados == 0) return
        this.bombasDestruidas += acertados
        if(this.pontuacaoParaBonus != -1)
            this.pontuacaoParaBonus += acertados
        this.pontuacao.innerText = `Score: ${this.bombasDestruidas}`
    }

    setMovX(direcao){
        this.movX = direcao * this.velocidadePlayer
    }

    setMovY(direcao){
        this.movY = direcao * this.velocidadePlayer
    }

    atira(){
        this.tiros.add(this.player.jogador.transform.position.x+36, this.player.jogador.transform.position.y+16)
    }
}