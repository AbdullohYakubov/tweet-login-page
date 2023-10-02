// Getting Elements
const elPostsList = getElement(".posts__list");
const elPostsTemplate = getElement("#posts__template").content;

// Validation of Authentication
const token = localStorage.getItem("token");

if (!token) {
  location.replace("login.html");
}

// Filtering the posts of the selected user
const filterPosts = (array) => {
  const userId = Number(localStorage.getItem("userId"));

  const filteredPosts = array.filter((post) => post.userId === userId);

  return filteredPosts;
};

// Rendering the posts
const renderPosts = (array, node) => {
  elPostsList.innerHTML = null;

  const postsFragment = document.createDocumentFragment();

  array.forEach((post) => {
    const postsTemplate = elPostsTemplate.cloneNode(true);

    getElement(".post", postsTemplate).dataset.postId = post.id;
    getElement(".post__title", postsTemplate).textContent = post.title;
    getElement(".post__content", postsTemplate).textContent = post.body;

    postsFragment.appendChild(postsTemplate);
  });

  node.appendChild(postsFragment);
};

// Fetching the user posts through API
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    if (data) {
      renderPosts(filterPosts(data), elPostsList);
    }
  });

// Catching each post's id and saving it to localStorage
elPostsList.addEventListener("click", (evt) => {
  if (evt.target.matches("li")) {
    const postId = evt.target.dataset.postId;

    localStorage.setItem("postId", postId);

    location.replace("comments.html");
  }
});
