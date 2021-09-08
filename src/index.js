import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './style.css';
import bonAppetitLogo from './img/BonAppetit-Logo-tenne-tawny-dark.svg';
import { postLike } from './involvement';

const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
// const recipeCloseBtn = document.getElementById('recipe-close-btn');
const queryOptions = {
  Ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
  'Meal name': 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  Area: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=',
  'First letter': 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
  Id: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
};
let selectedQuery = 'Ingredients';
const favoriteMeals = localStorage.favoriteMeals ? JSON.parse(localStorage.favoriteMeals) : [];

const fetchAPI = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let html = '';
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal} image">
                        </div>
                        <div class="meal-name">
                            <h3 class="mb-4">${meal.strMeal}</h3>
                            <div className="d-flex mt-3">
                              <a href="#" class="recipe-btn me-3" id="more-${meal.idMeal}">See more ...</a>
                              <div class="d-inline" id="like-${meal.idMeal}">
                                <i class="fas fa-heart ms-3 ${favoriteMeals.includes(meal.idMeal) ? 'fill-tenne-tawny' : 'fill-empty'}"></i>
                              </div>
                            </div>
                        </div>
                    </div>
                `;
        });
        mealList.innerHTML = html;
        data.meals.forEach((meal) => {
          const likeButton = document.getElementById(`like-${meal.idMeal}`);
          if (!favoriteMeals.includes(meal.idMeal)) {
            likeButton.addEventListener('click', (e) => {
              e.preventDefault();
              likeButton.children[0].classList.add('fill-tenne-tawny');
              likeButton.children[0].classList.remove('fill-empty');
              favoriteMeals.push(meal.idMeal);
              localStorage.favoriteMeals = JSON.stringify(favoriteMeals);
              postLike(meal.idMeal);
            });
          }
          const moreButton = document.getElementById(`more-${meal.idMeal}`);
          moreButton.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log(moreButton);
            await getMealDetails(meal.idMeal);
          });
        });
        mealList.classList.remove('notFound');
      } else {
        mealList.innerHTML = "Sorry, we didn't find any meal!";
        mealList.classList.add('notFound');
      }
    });
};

// get meal list that matches with the ingredients
const getMealList = (e) => {
  e.preventDefault();
  const searchInputTxt = document.getElementById('search-input').value.trim();
  fetchAPI(`${queryOptions[selectedQuery]}${searchInputTxt}`);
};

// get details of the meal
const getMealDetails = async (mealId) => {
  await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    // eslint-disable-next-line no-use-before-define
    .then((data) => mealDetailsModal(data.meals[0]));
};

// create a modal
function mealDetailsModal(meal) {
  const html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "${meal.strMeal} image">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showRecipe');
}

const logo = document.getElementById('img-logo');
const logoFooter = document.getElementById('img-logo-footer');
logo.src = bonAppetitLogo;
logoFooter.src = bonAppetitLogo;

fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then((res) => res.json())
  .then((data) => {
    const navBarCategories = document.getElementById('nav-categories');
    data.categories.forEach((category) => {
      navBarCategories.innerHTML += `
        <li class="nav-item">
          <a class="nav-link" href="#">${category.strCategory}</a>
        </li>
      `;
    });
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < navBarCategories.children.length; i++) {
      navBarCategories.children[i].children[0].addEventListener('click', (e) => {
        e.preventDefault();
        fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.textContent}`);
      });
    }
  });

const suggestionDuChef = document.getElementById('suggestion-du-chef');
suggestionDuChef.addEventListener('click', (e) => {
  e.preventDefault();
  fetchAPI('https://www.themealdb.com/api/json/v1/1/random.php');
});

// event listeners
searchBtn.addEventListener('click', getMealList);

const ulQueries = document.querySelector('#drop-down-queries');
Object.keys(queryOptions).forEach((queryOption) => {
  ulQueries.innerHTML += `<li><a class="dropdown-item query-type" href="#">${queryOption}</a></li>`;
});

const queryTypes = document.querySelectorAll('.query-type');
// eslint-disable-next-line no-plusplus
for (let i = 0; i < queryTypes.length; i++) {
  // eslint-disable-next-line no-loop-func
  queryTypes[i].addEventListener('click', () => {
    selectedQuery = queryTypes[i].textContent;
  });
}
