
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json())

const dados = require("./data/organizacoes.json")



app.post('/doacoes', (req, res) => {
    const novoDoacao = req.body;

    try {
        const ultimoId = dados.doacoes.length > 0 ? dados.doacoes[dados.doacoes.length - 1].id : 0;
        novoDoacao.id = ultimoId + 1;

        dados.doacoes.push(novoDoacao);
        salvarDados(dados);

        return res.status(201).json({ mensagem: "Sucesso" });
    } catch (error) {
        console.error('Erro ao salvar a doação:', error);
        return res.status(500).json({ mensagem: "Erro ao salvar a doação" });
    }
});



function salvarDados(){
    fs.writeFileSync(__dirname + "/data/organizacoes.json",JSON.stringify(dados,null,2))
    }


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
