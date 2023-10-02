const elLoginForm = getElement(".login__form");
const elLoginEmail = getElement(".login__email-input");
const elLoginPassword = getElement(".login__password__input");

elLoginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const emailInput = elLoginEmail.value.trim();
  const passwordInput = elLoginPassword.value.trim();

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailInput,
      password: passwordInput,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data?.token) {
        localStorage.setItem("token", data.token);
        location.replace("index.html");
      }
    });
});
