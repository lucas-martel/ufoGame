(()=>{
    function criaTabelaDePontuacao(scores, pontoAtual){
        return `<table class="tabela">
        <caption>High Scores</caption>
        <thead>
            <tr>
                <td colspan="1">-</td>
                <td colspan="1">score</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1°</td>
                <td>${scores.score[0]}</td>
            </tr>
            <tr>
                <td>2°</td>
                <td>${scores.score[1]}</td>
            </tr>
            <tr>
                <td>3°</td>
                <td>${scores.score[2]}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>Atual: ${pontoAtual}</td>
            </tr>
        </tfoot>
    </table>`
    }

    function criaBtn(){
        return '<button type="submit" id="play-again">Jogar Novamente</button>'
    }

    let divTabela = document.createElement("div")
    divTabela.id = "div-tabela"
    divTabela.innerHTML = criaTabelaDePontuacao(highScores, ufoGame.getBombasDestruidas())+criaBtn()
    divTabela.style.display = "none"
    document.getElementById("terreno").appendChild(divTabela)

    document.getElementById("play-again").addEventListener("click", (e)=>{
        e.preventDefault()
        document.location.reload()
    })

    setTimeout(()=>{
        divTabela.style.display = "inline-block"
        ufoGame.alertaJogo.box.style.display = "none"
    }, 2000)
})()