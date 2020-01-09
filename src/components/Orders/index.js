import React, { useState } from 'react';
import './orders.scss';
import recipes from '../../data/recipes.js';

const Orders = ({items,
                 isEnabled,
                 parentCallback,
                 handleOrder,
                 allOrders,
                 isProcessing,
                 postOrder,
                 cancelOrder,
                 setIsCancelled}) => {
  // single state for selected option
  const [recipeId, setRecipeId] = useState(recipes[0].id);

  const pendingOrders = allOrders.filter(order => {
    return order['pending'] === true;
  })

  return (
    <section className="orders">
      <h2>Add an Order</h2>
      <label htmlFor="select_recipe">Select Recipe:<br/>
        <select name="select_recipe"
                id="select_recipe"
                onChange={e => {
                  const val = e.target.value;
                  setRecipeId(val);
                  parentCallback(val);
                }}
                value={recipeId}>
          {recipes.map(recipe =>
            <option key={recipe.id} value={recipe.id}>
               {recipe.name} (id:{recipe.id})
             </option>
          )}
        </select>
      </label>
      <p>
        {isEnabled ? <button onClick={() => handleOrder(recipeId)}>Add</button> : ''}
      </p>
      <p>
        {pendingOrders.filter(o => o.pending !== undefined).map(o =>
          <button key={o.orderId}
                  value={o.orderId}
                  onClick={() => cancelOrder(o.orderId)}>
            Cancel Order #{o.orderId}
          </button>)
        }
      </p>
    </section>
  );
}

export default Orders;
