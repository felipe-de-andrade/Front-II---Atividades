// Obter os valores dos campos de formulário
const botaoEnviar = document.getElementById("submit");

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
});