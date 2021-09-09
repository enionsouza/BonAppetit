/* eslint-disable import/prefer-default-export */
import pluralize from 'pluralize';

export const renderComments = (comments) => {
  const commentsContainer = document.getElementById('comments');
  commentsContainer.innerHTML = `<h3>${pluralize('comment', comments.length, true)}</h3>`;
  comments.reverse().forEach((comment) => {
    commentsContainer.innerHTML += `
      <div class="comment-details">
        <p>${comment.username} on ${comment.creation_date}:</p>
        <p><em>${comment.comment}</em></p>
      </div>
      <br />
    `;
  });
  if (comments.length > 4) {
    commentsContainer.classList.add('scroll');
  }
};

export const renderNoComments = () => {
  const commentsContainer = document.getElementById('comments');
  commentsContainer.innerHTML = '<h3>Be the first to comment!</h3>';
};
