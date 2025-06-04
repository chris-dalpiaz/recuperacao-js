//https://brasilapi.com.br/api/ddd/v1/{ddd}
let listaDddsConsultados = [];

function percorrerListaDdd() {
    //fazer for para percorrer a lista aqui
}

function buscarDdd() {
    const inputDdd = document.getElementById('n_ddd'); // puxar input
    const numeroDdd = inputDdd.value; //pegar dados do input

    fetch('https://brasilapi.com.br/api/ddd/v1/' + numeroDdd)
        .then((resposta) => {
            return resposta.json();
        })
        .then((json) => {
            //fazer aqui verificação com for se já foi cadastrado esse ddd

            //objeto com os dados puxados
            const novoDdd = {
                ddd: numeroDdd,
                estado: json.state,
                cidades: json.cities,
            }


            //verificar se ddd já foi consultado
            for (ddd of listaDddsConsultados) {
                if (ddd == novoDdd.ddd) {
                    alert("Esse DDD já foi consultado");
                    return;
                }
            }

            limparDadosNaTela(); //limpando lista
            //percorrendo lista de cidades salva no objeto novoddd
            for (cidade of novoDdd.cidades) {
                carregarCidadeNaTela(cidade);//chamando funcao para percorrer lista
            }

            carregarDddsConsultadosNaTela(novoDdd.ddd, novoDdd.estado); //carregando na tela
            listaDddsConsultados.push(novoDdd.ddd); //salvando na lista
        });
}

function carregarDddsConsultadosNaTela(inputDdd, inputEstado) {
    const novaLinha = document.createElement('tr');     //criando a nova linha

    //criando colunas
    const colunaDdd = document.createElement('td');   
    const colunaEstado = document.createElement('td');  

    //definindo os valores como o valor solicitado pela funcao
    colunaDdd.innerText = inputDdd; 
    colunaEstado.innerText = inputEstado; 

    //adicionando colunas a nova linha
    novaLinha.appendChild(colunaDdd);
    novaLinha.appendChild(colunaEstado);

    const tabelaDdds = document.getElementById('tabela_ddds'); //puxando a lista de dds 
    tabelaDdds.appendChild(novaLinha); //criando filho pra tabela
}

function limparDadosNaTela() {
    const listaCidades = document.getElementById('lista_cidades'); //chamando lista
    listaCidades.innerHTML = ``;  //limpando lista com innerhtml
}

function carregarCidadeNaTela(inputCidade) {
    const itemCidade = document.createElement('li'); //criando uma variavel que sera a criadora do item lista
    itemCidade.innerText = inputCidade; //definindo o valor do item lista como o valor solicitado pela funcao

    const listaCidades = document.getElementById('lista_cidades'); //puxando a lista de cidades 
    listaCidades.appendChild(itemCidade); //criando filho pra lista
}


function carregarEventos() {
    const botaoBuscar = document.getElementById('buscar_ddd'); //chamando botao
    botaoBuscar.addEventListener('click', buscarDdd); //evento de clique que chama buscarddd
}

window.addEventListener('load', carregarEventos);