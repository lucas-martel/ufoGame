class Colisao{
    constructor(pai = Objeto, classe, renderColisor = false){
      this.colisorAtivo = true;
      this.colisor = document.createElement('div');
      this.colisor.className = classe
      if(renderColisor)
        this.colisor.style.backgroundColor = "rgba(58, 208, 158, 0.563)" 
      pai.obj.appendChild(this.colisor)
    }

    static colisao(p1, ob2){
      return (p1.x >= ob2.left && p1.x <= ob2.left+ob2.width && p1.y >= ob2.top && p1.y <= ob2.top+ob2.height)
    }

    static criaPontos(pos_obj){
      let pEsq = pos_obj.left;
      let pDir = pos_obj.left + pos_obj.width;
      let pAlturaCima = pos_obj.top;
      let pAlturaBaixo = pos_obj.top + pos_obj.height;
      return [
        {x: pEsq, y: pAlturaCima},
        {x: pEsq, y: pAlturaBaixo},
        {x: pDir, y: pAlturaCima},
        {x: pDir, y: pAlturaBaixo}
      ]
    }

    static estaColidindo(colisao1 = Colisao, colisao2 = Colisao){
      if(!colisao1.colisorAtivo || !colisao2.colisorAtivo) return false
      let clientRect1 = colisao1.colisor.getBoundingClientRect()
      let clientRect2 = colisao2.colisor.getBoundingClientRect()
      let p1 = this.criaPontos(clientRect1)
      let p2 = this.criaPontos(clientRect2)
      var indice = 0
      var colidiu = false
      while(colidiu == false && indice < p2.length - 1) 
        (this.colisao(p1[indice], clientRect2) || this.colisao(p2[indice], clientRect1)) ? colidiu = true : indice++
      return colidiu
    }
}