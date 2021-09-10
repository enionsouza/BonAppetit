/**
 * @jest-environment jsdom
 */
/* eslint-disable quotes */
/* eslint-disable quote-props */

import itemsCounter from '../items-counter';

describe('itemsCounter(data: API response)', () => {
  test('should return the correct amount of items', () => {
    // Arrange & Act
    const output = itemsCounter({
      "meals": [{
        "strMeal": "Chilli prawn linguine",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/usywpp1511189717.jpg",
        "idMeal": "52839",
      },
      {
        "strMeal": "Fettucine alfredo",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/uquqtu1511178042.jpg",
        "idMeal": "52835",
      },
      {
        "strMeal": "Grilled Mac and Cheese Sandwich",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/xutquv1505330523.jpg",
        "idMeal": "52829",
      },
      {
        "strMeal": "Lasagna Sandwiches",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg",
        "idMeal": "52987",
      },
      {
        "strMeal": "Lasagne",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg",
        "idMeal": "52844",
      },
      {
        "strMeal": "Pilchard puttanesca",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/vvtvtr1511180578.jpg",
        "idMeal": "52837",
      },
      {
        "strMeal": "Spaghetti alla Carbonara",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
        "idMeal": "52982",
      },
      {
        "strMeal": "Venetian Duck Ragu",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/qvrwpt1511181864.jpg",
        "idMeal": "52838",
      },
      ],
    });

    // Assert
    expect(output).toBe('Your search has returned 8 results!');
  });

  test('should correctly inform that there are no items', () => {
    // Arrange & Act
    const output = itemsCounter(
      {
        "meals": null,
      },
    );

    // Assert
    expect(output).toBe(null);
  });
});
