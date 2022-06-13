class Bombas {
    constructor(pai, velMax) {
        this.bombas = []
        this.velocidade = []
        this.velMax = velMax
        this.pai = pai
    }

    add(pos) {
        let bombaObj = new Objeto("", "bomba", this.pai)

        let top = Math.floor(Math.random() * (pos.y - bombaObj.obj.offsetHeight))
        let posIni = new Vector2(pos.x, top)
        let transform = new Transform(bombaObj, posIni)
        let colisor = new Colisao(bombaObj, "bomba-colisor", false)
        let animador = new Animador(bombaObj)
        let bomba = new GameObject(bombaObj, transform, colisor, animador)
        this.bombas.push(bomba)
        let vel = Instancia.getRandomFloat(this.velMax, -0.7)
        this.velocidade.push(vel)
    }

    move() {
        for(let i = 0; i < this.bombas.length; i++){
            if(this.bombas[i].colisao.colisorAtivo){
                this.bombas[i].transform.translate(this.velocidade[i], 0)
            }
        }
    }

    atingiuNaveMae() {
        for (let i = 0; i < this.bombas.length; i++) {
            if (this.bombas[i].colisao.colisorAtivo && this.bombas[i].transform.position.x + this.bombas[i].obj.obj.offsetWidth < 0) {
                this.destroiBomba(this.bombas, this.bombas.indexOf(this.bombas[i]), this.velocidade)
                return true
            }
        }
        return false
    }

    explodiu(animExplosao, colisaoObj, taxa) {
        let bombIndex = this.bombas.indexOf(colisaoObj.bomb)
        this.bombas[bombIndex].colisao.colisorAtivo = false
        let id = setInterval(() => {
            this.playAnim(animExplosao, colisaoObj.bomb)
        }, taxa)
        setTimeout(this.destroiBombaEInterval, 2000, id, this.bombas, colisaoObj.bomb, this.destroiBomba, this.velocidade)
    }

    playAnim(anim, bomba) {
        this.bombas[this.bombas.indexOf(bomba)].animador.play(anim)
    }

    destroiBombaEInterval(id, bombas, bomba, destruirBomba, velocidade) {
        clearInterval(id)
        destruirBomba(bombas, bombas.indexOf(bomba), velocidade)

    }

    destroiBomba(bombas, index, velocidade) {
        bombas[index].obj.obj.remove()
        bombas.splice(index, 1)
        velocidade.splice(index, 1)
    }
}