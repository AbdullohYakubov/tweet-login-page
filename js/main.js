// Getting Elements
const elUsersList = getElement(".users__list");
const elUsersTemplate = getElement("#users__template").content;
const elLogoutBtn = getElement(".logout__btn");

// Validatation of Authentication
const token = localStorage.getItem("token");

if (!token) {
  location.replace("login.html");
}

// Log out logic
elLogoutBtn.addEventListener("click", (evt) => {
  if (evt.target.matches(".logout__btn")) {
    localStorage.removeItem("token");
    location.replace("index.html");
  }
});

// Rendering the users
const renderUsers = (array, node) => {
  node.innerHTML = null;

  const usersFragment = document.createDocumentFragment();

  array.forEach((user) => {
    const usersTemplate = elUsersTemplate.cloneNode(true);

    getElement(".user", usersTemplate).dataset.userId = user.id;
    getElement(".user__name", usersTemplate).textContent = user.name;
    getElement(".user__username", usersTemplate).textContent = user.username;
    getElement(".user__email", usersTemplate).textContent = user.email;
    getElement(".user__street", usersTemplate).textContent =
      user.address.street;
    getElement(".user__city", usersTemplate).textContent = user.address.city;
    getElement(".user__zipcode", usersTemplate).textContent =
      user.address.zipcode;
    getElement(".user__phone", usersTemplate).textContent = user.phone;
    getElement(".user__website", usersTemplate).textContent = user.website;
    getElement(".user__company", usersTemplate).textContent = user.company.name;

    usersFragment.appendChild(usersTemplate);
  });

  node.appendChild(usersFragment);
};

// Fetching user info through API
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    if (data) {
      renderUsers(data, elUsersList);
    }
  })
  .catch((err) => (elUsersList.innerHTML = err));

// Catching each user's id and saving it to localStorage
elUsersList.addEventListener("click", (evt) => {
  if (evt.target.matches("li")) {
    const userId = evt.target.dataset.userId;

    console.log(userId);

    localStorage.setItem("userId", userId);

    location.replace("posts.html");
  }
});
