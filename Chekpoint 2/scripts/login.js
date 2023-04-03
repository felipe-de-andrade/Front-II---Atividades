const form = document.getElementById("form");
const inputSenha = document.getElementById("input-password");
const errorSenha = document.getElementById("senha");
const inputEmail = document.getElementById("input-email");
const errorMessage = document.getElementById("error-message");
const inputPassword = document.getElementById("input-password");
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;




form.addEventListener("submit", (e) => {
    e.preventDefault()
    let  loginUsuario = {
        email: inputEmail.value,
        password: inputPassword.value
      };


      const loginUsuarioJson = JSON.stringify(loginUsuario);

      let configuracoesRequisicao = {
          method: 'POST',
          body: loginUsuarioJson,
          headers: {
              'Content-type': 'application/json',
          },
      }

      inputEmail.value = "";
      inputPassword.value = "";


      async function fazerLogin() {
          try{
              const resposta = await fetch(`https://todo-api.ctd.academy/v1/users/login`, configuracoesRequisicao);
              let chaveJwt = await resposta.json();
              console.log(chaveJwt.jwt);
              window.location.href = "tarefas.html";
          }
          catch(erro) {
              console.log(erro);
          }
      }
      

      fazerLogin();

}) 

inputEmail.addEventListener("blur", () => {
  if (inputEmail.value === "" || !emailRegex.test(inputEmail.value)) {
    errorMessage.innerHTML = "Não é um email valido";
  } else {
    errorMessage.innerHTML = "";
  }
});

inputSenha.addEventListener("blur", () => {
  if (!passwordRegex.test(inputSenha.value)) {
    errorSenha.innerHTML = 'Senha fraca';
  } else {
    errorSenha.innerHTML = '';
  }
});

