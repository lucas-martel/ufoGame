(()=>{
    let paginaJogo = "./ufo.html"
    let jogarBtn = document.querySelectorAll("[data-jogar]")
    jogarBtn.forEach(btn=>{
        btn.addEventListener("click", (e)=>{
            e.preventDefault()
            tipoDevice(btn.dataset.jogar)
        })
    })

    function tipoDevice(tipo){
        let isMobile = tipo == "mobile"
        salvaTipoDevice(isMobile)
        location.href = paginaJogo
    }

    function salvaTipoDevice(device){
        let aux = {val: device} 
        localStorage.setItem("ismobile", JSON.stringify(aux))
        console.log("salvo")
    }
})()