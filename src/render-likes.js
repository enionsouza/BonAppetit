/* eslint-disable import/prefer-default-export */

export const renderLikes = (likes) => {
  const mealList = document.getElementById('meal');
  for (let i = 0; i < mealList.children.length; i += 1) {
    const mealId = mealList.children[i].getAttribute('data-id');
    const likeBtn = mealList.querySelector(`#like-${mealId}`);
    const likesQty = document.createElement('span');
    likesQty.id = `#likes-qty-${mealId}`;
    likesQty.innerHTML = likes.reduce((acc, val) => {
      if (val.item_id === mealId) {
        return acc + val.likes;
      }
      return acc;
    }, 0);
    const parentDiv = likeBtn.parentNode;
    parentDiv.insertBefore(likesQty, likeBtn);
  }
};
