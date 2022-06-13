class Instancia{
    constructor(fpsAlvo, paiDoInstanciado, width, height, minFpsAlvo, maxFpsAlvo, seed){
        this.fpsIni = 0
        this.fpsAlvo = fpsAlvo
        this.paiDoInstanciado = paiDoInstanciado
        this.width = width
        this.height = height
        this.minFpsAlvo = minFpsAlvo
        this.maxFpsAlvo = maxFpsAlvo
        this.seed = seed
    }

    InstanciadorSystem(){
        if(this.fpsIni++ >= this.fpsAlvo){
            this.addInstancia(this.width, this.height)
            this.fpsIni = 0
            this.proxFpsAlvo(this.minFpsAlvo, this.maxFpsAlvo)
        }
    }

    addInstancia(x, y){
        this.paiDoInstanciado.add(new Vector2(x, y))
    }
    
    proxFpsAlvo(min, max){
        this.fpsAlvo = Instancia.getRandomInt(min, max) * this.seed
    }

    static getRandomInt(min, max){
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor( Math.random() * (max - min) ) + min
    }

    static getRandomFloat(min, max){
        return Math.random() * (max - min) + min    
    }
}