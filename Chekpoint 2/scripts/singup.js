const form = document.getElementById("form");
const nome = document.getElementById("name");
const sobrenome = document.getElementById("surname");
const email = document.getElementById("email");
const inputSenha = document.getElementById("input-password");
const repetirSenha = document.getElementById("password-confirm");
const erro = document.querySelector(".erro");
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;


function validateName() {
  const nameError = document.getElementById('name-error');
  if (nome.value === '') {
    nameError.textContent = 'Nome é obrigatorio';
  } else {
    nameError.textContent = '';
  }
}

function validateLastName() {
  const lastNameError = document.getElementById('last-name-error');
  if (sobrenome.value === '') {
    lastNameError.textContent = 'Sobrenome é obrigatorio';
  } else {
    lastNameError.textContent = '';
  }
}

function validateEmail() {
  const emailError = document.getElementById('email-error');
  if (!email.checkValidity() || !emailRegex.test(email.value)) {
    emailError.textContent = 'Porfavor, entre com um email valido';
  } else {
    emailError.textContent = '';
  }
}

function validatePassword() {
  const passwordError = document.getElementById('password-error');
  if (inputSenha.value === '') {
    passwordError.textContent = 'Password is required.';
  } else if (!passwordRegex.test(inputSenha.value)) {
    passwordError.textContent = 'Senha muito fraca';
  } else {
    passwordError.textContent = '';
  }
}

function validateConfirmPassword() {
  const confirmPasswordError = document.getElementById('confirm-password-error');
  if (repetirSenha.value === '') {
    confirmPasswordError.textContent = 'Você precisa confirmar a senha ';
  } else if (repetirSenha.value !== inputSenha.value) {
    confirmPasswordError.textContent = 'Digite a mesma senha';
  } else {
    confirmPasswordError.textContent = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  validateName();
  validateLastName();
  validateEmail();
  validatePassword();
  validateConfirmPassword();
});