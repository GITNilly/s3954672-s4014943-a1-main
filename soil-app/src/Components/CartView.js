// CartView.js
import React from "react";

const CartView = ({
  cartItems,
  removeFromCart,
  clearCart,
  updateQuantity,
  setView,
}) => {
  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const handleCheckout = () => {
    setView("checkout");
  };

  const handleClearCart = () => {
    clearCart();
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Function to handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    newQuantity = parseInt(newQuantity, 10);
    updateQuantity(id, newQuantity);
  };

  return (
    <div className="cart-view">
      <h2>Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Availability</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Clear Item</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>In stock</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  min="1"
                  className="quantity-input"
                />
              </td>
              <td>
                <button onClick={() => removeFromCart(item.id)}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <strong className="cart-TotalPrice">Total: ${calculateTotal()}</strong>
      </div>
      <button className="cart-ClearCart" onClick={clearCart}>
        Clear Cart
      </button>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CartView;
