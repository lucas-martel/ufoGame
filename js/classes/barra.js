class Barra{
    constructor(obj, transform, valorMax, largura, altura){
        this.larguraInicial = largura
        this.alturaInicial = altura
        this.valorMax = valorMax 
        this.valor = this.valorMax
        this.barra = obj
        this.setAltura(altura)
        this.setLargura(largura)
        
    }

    setLargura(largura){
        this.barra.obj.obj.style.width = largura + "px"
    }

    setAltura(altura){
        this.barra.obj.obj.style.height = altura + "px"
    }

    resetValues(novaAltura){
        this.alturaInicial = novaAltura
        this.setValue(0, new Vector2(0, 1))
    }

    setValue(val, dir){
        this.valor += val
        if(dir.x > 0){
            let novaLargura = (this.larguraInicial * this.valor) / this.valorMax
            this.setLargura(novaLargura)
        }else{
            let novaAltura = (this.alturaInicial * this.valor) / this.valorMax
            this.setAltura(novaAltura)
        }
    }
}