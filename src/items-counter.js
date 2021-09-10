import pluralize from 'pluralize';

// eslint-disable-next-line import/prefer-default-export
const itemsCounter = (data) => {
  if (data.meals) {
    return `Your search has returned ${pluralize('result', data.meals.length, true)}!`;
  }
  return null;
};

export default itemsCounter;