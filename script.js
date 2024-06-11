document.getElementById('formDoacao').addEventListener('submit', function(event) {
    event.preventDefault()

    var nomeDoador = document.getElementById('nomeDoador').value
    var tipoAlimento = document.getElementById('tipoAlimento').value
    var quantidade = document.getElementById('quantidade').value
    var dataValidade = document.getElementById('dataValidade').value
    var numeroDoador = document.getElementById('numeroDoador').value

    var doacao = {
        "nomeDoador": nomeDoador,
        "tipoAlimento": tipoAlimento,
        "quantidade": quantidade,
        "dataValidade": dataValidade,
        "numeroDoador": numeroDoador
    };

    fetch('http://localhost:3000/doacoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doacao)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Doação enviada com sucesso:', data)
        document.getElementById('paginaInicial').style.display = 'none'
        document.getElementById('paginaResultados').style.display = 'block'

        carregarDoacoes()
    })
    .catch(error => {
        console.error('Erro ao enviar doação:', error);
    });
});

function deletarDoacoes(id) {
    fetch(`http://localhost:3000/doacoes/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Doação excluída com sucesso:', data)
        carregarDoacoes()
    })
    .catch(error => {
        console.error('Erro ao excluir doação:', error)
    });
}

function carregarDoacoes() {
    fetch('http://localhost:3000/doacoes')
        .then(response => response.json())
        .then(doacoes => {
            const organizacoesLista = document.getElementById('organizacoesLista');
            organizacoesLista.innerHTML = '' // Limpa o conteúdo atual da lista
            
            // Itera sobre cada doação e cria um elemento para exibi-la na lista
            doacoes.forEach(doacao => {
                const li = document.createElement('li')
                li.classList.add('doacao')
                li.innerHTML = `
                    <h2>Nome do Doador: ${doacao.nomeDoador}</h2>
                    <p><strong>Tipo de Alimento:</strong> ${doacao.tipoAlimento}</p>
                    <p><strong>Quantidade:</strong> ${doacao.quantidade}</p>
                    <p><strong>Data de Validade:</strong> ${doacao.dataValidade}</p>
                    <button class="btnVerde">Entrar em Contato</button>
                    <button class="btnExcluir">Excluir</button>
                    <div class="mensagemDoacao" style="display: none;">Número do Doador: ${doacao.numeroDoador}</div>
                `;
                organizacoesLista.appendChild(li)

                const btnContato = li.querySelector('.btnVerde');
                const mensagemDoacao = li.querySelector('.mensagemDoacao');
                btnContato.addEventListener('click', function() {
                    mensagemDoacao.style.display = 'block'
                });

                const btnExcluir = li.querySelector('.btnExcluir');
                btnExcluir.addEventListener('click', function() {
                    deletarDoacoes(doacao.id)
                });
            });
        })
        .catch(error => console.error('Erro ao carregar as doações:', error))
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('paginaResultados').style.display = 'block'
    carregarDoacoes()
})
