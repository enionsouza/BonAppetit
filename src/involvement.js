import { renderLikes } from './render-likes';
import commentsCounter from './comments-counter';

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
  });
};

export const getLikes = async () => {
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
    .then((res) => res.json())
    .then((data) => renderLikes(data));
};

export const postComment = async (idMeal, username, comment) => {
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments`, {
    method: 'POST',
    body: new URLSearchParams({ item_id: idMeal, username, comment }),
  })
    .then((res) => res.text());
};

export const getComments = async (idMeal) => {
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments?item%5Fid=${idMeal}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    redirect: 'follow',
  })
    .then((res) => res.json())
    .then((comments) => commentsCounter(comments));
};
