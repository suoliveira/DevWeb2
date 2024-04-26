const express = require('express');
const axios = require('axios');
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/imagem-do-dia', async (req, res) => {
    try{
        const response = await axios.get('https://api.nasa.gov/planetary/apod', {
            params: {
                api_key: 'bWZncs8qksIbxcLWihs3EmQgyabspO5UgegxHFK4', 
            },
        });
        
        res.json(response.data);
        
    }catch (error) {
        console.error('Erro ao obter imagem do dia:', error);
        res.status(500).json({ error: 'Erro ao obter imagem do dia' });
    }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

