var explosaoSound = './sounds/explosao.wav'
var cowNoiseSound  = './sounds/cowNoise.wav'
var tiroSound = './sounds/tiro.wav' 
var explosao2Sound = "./sounds/explosao2.wav"
var pop = "./sounds/pop.wav"

class SongController {
    constructor(statusSom) {
        this.somAtivo = statusSom;
    }

    play(pathSong){
        if(this.somAtivo)
            new Audio(pathSong).play();
    }

    setSomAtivo(novoStatus){
        this.somAtivo = novoStatus; 
    }
}