
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('http://localhost:3000/doacoes', (req, res) => {
    const novaDoacao = req.body;
    const doacoesAnteriores = JSON.parse(fs.readFileSync('data.json'));

    doacoesAnteriores.push(novaDoacao);
    fs.writeFileSync('data.json', JSON.stringify(doacoesAnteriores));

    res.json({ message: 'Doação recebida com sucesso!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
