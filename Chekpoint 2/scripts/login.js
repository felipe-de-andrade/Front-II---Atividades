const form = document.getElementById("form");
const inputSenha = document.getElementById("input-password");
const errorSenha = document.getElementById("senha");
const inputEmail = document.getElementById("input-email");
const errorMessage = document.getElementById("error-message");
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
const passwordRegex = /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z]).{8,}$/;



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

