import React, { useState } from 'react';
import './ingredient_list.scss';

const IngredientList = (props) => {
  const {ingredients} = props;
  const [currentFilter, setFilterColor] = useState(null);

  const filterColors = [...new Set(ingredients.flatMap(item => item.colors))];

  const renderStyles = (currentFilter, color) => (
    currentFilter === color
    ? {'backgroundColor': color, boxShadow: '0 0 4px 2px #00F'}
    : {'backgroundColor': color}
  )

  const renderFilters = () => filterColors.map(c => (
    <button onClick={() => setFilterColor(currentFilter => c)}
            className="ingredient_list-filter"
            name="itemFilter"
            style={{'backgroundColor': c}}
            data-filter={c}
            key={c}>
    </button>)
  );


  return (
    <div className="ingredient_list">
      <h2>Ingredient List</h2>
      <aside className="ingredient_list-toggler">
        <label htmlFor="itemFilter">Filters</label>
        {renderFilters()}
        <button onClick={() => setFilterColor(currentFilter => null)}>
          Clear
        </button>
      </aside>
      <ul>
      {ingredients.map(item =>
        <li key={item.id} className="ingredient_list-item">
          {item.name}
          <span> [{item.qty}] </span>
          {item.colors.map(color =>
            <span key={color}
                  className="ingredient_list-attribute"
                  style={renderStyles(currentFilter, color)}>
            </span>
          )}
        </li>)
      }
      </ul>
    </div>
  );
}

export default IngredientList;
