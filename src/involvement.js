import { renderLikes } from './render-likes';

const appId = 'emZFdA0IO3Wtnd0ZXf1j';

export const postLike = async (idMeal) => {
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes/`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: idMeal,
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
    .catch((error) => console.error(error));
};

export const getLikes = async () => {
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
    .then((res) => res.json())
    .then((data) => renderLikes(data))
    .catch((error) => console.error(error));
};

export const postComment = (idMeal, username, comment) => {
  fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ item_id: idMeal, username, comment }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((json) => console.log(json));
};