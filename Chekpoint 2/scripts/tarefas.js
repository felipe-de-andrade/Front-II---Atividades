let submit = document.getElementById("submit");
var jwt;

onload = () => {
  jwt = sessionStorage.getItem("jwt");

  // Simulação da validação
  if (!jwt) {
    alert("Você não está logado, página indisponível");
    window.location = "index.html";
  }

  getTarefas();
};

async function buscarUsuario() {
  let configuracoesRequisicao = {
    // method: 'GET', // Não é necessário escrever o GET
    headers: {
      authorization: jwt,
    },
  };
  try {
    let resposta = await fetch(
      `${apiBaseUrl()}/users/getMe`,
      configuracoesRequisicao
    );
    let dados = await resposta.json();
    console.log(dados.firstName);
    renderizaNomeUsuario(dados);
  } catch (error) {
    console.log(erro);
  }
}

let form_nova_tarefa = document.querySelector(".nova-tarefa");

// Printa e armazena a tarefa
form_nova_tarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();
  let valorDigitado = document.getElementById("novaTarefa");

  if (valorDigitado.value != "") {
    let corpoDaRequisicao = {
      description: valorDigitado.value,
      completed: false,
    };
    let configuracoesRequisicao = {
      method: "POST",
      body: JSON.stringify(corpoDaRequisicao),
      headers: {
        "Content-type": "application/json",
        authorization: jwt,
      },
    };
    fetch(`${apiBaseUrl()}/tasks`, configuracoesRequisicao)
      .then((chamada) => {
        if (chamada.status == 201 || chamada.status == 200) {
          return chamada.json();
        }
        throw response;
      })
      .then((dados) => {
        console.log(dados);
        //adicionarNovaTarefaDom(dados);
        valorDigitado.value = "";
        getTarefas();
      });
  }
});

async function getTarefas() {
  let ul = document.getElementsByClassName("tarefas-pendentes")[0];
  let ul_concluida = document.getElementsByClassName("tarefas-terminadas")[0];

  ul.innerHTML = "";
  ul_concluida.innerHTML = "";

  let configuracoesRequisicao = {
    headers: {
      authorization: jwt,
    },
  };

  await fetch(`${apiBaseUrl()}/tasks?`, configuracoesRequisicao)
    .then((res) => res.json())
    .then((dados) => {
      dados.forEach((valor) => {
        gerarTarefa(valor);
      });
    })
    .catch((e) => console.log(e));
}

//Função que Cria os Cards
function gerarTarefa(dados) {
  let ul = document.getElementsByClassName("tarefas-pendentes")[0];
  let ul_concluida = document.getElementsByClassName("tarefas-terminadas")[0];

  let nova_tarefa = document.createElement("li");
  let data = new Date(dados.createdAt).toLocaleDateString("pt-BR");
  let horario = new Date(dados.createdAt).toLocaleTimeString("pt-BR");

  nova_tarefa.classList.add("tarefa");
  nova_tarefa.id = `id_${dados.id}`;

  if (!dados.completed)
    nova_tarefa.innerHTML = `
           <div class="not-done" onclick="mover_concluida(${dados.id})"></div>
               <div class="descricao">
                <p class="nome">${dados.description}</p>
                <p class="timestamp">
                    ${data}
                    ${horario}
                </p>
            </div>`;
  else
    nova_tarefa.innerHTML = `
            <div class="not-done"></div>
                <div class="descricao">
                <p class="nome">${dados.description}</p>
                <div class="opcoes-tarefas-completas">
                  <button onclick="voltar_tarefa(${dados.id})"><i id="tarefa_${dados.id}" class="fas fa-undo-alt change" title="Voltar para tarefa pendente"></i></button>
                  <button onclick="excluir_tarefa(${dados.id})"><i id="tarefa_${dados.id}" class="far fa-trash-alt"></i></button>
                </div>
            </div>`;

  if (!dados.completed) ul.appendChild(nova_tarefa);
  else ul_concluida.appendChild(nova_tarefa);
}

function mover_concluida(id_alvo) {
  let atualiza_dados = {
    completed: true,
  };

  let atualiza_tarefa = {
    method: "PUT",
    body: JSON.stringify(atualiza_dados),
    headers: {
      "Content-type": "application/json",
      authorization: jwt,
    },
  };

  fetch(`${apiBaseUrl()}/tasks/${id_alvo}`, atualiza_tarefa)
    .then(() => getTarefas())
    .then(() => console.log("Atualiza"))
    .catch((e) => console.log(e));
}

function voltar_tarefa(id_alvo) {
  let atualiza_dados = {
    completed: false,
  };

  let atualiza_tarefa = {
    method: "PUT",
    body: JSON.stringify(atualiza_dados),
    headers: {
      "Content-type": "application/json",
      authorization: jwt,
    },
  };

  fetch(`${apiBaseUrl()}/tasks/${id_alvo}`, atualiza_tarefa)
    .then(() => getTarefas())
    .then(() => console.log("Atualiza"))
    .catch((e) => console.log(e));
}

function excluir_tarefa(id_alvo) {
  let atualiza_tarefa = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      authorization: jwt,
    },
  };

  fetch(`${apiBaseUrl()}/tasks/${id_alvo}`, atualiza_tarefa)
    .then(() => getTarefas())
    .then(() => console.log("Excluido com sucesso"))
    .catch((e) => console.log(e));
}

function apiBaseUrl() {
  return "https://todo-api.ctd.academy/v1";
}
