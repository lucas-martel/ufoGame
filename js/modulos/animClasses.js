class Animacao{
    constructor(frames, loop){
        this.classeAtual = 0
        this.frameAtual = 0
        this.frames = frames
        this.loop = loop
    }    
    play(obj){
        if(this.classeAtual == this.frames.length){
            if(this.loop) this.classeAtual = 0
            else return
        }
        if(this.frameAtual < this.frames[this.classeAtual].frames){
            if(this.frameAtual == 0)
                obj.className = this.frames[this.classeAtual].classe
            this.frameAtual++
        }else{
            this.classeAtual++
            this.frameAtual = 0
        }
    }
}

class Animador{
    constructor(obj){
        this.obj = obj
    }

    play(animacao = Animacao){
        animacao.play(this.obj.obj)
    }

}