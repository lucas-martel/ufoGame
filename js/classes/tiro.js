class Tiros{
    constructor(pai){
        this.tiros = []
        this.tirosAdicionais = false
        this.tiroParalelosDist = 17
        this.pai = pai
    }

    add(x, y){
        this.instanciaTiro(x, y)
        if(this.tirosAdicionais){
            this.instanciaTiro(x, y + this.tiroParalelosDist)
            this.instanciaTiro(x, y - this.tiroParalelosDist)
        }
    }

    instanciaTiro(x, y){
        let tiroObj = new Objeto("", "tiro", this.pai)
        let transform = new Transform(tiroObj, new Vector2(x, y))
        let colisor = new Colisao(tiroObj, "tiro-colisor", false)
        let tiro = new GameObject(tiroObj, transform, colisor, null)
        this.tiros.push(tiro)
    }

    move(x, y, larguraTela){
        this.tiros.forEach(tiro=>{
            if(tiro.colisao.colisorAtivo){
                tiro.transform.translate(x, y)
                let width = tiro.obj.obj.offsetWidth
                if(tiro.transform.position.x + width > larguraTela)
                    this.destroiTiro(tiro)
            }
        })
    }

    colisao(bombas = Bombas, bombExploAnim, taxa){
        let acertados = 0
        this.tiros.forEach(tiro=>{
            bombas.bombas.forEach(bomba=>{
                if(Colisao.estaColidindo(bomba.colisao, tiro.colisao)){
                    this.destroiTiro(tiro)
                    bombas.explodiu(new Animacao(bombExploAnim, false), {bomb: bomba}, taxa)
                    acertados++  
                }
            })
        })
        return acertados
    }

    destroiTiro(tiro){
        this.tiros.splice(this.tiros.indexOf(tiro), 1)
        tiro.obj.obj.remove()
    }
}