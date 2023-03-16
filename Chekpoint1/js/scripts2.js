document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que o formulário seja enviado
    document.querySelector('#container').style.display = 'block'; // Torna o elemento visível
  });