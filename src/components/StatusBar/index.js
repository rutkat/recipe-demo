import React from 'react';
import './status_bar.scss';

const StatusBar = ({allOrders, pendingOrders}) => {

  const groupBy = (arr, key) => {
    return arr.reduce((rv, item) => {
      (rv[item[key]] = rv[item[key]] || []).push(item);
      return rv;
    }, {});
  };

  const filledOrders = groupBy(allOrders, 'filled');
  const pendingCount = (pendingOrders !== undefined && pendingOrders.length) ? pendingOrders.length : 0;
  return (
    <header className="status_bar">
      <h2 className='status_bar-heading'>Status:</h2>

      <p className="status_bar-item">
        Canceled
        <span id="item_canceled"> [{filledOrders['false'].length}]</span>
      </p>
      <p className="status_bar-item">
        Pending
        <span id="item_Pending"> [{pendingCount}]</span>
      </p>
      <p className="status_bar-item">
        Filled
        <span id="item_filled"> [{filledOrders['true'].length}]</span>
      </p>
    </header>
  );
}

export default StatusBar;
