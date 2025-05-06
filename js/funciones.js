function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
  
    if (!nombre || !email || !mensaje) {
      alert('Por favor, completa todos los campos.');
      return false; 
    } 
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,6}$/;
    if (!regexEmail.test(email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return false; // No enviamos el formulario
    } 
    document.getElementById('mensaje-exito').style.display = 'block';
    document.getElementById('formulario').reset(); 
    return false;
  }