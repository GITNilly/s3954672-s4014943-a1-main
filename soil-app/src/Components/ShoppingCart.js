import React from "react";

const ShoppingCart = ({ items, checkout, setView }) => {
  // Include setView here
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleViewCart = () => {
    setView("cart");
  };

  return (
    <div className="shopping-cart-summary">
      <span>
        {totalItems} ITEMS | ${totalPrice.toFixed(2)}
      </span>
      <button onClick={handleViewCart} className="shopping-cart-button">
        View Cart / Checkout
      </button>
    </div>
  );
};

export default ShoppingCart;
