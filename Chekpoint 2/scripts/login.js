let inputEmail = document.getElementById("inputEmail");
let inputPassword = document.getElementById("inputPassword");
let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let  loginUsuario = {
        email: inputEmail.value,
        password: inputPassword.value,
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
          }
          catch(erro) {
              console.log(erro);
          }
      }
  
      fazerLogin();

}) 







