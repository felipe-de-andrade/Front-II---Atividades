// Obter os valores dos campos de formulário
const botaoEnviar = document.getElementById("submit");
 // Obter os valores dos campos de formulário
const nomevalidacao = document.getElementById("name");
const sobrenomevalidacao = document.getElementById("surname");
const emailvalidacao = document.getElementById("email");
const senhavalidacao = document.getElementById("input-password").value;
const senhaconfirmvalidacao = document.getElementById("password-confirm").value;
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
const repetirSenha = document.getElementById("password-confirm");
const erro = document.querySelector(".erro");
const errorSenha = document.getElementById("senha");
const inputSenha = document.getElementById("input-password");
const inputEmail = document.getElementById("input-email");


botaoEnviar.addEventListener("click", (event) => {
  event.preventDefault();
  const nome = document.getElementById("name").value;
  const sobrenome = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("input-password").value;
  const senhaconfirm = document.getElementById("password-confirm").value;

  if (senha !== senhaconfirm) console.error("As senhas não coincidem");
  else {
    const user = {
      firstName: nome,
      lastName: sobrenome,
      email: email,
      password: senha,
    };

    const userEmJson = JSON.stringify(user);

    const configRequi = {
      method: "POST",
      body: userEmJson,
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("https://todo-api.ctd.academy/v1/users", configRequi)
      .then((response) => {
        //if (response.ok) {
        console.log("Usuário cadastrado com sucesso");
        console.log(response);
        //window.location.href = "index.html";
        // } else {
        //  throw new Error("Erro ao cadastrar usuário");
        //}
      })
      .catch((error) => {
        console.error(error);
      });
  }


  fetch('https://todo-api.ctd.academy/v1/users', configRequi)
  .then(response => {
    if (response.ok) {
      console.log('Usuário cadastrado com sucesso');
      window.location.href = "index.html";
    } else {
      throw new Error('Erro ao cadastrar usuário');
    }
  })
  .catch(error => {
    console.error(error);
  });
};

//vaidação de formularios

function validateName() {
const nameError = document.getElementById('name-error');
console.log('nome', nomevalidacao.value)
if (nomevalidacao.value == '') {
nameError.textContent = 'Nome é obrigatorio';
} else {
nameError.textContent = '';
}
};

function validateLastName() {
const lastNameError = document.getElementById('last-name-error');
if (sobrenomevalidacao.value == '') {
lastNameError.textContent = 'Sobrenome é obrigatorio';
} else {
 lastNameError.textContent = '';
}
}

function validateEmail() {
  const emailError = document.getElementById('email-error');  
  if (!emailvalidacao.checkValidity() || !emailRegex.test(emailvalidacao.value)) {
    emailError.textContent = 'Porfavor, entre com um email valido';
  } else {
    emailError.textContent = '';
  }
};

function validatePassword() {
  const passwordError = document.getElementById('password-error');
  if (inputSenha.value == '') {
    passwordError.textContent = 'Senha é obrigatória.';
  } else if (!passwordRegex.test(inputSenha.value)) {
    passwordError.textContent = 'Senha muito fraca';
  } else {
    passwordError.textContent = '';
  }
};

function validateConfirmPassword() {
  const confirmPasswordError = document.getElementById('confirm-password-error');
  if (repetirSenha.value === '') {
    confirmPasswordError.textContent = 'Você precisa confirmar a senha ';
  } else if (repetirSenha.value !== inputSenha.value) {
    confirmPasswordError.textContent = 'Digite a mesma senha';
  } else {
    confirmPasswordError.textContent = '';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  validateName();
  validateLastName();
  validateEmail();
  validatePassword();
  validateConfirmPassword();
});