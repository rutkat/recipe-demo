import React, { useState, useEffect } from 'react';
import StatusBar from './components/StatusBar';
import IngredientList from './components/IngredientList';
import RecipeList from './components/RecipeList';
import Orders from './components/Orders';
import './App.scss';
import ITEMS from './data/items.js';
import RECIPES from './data/recipes.js';
import ORDERS from './data/orders.js';

function App() {

  const [allItems, setItems] = useState(ITEMS);
  useEffect(() => {
    console.log('useEffect allItems:', allItems);
  }, [allItems]);

  const [allOrders, setOrders] = useState(ORDERS);
  useEffect(() => {
    console.log('useEffect allOrders:', allOrders);
  }, [allOrders]);

  const [pendingOrders, setPendingOrders] = useState();
  useEffect(() => {
    console.log('useEffect pendingOrders:', pendingOrders);

    if (isProcessing === true) {
      const timer = setTimeout(() => {
        // move first order from queue to allOrders
        setOrders(allOrders => [...allOrders, pendingOrders[0]]);
        // remove from pending orders
        pendingOrders.splice(0, 1);
        console.log(' splice: ', pendingOrders);
        setPendingOrders(pendingOrders);
        setIsProcessing(false);
      }, 1000);
      return () => {
        clearTimeout(timer);
      }
    }

  }, [pendingOrders]);

  const [isEnabled, setIsEnabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  var missingItems = [];

  const recipeSelect = (recipeId) => {
    console.log('*** recipeSelect: ', recipeId);
    // check if recipes has the id
    if (!RECIPES.hasOwnProperty(recipeId)) {
      return;
    }
    // get itemIds needed for recipe
    missingItems = [];

    // find needed item ids
    for (const r of RECIPES[recipeId]['items']) {
      console.log('Need itemId: ', r['itemId']);
      let currItemId = r['itemId']-1;
      console.info('-inventory is:'+ allItems[currItemId]['qty']+', required:'+r.qty);

      // if needed item count is greater than available items
      if (r.qty > allItems[currItemId]['qty']) {
        missingItems.push(allItems[currItemId]['name']);
      }
    }
    setIsEnabled(missingItems.length < 1 ? true : false);

  };

  const handleOrder = (recipeId) => {
    if (!isEnabled) {
      return;
    }
    // loop through recipe to remove items from inventory
    for (const item of RECIPES[recipeId]['items']) {
      // console.log(' -removing qty:'+item['qty'], item);
      allItems[item['itemId']-1].qty -= item['qty'];
      // console.log(' -removed: ', allItems[item['itemId']-1]);
    }
    setItems(allItems);
    postOrder(recipeId);
    recipeSelect(recipeId);
  }

  const postOrder = (recipeId) => {
    setIsProcessing(true);
    // increment order id
    const newId = allOrders[allOrders.length-1]['orderId'] + 1;
    const newOrder = {
      "orderId": newId,
      "recipe": parseInt(recipeId, 10),
      "filled": true
    };

    if (pendingOrders !== undefined) {
      setPendingOrders([...pendingOrders, newOrder]);
    }
    else {
      setPendingOrders([newOrder]);
    }

  }

  const cancelOrder = (orderId) => {
    console.log('cancelOrder: ', orderId);
  }

  return (
    <div className="app">
      <StatusBar allOrders={allOrders}
                 pendingOrders={pendingOrders}>
      </StatusBar>
      <h1>Recipe Manager</h1>
      <section id="main">
        <IngredientList ingredients={allItems}></IngredientList>
        <RecipeList allOrders={allOrders}></RecipeList>
      </section>
      <Orders
        isProcessing={isProcessing}
        postOrder={postOrder}
        cancelOrder={cancelOrder}
        allOrders={allOrders}
        isEnabled={isEnabled}
        parentCallback={recipeSelect}
        items={allItems}
        handleOrder={handleOrder}>
      </Orders>
    </div>
  );
}

export default App;
