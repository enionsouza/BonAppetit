import pluralize from 'pluralize';

const commentsCounter = (comments) => {
  const commentsContainer = document.getElementById('comments');
  if (comments.length > 0) {
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
    if (comments.length > 2) commentsContainer.classList.add('scroll');
  } else commentsContainer.innerHTML = '<h3>Be the first to comment!</h3>';
};

export default commentsCounter;
