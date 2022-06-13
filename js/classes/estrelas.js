class Estrelas{
    constructor(pai){
        this.estrelas = []
        this.pai = pai
    }
   
    add(pos){
        let estrelaObj = new Objeto("", "estrela", this.pai)
        let transform = new Transform(estrelaObj, pos)
        let estrela = new GameObject(estrelaObj, transform, null, null)
        this.estrelas.push(estrela)
    }

    move(x, y){
        this.estrelas.forEach(estrela=>{
            if(this.saiu(estrela.obj))
                this.destruir(estrela)
            else estrela.transform.translate(x, y)
        })
    }

    saiu(estrela){
        return parseInt(estrela.obj.style.left) + estrela.obj.offsetWidth <= 0
    }
    
    destruir(estrela){
        this.estrelas.splice(this.estrelas.indexOf(estrela), 1)
        estrela.obj.obj.remove()
    }
}