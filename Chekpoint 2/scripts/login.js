const form = document.getElementById("form");
const inputSenha = document.getElementById("input-password");
const errorSenha = document.getElementById("senha");
const inputEmail = document.getElementById("input-email");
const errorMessage = document.getElementById("error-message");
const inputPassword = document.getElementById("input-password");
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
// Validando formularios
const nome = document.getElementById("name");
const sobrenome = document.getElementById("surname");
const email = document.getElementById("email");
const repetirSenha = document.getElementById("password-confirm");
const erro = document.querySelector(".erro");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let loginUsuario = {
    email: inputEmail.value,
    password: inputPassword.value,
  };

  const loginUsuarioJson = JSON.stringify(loginUsuario);

  let configuracoesRequisicao = {
    method: "POST",
    body: loginUsuarioJson,
    headers: {
      "Content-type": "application/json",
    },
  };

  inputEmail.value = "";
  inputPassword.value = "";

  async function fazerLogin() {
    await fetch(
      `https://todo-api.ctd.academy/v1/users/login`,
      configuracoesRequisicao
    )
      .then((response) => {
        /* Verifica status de sucesso na execução da promisse */
        console.log(response);
        if (response.status == 201 || response.status == 200) {
          return response.json();
        }
        // Se o código for diferente de sucesso (201), lança um throw para que a execução caia no Catch()
        throw response;
      })
      .then(async function (resposta) {
        console.log(resposta);
        sessionStorage.setItem("jwt", resposta.jwt);
        console.log("chaveJwt\n");
        window.location.href = "tarefas.html";
      });
    /// Direciona o usuário para a tela de tarefas após sucesso ao logar
  }

  fazerLogin();
});

inputEmail.addEventListener("blur", () => {
  if (inputEmail.value === "" || !emailRegex.test(inputEmail.value)) {
    errorMessage.innerHTML = "Não é um email valido";
  } else {
    errorMessage.innerHTML = "";
  }
});

inputSenha.addEventListener("blur", () => {
  if (!passwordRegex.test(inputSenha.value)) {
    errorSenha.innerHTML = "Senha fraca";
  } else {
    errorSenha.innerHTML = "";
  }
});

//vaidação de formularios
function validateName() {
  const nameError = document.getElementById("name-error");
  if (nome.value.length < 1) {
    nameError.textContent = "Nome é obrigatorio";
  } else {
    nameError.textContent = "";
  }
}

function validateLastName() {
  const lastNameError = document.getElementById("last-name-error");
  if (sobrenome.value === "") {
    lastNameError.textContent = "Sobrenome é obrigatorio";
  } else {
    lastNameError.textContent = "";
  }
}

function validateEmail() {
  const emailError = document.getElementById("email-error");
  if (!email.checkValidity() || !emailRegex.test(email.value)) {
    emailError.textContent = "Porfavor, entre com um email valido";
  } else {
    emailError.textContent = "";
  }
}

function validatePassword() {
  const passwordError = document.getElementById("password-error");
  if (inputSenha.value === "") {
    passwordError.textContent = "Password is required.";
  } else if (!passwordRegex.test(inputSenha.value)) {
    passwordError.textContent = "Senha muito fraca";
  } else {
    passwordError.textContent = "";
  }
}

function validateConfirmPassword() {
  const confirmPasswordError = document.getElementById(
    "confirm-password-error"
  );
  if (repetirSenha.value === "") {
    confirmPasswordError.textContent = "Você precisa confirmar a senha ";
  } else if (repetirSenha.value !== inputSenha.value) {
    confirmPasswordError.textContent = "Digite a mesma senha";
  } else {
    confirmPasswordError.textContent = "";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateName();
  validateLastName();
  validateEmail();
  validatePassword();
  validateConfirmPassword();
});
