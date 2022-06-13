class Alerta{
    constructor(id, classe, idPai, posDeInstancia){
        this.box = document.createElement("p")
        this.box.innerText = "alerta"
        this.box.className = classe
        this.box.id = id 
        document.querySelector(`#${idPai}`).appendChild(this.box)
        this.setPos(posDeInstancia)
        this.box.style.display = "none"
    }

    setPos(posDeInstancia){
        this.box.style.left = posDeInstancia.x + "px"
        this.box.style.top = posDeInstancia.y + "px"
    }

    setMSG(msg, tempo){
        this.box.innerHTML = msg
        this.box.style.display = "inline"
        if(tempo <= 0) return
        setTimeout(() => this.box.style.display = "none", tempo*1000)
    }

    setDisplay(status){
        if(status)
            this.box.style.display = "block"
        else
            this.box.style.display = "none"
    }
    
}