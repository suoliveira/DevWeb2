const express = require("express");
const app = express();
const port = 3000;


app.get("/proibido", (req, res) =>{
    res.status(403).send("Acesso Proibido")
});

app.post("/post", (req, res) => {
    res.status(200).send("POST recebido");
})

app.get("/notfound", (req, res) =>{
    res.status(404).send("Não encontrado")
});

app.get("/nao", (req, res) =>{
    res.status(401).send("Não autorizado")
});

app.get("/error" , (req, res) => {
    res.status(500).send("Erro de servidor");
});

app.get("/", (req, res) =>{
   res.status(200).send("Get feito");
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});