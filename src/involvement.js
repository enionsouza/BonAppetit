const appId = 'yl0Oe9JiB7wA53s9o4SG';

export const postLike = (idMeal) => {
  fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes`, {
    method: 'POST',
    body: JSON.stringify({ item_id: idMeal }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  // .then((response) => response.json())
  // .then((json) => console.log(json));
};

export const postComment = (idMeal, username, comment) => {
  fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ item_id: idMeal, username, comment }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
};