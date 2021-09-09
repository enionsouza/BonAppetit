/* eslint-disable import/prefer-default-export */
import { postLike, getLikes } from './involvement';
import { getMealDetails } from './meal-details';

export const fetchAPI = async (url, favoriteMeals) => {
  const mealList = document.getElementById('meal');
  await fetch(url)
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
                              <a href="#" class="recipe-btn me-3" id="more-${meal.idMeal}">See more...</a>
                              <div class="d-inline" id="like-${meal.idMeal}">
                                <i class="fas fa-heart ms-3 ${favoriteMeals.includes(meal.idMeal) ? 'fill-tenne-tawny' : 'fill-empty'}"></i>
                              </div>
                            </div>
                        </div>
                    </div>
                `;
        });
        mealList.innerHTML = html;
        getLikes();

        data.meals.forEach((meal) => {
          const likeButton = document.getElementById(`like-${meal.idMeal}`);
          const likeClick = (e) => {
            e.preventDefault();
            likeButton.children[0].classList.add('fill-tenne-tawny');
            likeButton.children[0].classList.remove('fill-empty');
            favoriteMeals.push(meal.idMeal);
            localStorage.favoriteMeals = JSON.stringify(favoriteMeals);
            postLike(meal.idMeal);
            const likesQty = document.getElementById(`#likes-qty-${meal.idMeal}`);
            likesQty.innerHTML = parseInt(likesQty.innerHTML, 10) + 1;
            likeButton.removeEventListener('click', likeClick);
          };
          if (!favoriteMeals.includes(meal.idMeal)) {
            likeButton.addEventListener('click', likeClick);
          }
          const moreButton = document.getElementById(`more-${meal.idMeal}`);
          moreButton.addEventListener('click', async (e) => {
            e.preventDefault();
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
