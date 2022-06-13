class Transform{
    constructor(obj = Objeto, posIni = Vector2){
        this.obj = obj.obj
        this.obj.style.left = posIni.x + "px"
        this.obj.style.top = posIni.y + "px"
        this.position = posIni
    }

    translate(x, y){
       this.moveX(x)
       this.moveY(y)
    }

    moveX(x){
        let proxLeft = parseFloat(this.obj.style.left) + x
        this.obj.style.left = proxLeft + "px" 
        this.position.x = proxLeft
    }

    moveY(y){
        let proxHeight = parseFloat(this.obj.style.top) + y
        this.obj.style.top = proxHeight + "px" 
        this.position.y = proxHeight
    }
    
    rotacionar(graus){
        this.obj.style.transform = `rotate(${graus}deg)`
    }
}