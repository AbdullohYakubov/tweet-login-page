// Getting Elements
const elCommentsList = getElement(".comments__list");
const elCommentsTemplate = getElement("#comments__template").content;

// Validation of Authentication
const token = localStorage.getItem("token");

if (!token) {
  location.replace("login.html");
}

const filterComments = (array) => {
  const postId = Number(localStorage.getItem("postId"));

  const fileredComments = array.filter((comment) => comment.postId === postId);

  return fileredComments;
};

const renderComments = (array, node) => {
  elCommentsList.innerHTML = null;

  const commentsFragment = document.createDocumentFragment();

  array.forEach((comment) => {
    const commentsTemplate = elCommentsTemplate.cloneNode(true);

    getElement(".comment", commentsTemplate).dataset.commentId = comment.id;
    getElement(".comment__title", commentsTemplate).textContent = comment.name;
    getElement(".comment__writer", commentsTemplate).textContent =
      comment.email;
    getElement(".comment__content", commentsTemplate).textContent =
      comment.body;

    commentsFragment.appendChild(commentsTemplate);
  });

  node.appendChild(commentsFragment);
};

fetch("https://jsonplaceholder.typicode.com/comments")
  .then((response) => response.json())
  .then((data) => {
    if (data) {
      renderComments(filterComments(data), elCommentsList);
    }
  });
