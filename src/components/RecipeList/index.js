import React from 'react';
import './recipes.scss';
import RECIPES from '../../data/recipes.js';

const RecipeList = ({allOrders}) => {

  const groupBy = (arr, key) => {
    return arr.reduce((rv, item) => {
      if (item.filled) {
        (rv[item[key]] = rv[item[key]] || []).push(item);
      }
      return rv;
    }, {});
  };

  const filledOrders = groupBy(allOrders, 'recipe');

  return (
    <div className="recipe_list">
      <h2>Recipes Ordered</h2>
      <ul>
        {RECIPES.map(recipe =>
          <li key={recipe.id} className="recipes-item">
            {recipe.name}:
            <span> {filledOrders[recipe.id] !== undefined
                    ? filledOrders[recipe.id].length
                    : '0'}</span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default RecipeList;
