class Player{
    constructor(jogador = GameObject){
        this.jogador = jogador
        this.vivo = true
        this.escudoAtivo = false
    }

    setEscudo(status){
        this.escudoAtivo = status
        if(this.escudoAtivo){
            this.jogador.obj.obj.style.borderStyle = "solid"
            this.jogador.obj.obj.style.borderColor = "chartreuse"
            this.jogador.obj.obj.style.borderRadius = "20px"
        }else{
            this.jogador.obj.obj.style.removeProperty("border-style")
            this.jogador.obj.obj.style.removeProperty("border-color")
            this.jogador.obj.obj.style.removeProperty("border-radius")
        }
    }

    move(movX, movY, alturaDel, larguraDel, anim){
        let left = this.jogador.transform.position.x
        let maxDir = larguraDel - this.jogador.obj.obj.offsetWidth
        let proxMovX = left + movX
        if(proxMovX < 0)    movX = -left
        else if(proxMovX > maxDir)  movX = maxDir - left

        let top = this.jogador.transform.position.y
        let maxInf = alturaDel - this.jogador.obj.obj.offsetHeight
        let proxMovY = top + movY
        if(proxMovY < 0)    movY = -top
        else if(proxMovY > maxInf)  movY = maxInf - top

        this.translate(movX, movY, anim)
    }
    
    translate(movX, movY, anim){
        if(!this.vivo) return
        this.jogador.transform.translate(movX, movY)
        this.rotaciona(movX)
        this.jogador.animador.play(anim)
    }

    rotaciona(x){
        let dir = x > 0 ? '30' : x < 0 ? '-30' : '0' 
        this.jogador.transform.rotacionar(dir)
    }

    colidiuVaca(vacas, somControl){
        for(let i =0; i < vacas.vacas.length; i++){
            if(Colisao.estaColidindo(this.jogador.colisao, vacas.vacas[i].colisao)){
                vacas.destroi(vacas.vacas[i])
                return true
            }
        }
        return false
    }

    colidiuBomba(bombas, animBombaExplodiu, animPlayersExplodiu, taxa){
        for(let i =0; i < bombas.bombas.length; i++){
            if(Colisao.estaColidindo(this.jogador.colisao, bombas.bombas[i].colisao)){
                if(!this.escudoAtivo)
                    this.explodiu(animPlayersExplodiu, taxa)
                bombas.explodiu(new Animacao(animBombaExplodiu, false), {bomb: bombas.bombas[i]}, taxa)
                return {colidiu: true, bomb: bombas.bombas[i]}
            }
        }
        return {colidiu: false, bomb: null}    
    }

    explodiu(animExplosao, taxa){
        if(this.vivo){
            this.jogador.colisao.colisorAtivo = false
            this.jogador.transform.rotacionar('-90')
            this.vivo = false
        }
        let id = setInterval(()=>{
            this.playAnim(animExplosao)    
        }, taxa)
        setTimeout(this.destroiPlayer, 1000, id, this.jogador)
    }

    playAnim(anim){
        this.jogador.animador.play(anim)
    }

    destroiPlayer(id, jogador){
        clearInterval(id)
        jogador.obj.obj.remove()
    }
}