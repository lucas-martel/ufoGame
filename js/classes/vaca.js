class Vacas{
    constructor(pai){
        this.vacas = []
        this.pai = pai
    }

    add(pos){
        let vacaObj = new Objeto("", "vaca", this.pai)

        let top = Math.floor(Math.random() * (pos.y - vacaObj.obj.offsetHeight))
        let posIni = new Vector2(pos.x, top)
        let transform = new Transform(vacaObj, posIni)
        let colisor = new Colisao(vacaObj, "vaca-colisor", false)
        let animador = null
        let vaca = new GameObject(vacaObj, transform, colisor, animador)
        this.vacas.push(vaca)
        vaca.obj.obj.style.transform =  `rotate(${Instancia.getRandomInt(0, 360)}deg)`
        this.vacas.push(vaca)
    }

    move(x, y){
        this.vacas.forEach(vaca=>{
            if(vaca.colisao.colisorAtivo){
                vaca.transform.translate(x, y)
                let width = vaca.obj.offsetWidth
                if(vaca.transform.position.x + width < 0)
                    this.destroi(vaca)
            }
        })
    }

    destroi(vaca){
        let index = this.vacas.indexOf(vaca)
        this.vacas[index].obj.obj.remove()
        this.vacas.splice(index, 1)
    }
}