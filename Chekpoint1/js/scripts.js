let board = document.getElementById("board");
let buttonAdd = document.getElementById("add");
let inputNm = document.getElementById("NomePersonagem");
let UrlImg = document.getElementById("UrlImg");
let inputDisc = document.getElementById("DiscrPersonagem");

//Verifica se já existe uma tarefa
let listaTarefas = [];
if (localStorage.getItem("listaTarefas")) {
  listaTarefas = JSON.parse(localStorage.getItem("listaTarefas"));
} else {
  localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
}

mostrarNaTela(listaTarefas);

// Printa e armazena a tarefa
inputNm.onkeypress = function (event) {
  if (event.key == "Enter") {
    let valorDigitado = inputNm.value;
    listaTarefas.push(valorDigitado);

    gerarTarefa(valorDigitado, listaTarefas.length - 1);

    localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));

    inputNm.value = "";
    UrlImg.value = "";
    inputDisc.value = "";
  }
};

// O Ato de apertar o botão gera
buttonAdd.onclick = function () {
  objeto = {
    nome: inputNm.value,
    imagem: UrlImg.value,
    descricao: inputDisc.value,
  };
  if (
    objeto.nome.length < 1 ||
    objeto.imagem.length < 1 ||
    objeto.descricao.length < 1
  ) {
    return alert("Preencha todos campos");
  }

  listaTarefas.push(objeto);
  gerarTarefa(objeto, listaTarefas.length - 1);
  localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
  inputNm.value = "";
  UrlImg.value = "";
  inputDisc.value = "";
};
//Função JavaScript para renderizar uma lista de tarefas
function mostrarNaTela(listaTarefas) {
  board.innerHTML = "";
  listaTarefas.forEach(function (valor, posicao) {
    gerarTarefa(valor, posicao);
  });
}

//Função que Cria os Cards
function gerarTarefa(valorDigitado, posicao) {
  let tarefa = document.createElement("div");

  tarefa.setAttribute("class", "tarefa");
  tarefa.setAttribute("posicao", posicao);

  let coluna = document.createElement("div");
  coluna.setAttribute("class", "col-md-8");

  let titulo = document.createElement("h1");
  titulo.textContent = valorDigitado.nome;

  let img = document.createElement("img");
  img.setAttribute("src", valorDigitado.imagem);
  img.setAttribute('class','tamanho')

  let desc = document.createElement("p");
  desc.textContent = valorDigitado.descricao;

  let buttonCheck = document.createElement("div");
  buttonCheck.setAttribute("class", "col-md-2");

  let imgCheck = document.createElement("img");
  imgCheck.setAttribute("class", "icon");
  imgCheck.setAttribute("src", "img/erro.png");

  buttonCheck.appendChild(imgCheck);

  imgCheck.onclick = function (event) {
    let posicaoTarefa = tarefa.getAttribute("posicao");
    listaTarefas = listaTarefas.filter(function (valor, posicao) {
      return posicao != posicaoTarefa;
    });

    mostrarNaTela(listaTarefas);
    localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
    tarefa.remove();
  };

  coluna.appendChild(titulo);
  coluna.appendChild(img);
  coluna.appendChild(desc);
  tarefa.appendChild(coluna);
  tarefa.appendChild(buttonCheck);
  board.appendChild(tarefa);
}
