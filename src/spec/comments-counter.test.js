/**
 * @jest-environment jsdom
 */
/* eslint-disable quotes */
/* eslint-disable quote-props */

import commentsCounter from '../comments-counter';

describe('commentsCounter(comments: API response)', () => {
  test('should return the correct amount of comments', () => {
    // Arrange
    document.body.innerHTML = `
            <div id="comments">
            </div>
    `;

    // Act
    commentsCounter([
      {
        "comment": "My insightful comment...",
        "username": "test",
        "creation_date": "2021-09-09",
      },
      {
        "username": "another test",
        "creation_date": "2021-09-09",
        "comment": "My amazing insightful comment...",
      },
      {
        "creation_date": "2021-09-09",
        "username": "John Doe",
        "comment": "Another try",
      },
    ]);

    // Assert
    const h3HTML = document.querySelector('h3');
    const commentsContainer = document.getElementById('comments');
    expect(h3HTML.innerHTML).toBe('3 comments');
    expect(commentsContainer.classList.contains('scroll')).toBe(true);
  });

  test('should correctly inform that there are no comments', () => {
    // Arrange
    document.body.innerHTML = `
            <div id="comments">
            </div>
    `;

    // Act
    commentsCounter({
      "error": {
        "status": 400,
        "message": "'item_id' not found.",
      },
    });

    // Assert
    const h3HTML = document.querySelector('h3');
    expect(h3HTML.innerHTML).toBe('Be the first to comment!');
  });
});
