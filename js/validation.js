const form = document.getElementById("signUpForm");
const nameInput = document.getElementById("nombre-input");
const emailInput = document.getElementById("email-input");
const passInput = document.getElementById("password-input");
const repeatPassInput = document.getElementById("repeat-password-input");
const errorSms = document.getElementById("error-mensajes");

form.addEventListener("submit", (e) => {
  //
  let errors = [];
  if (nameInput) {
    errors = getSignUpFormErrors(
      nameInput.value,
      emailInput.value,
      passInput.value,
      repeatPassInput.value
    );
  } else {
    errors = getLoginFormErrors(emailInput.value, passInput.value);
  }
  if (errors.length > 0) {
    e.preventDefault();
    errorSms.innerText = errors.join(". ");
    // nameInput.value = "";
    // emailInput.value = "";
    // passInput.value = "";
    // repeatPassInput.value = "";
  }
});
function getSignUpFormErrors(name, email, pass, repeatPass) {
  let errors = [];

  if (name === "" || name == null) {
    errors.push("Nombre es obligatorio");
    nameInput.parentElement.classList.add("error");
  }
  if (email === "" || email == null) {
    errors.push("Correo Electronico es obligatorio");
    emailInput.parentElement.classList.add("error");
  }
  // if (!email.value.includes("@") || !email.value.includes(".")) {
  //   errors.push("Ingresa un correo electrónico válido.");
  //   emailInput.parentElement.classList.add('error');
  // }
  if (pass === "" || pass == null) {
    errors.push("Contraseña es obligatoria");
    passInput.parentElement.classList.add("error");
  }
  // if (pass.value.length < 6) {
  //   errors.push("La contraseña debe tener al menos 6 caracteres.");
  //   passInput.parentElement.classList.add('error');
  // }
  if (repeatPass === "" || repeatPass == null) {
    errors.push("Repetir la contraseña es obligatorio");
    repeatPassInput.parentElement.classList.add("error");
  }
  return errors;
}
const allInputs = [nameInput, emailInput, passInput, repeatPassInput];
allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("error")) {
      input.parentElement.classList.remove("error");
    }
  });
});
