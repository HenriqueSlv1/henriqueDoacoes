const express = require('express')
const fs = require('fs')
const cors = require('cors')

const app = express()
const PORT = 3000
app.use(cors())
app.use(express.json())

const dados = require("./data/organizacoes.json")

app.get('/doacoes', (req, res) => {
    return res.json(dados.doacoes)
});

app.post('/doacoes', (req, res) => {
    const novoDoacao = req.body

    try {
        const ultimoId = dados.doacoes.length > 0 ? dados.doacoes[dados.doacoes.length - 1].id : 0
        novoDoacao.id = ultimoId + 1

        dados.doacoes.push(novoDoacao)
        salvarDados(dados)

        return res.status(201).json({ mensagem: "Sucesso" })
    } catch (error) {
        console.error('Erro ao salvar a doação:', error)
        return res.status(500).json({ mensagem: "Erro ao salvar a doação" })
    }
});

app.delete('/doacoes/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const index = dados.doacoes.findIndex(doacao => doacao.id === id)
    if (index !== -1) {
        dados.doacoes.splice(index, 1)
        salvarDados(dados)
        return res.status(200).json({ mensagem: "Doação deletada com sucesso" })
    } else {
        return res.status(404).json({ mensagem: "Doação não encontrada" })
    }
})

function salvarDados() {
    fs.writeFileSync(__dirname + "/data/organizacoes.json", JSON.stringify(dados, null, 2))
}

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});
