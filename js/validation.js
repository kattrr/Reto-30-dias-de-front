const form = document.getElementById("signUpForm");
const nameInput = document.getElementById("nombre-input");
const emailInput = document.getElementById("email-input");
const passInput = document.getElementById("password-input");
const repeatPassInput = document.getElementById("repeat-password-input");
const errorSms = document.getElementById("error-mensajes");

const allInputs = [nameInput, emailInput, passInput, repeatPassInput];

// 🔁 Quitar errores en tiempo real
allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.parentElement.classList.remove("error");
  });
});

form.addEventListener("submit", (e) => {
  let errors = [];

  // ❌ Prevenir mensajes nativos del navegador
  e.preventDefault();

  // 🚫 Validación HTML5 nativa reemplazada con mensajes personalizados
  allInputs.forEach((input) => {
    if (!input.checkValidity()) {
      input.parentElement.classList.add("error");
      errors.push(`${input.placeholder} es obligatorio`);
    } else {
      if (!email.value.includes("@") || !email.value.includes(".")) {
        errors.push("Ingresa un correo electrónico válido.");
        emailInput.parentElement.classList.add("error");
      }
    }
  });

  // 🚫 Validaciones extra específicas
  if (passInput.value.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres.");
    passInput.parentElement.classList.add("error");
  }

  if (passInput.value !== repeatPassInput.value) {
    errors.push("Las contraseñas no coinciden.");
    repeatPassInput.parentElement.classList.add("error");
  }

  if (errors.length > 0) {
    errorSms.innerText = errors.join(". ");
  } else {
    form.submit(); // ✅ Si todo está bien, se envía manualmente
  }
});
