class GameObject{
    constructor (obj = Objeto, transform = Transform, colisao = Colisao, animador = Animador){
        this.obj = obj
        this.transform = transform
        this.colisao = colisao
        this.animador = animador
    }
}

class Objeto {
    constructor(tag = "", classe = "", pai) {
        this.obj = document.createElement("div")
        this.addTag(tag)
        this.addClass(classe)
        this.inserirNoPai(pai)
    }

    addTag(tag) {
        if (tag != "")
            this.obj.id = tag
    }

    addClass(classe) {
        if (classe != "")
            this.obj.className = classe
    }

    inserirNoPai(pai) {
            pai.appendChild(this.obj)
    }
}