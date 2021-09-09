/* eslint-disable no-use-before-define */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './style.css';
import bonAppetitLogo from './img/BonAppetit-Logo-tenne-tawny-dark.svg';
import { fetchAPI } from './mealDB';

const searchBtn = document.getElementById('search-btn');
const queryOptions = {
  Ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
  'Meal name': 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  Area: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=',
  'First letter': 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
  Id: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
};
let selectedQuery = 'Ingredients';
const favoriteMeals = localStorage.favoriteMeals ? JSON.parse(localStorage.favoriteMeals) : [];

// get meal list that matches with the ingredients
const getMealList = (e) => {
  e.preventDefault();
  const searchInputTxt = document.getElementById('search-input').value.trim();
  fetchAPI(`${queryOptions[selectedQuery]}${searchInputTxt}`, favoriteMeals);
};

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
        fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.textContent}`, favoriteMeals);
      });
    }
  });

const suggestionDuChef = document.getElementById('suggestion-du-chef');
suggestionDuChef.addEventListener('click', (e) => {
  e.preventDefault();
  fetchAPI('https://www.themealdb.com/api/json/v1/1/random.php', favoriteMeals);
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
