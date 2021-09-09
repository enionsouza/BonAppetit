/* eslint-disable import/prefer-default-export */
import { postComment, getComments } from './involvement';

const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// get details of the meal
export const getMealDetails = async (mealId) => {
  await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    // eslint-disable-next-line no-use-before-define
    .then((data) => mealDetailsModal(data.meals[0]));
};

// create a modal
function mealDetailsModal(meal) {
  const ingredient = [];
  const measure = [];
  let i = 1;
  while (meal[`strIngredient${i}`]) {
    ingredient.push(meal[`strIngredient${i}`]);
    measure.push(meal[`strMeasure${i}`]);
    i += 1;
  }
  let ingredientsHTML = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < ingredient.length; i++) {
    ingredientsHTML += `<li><span>${ingredient[i]}</span>: <span>${measure[i]}</span></li>`;
  }
  const youTubeLink = meal.strYoutube.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
  const html = `
        <div class = "recipe-meal-img">
          <img src = "${meal.strMealThumb}" alt = "${meal.strMeal} image">
        </div>
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class="recipe">
          <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
          </div>
          <div className="recipe-ingredient">
            <h3>Ingredients:</h3>
            <ul className="ingredients-list">
              ${ingredientsHTML}
            </ul>
          </div>
        </div>
        <div class = "recipe-link">
          <iframe width="560" height="315" src="${youTubeLink}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="wrapper inner">
          <div id="comments">
          </div>
          <div>
            <form action="">
              <h3>Add Comment</h3>
              <p>What is your opinion about this meal?</p>
              <label class="form-group">
                <input id="user-name" type="text" class="form-control-details" required placeholder="Name" row="3">
                <span class="border"></span>
              </label>
              <label class="form-group">
                <textarea id="user-opinion" class="form-control-details" required placeholder="Share your thought" cols="7" rows="7"></textarea>
                <span class="border"></span>
              </label>
              <button id="submit-comment">Submit</button>
            </form>
          </div>
        </div>
        <a href="${meal.strSource} class="detail-source">Source</a>
    `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showRecipe');
  getComments(meal.idMeal);

  // Add Event Listeners
  const submitComment = document.getElementById('submit-comment');
  const userNameInput = document.getElementById('user-name');
  const userOpinionInput = document.getElementById('user-opinion');
  submitComment.addEventListener('click', (e) => {
    e.preventDefault();
    if (userNameInput.value.trim() && userOpinionInput.value.trim()) {
      postComment(meal.idMeal, userNameInput.value.trim(), userOpinionInput.value.trim());
      userNameInput.value = '';
      userOpinionInput.value = '';
      getComments(meal.idMeal);
    }
  });
}

recipeCloseBtn.addEventListener('click', () => {
  mealDetailsContent.parentElement.classList.remove('showRecipe');
});
