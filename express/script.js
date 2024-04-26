function carregarImagem(){
    fetch("http://localhost:3000/imagem-do-dia")
    .then(response => response.json())
    .then(data => {
        console.log(data.url)
        if(data.url){
           const imagem = document.getElementById("ibage")
           imagem.src = data.url
        }
        console.log("testeeeeeeeeee")
    })
}
 window.addEventListener("DOMContentLoaded", function(){
     carregarImagem()
});
