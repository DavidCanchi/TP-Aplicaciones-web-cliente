function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
  
    // Validación de campos vacíos
    if (!nombre || !email || !mensaje) {
      alert('Por favor, completa todos los campos.');
      return false; // No enviamos el formulario
    }
  
    // Validación del formato del email
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,6}$/;
    if (!regexEmail.test(email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return false; // No enviamos el formulario
    }
  
    // Si todo es correcto, mostramos el mensaje de éxito y limpiamos el formulario
    document.getElementById('mensaje-exito').style.display = 'block';
    document.getElementById('formulario').reset(); // Limpiamos los campos del formulario
    return false; // Evitamos el envío real del formulario (simulamos el éxito)
  }