import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './style.css';

const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const queryOptions = {
  'Ingredient': 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
  'Meal name': 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  'Category': 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
  'Area': 'https://www.themealdb.com/api/json/v1/1/filter.php?a=',
  'First letter': 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
  'Id': 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
};
let selectedQuery = 'Ingredients';

// get meal list that matches with the ingredients
const getMealList = (e) => {
  e.preventDefault();
  let searchInputTxt = document.getElementById('search-input').value.trim();
  let url = `${queryOptions[selectedQuery]}${searchInputTxt}`;
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let html = "";
      if (data.meals) {
        data.meals.forEach(meal => {
          html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
        });
        mealList.classList.remove('notFound');
      } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add('notFound');
      }

      mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains('recipe-btn')) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then(response => response.json())
      .then(data => mealRecipeModal(data.meals));
  }
}

// create a modal
function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showRecipe');
}


// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
// recipeCloseBtn.addEventListener('click', () => {
//   mealDetailsContent.parentElement.classList.remove('showRecipe');
// });

const ulQueries = document.querySelector('.dropdown-menu');
Object.keys(queryOptions).forEach((queryOption) => {
  ulQueries.innerHTML += `<li><a class="dropdown-item" href="#">${queryOption}</a></li>`
});

const queryTypes = document.querySelectorAll('.dropdown-item');
// eslint-disable-next-line no-plusplus
for (let i = 0; i < queryTypes.length; i++) {
  // eslint-disable-next-line no-loop-func
  queryTypes[i].addEventListener('click', () => {
    selectedQuery = queryTypes[i].textContent;
  });
}
