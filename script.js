
// document.getElementById('formDoacao').addEventListener('submit', function(event) {
//     event.preventDefault(); 

//     var nomeDoador = document.getElementById('nomeDoador').value;
//     var tipoAlimento = document.getElementById('tipoAlimento').value;
//     var quantidade = document.getElementById('quantidade').value;
//     var dataValidade = document.getElementById('dataValidade').value;
//     var numeroDoador = document.getElementById('numeroDoador').value; 

//     var doacao = {
//         "nomeDoador": nomeDoador,
//         "tipoAlimento": tipoAlimento,
//         "quantidade": quantidade,
//         "dataValidade": dataValidade,
//         "numeroDoador": numeroDoador
//     };

//     fetch('http://localhost:3000/doacoes', { 
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(doacao)
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Doação enviada com sucesso:', data);
//         document.getElementById('paginaInicial').style.display = 'none'; 
//         document.getElementById('paginaResultados').style.display = 'block'; 
//         var organizacoesLista = document.getElementById('organizacoesLista');
//         var li = document.createElement('li');
//         li.innerHTML = '<p><strong>Nome do Doador:</strong> ' + nomeDoador + '</p><p>Tipo de Alimento: ' + tipoAlimento + '</p><p>Quantidade: ' + quantidade + '</p><p>Data de Validade: ' + dataValidade + '</p>';
//         organizacoesLista.appendChild(li);

//         var btnContato = document.createElement('button');
//         btnContato.textContent = 'Entrar em Contato';
//         btnContato.className = 'btnVerde';
//         organizacoesLista.appendChild(btnContato);

//         btnContato.addEventListener('click', function() {
//             var mensagemDoacao = document.createElement('div');
//             mensagemDoacao.textContent = 'Número do Doador: ' + numeroDoador;
//             organizacoesLista.appendChild(mensagemDoacao);
//         });
//     })
//     .catch(error => {
//         console.error('Erro ao enviar doação:', error);
//     });
// });


function addDoacoes() {
    const nomeDoador = document.getElementById('nomeDoador').value;
    const numeroDoador = document.getElementById('numeroDoador').value;
    const tipoAlimento = document.getElementById('tipoAlimento').value;
    const quantidade = document.getElementById('quantidade').value;
    const dataValidade = document.getElementById('dataValidade').value;
    
    fetch('http://localhost:3000/doacoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nomeDoador,
            numeroDoador,
            tipoAlimento,
            quantidade,
            dataValidade
        }),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.mensagem);

    })
    .catch(error => console.error("Erro:", error));
}
