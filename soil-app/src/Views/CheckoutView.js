import React, { useState } from "react";

const CheckoutView = ({ cartItems }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [state, setState] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [validThru, setValidThru] = useState("");
  const [cvv, setCvv] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errors, setErrors] = useState({});

  const itemImageMap = {
    "Salad Mix": "image1.jpg",
    "Carrots": "image2.png",
    "Lettuce": "image3.jpg",
    "Beets": "image4.jpg",
    "Tomatoes": "image5.jpg",
    "Bell Peppers": "image6.jpg",
  };

  const getImagePath = (itemName) => {
    const imageName = itemImageMap[itemName] || "default_image.jpg";
    return `/carouselImages/${imageName}`;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      let price =
        typeof item.price === "number"
          ? item.price
          : parseFloat(item.price.replace("$", ""));
      return total + price * item.quantity;
    }, 0);
  };

  const shippingCosts = {
    standard: 10,
    express: 15,
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping =
      shippingMethod === "standard"
        ? shippingCosts.standard
        : shippingCosts.express;
    return subtotal + shipping;
  };

  const validateForm = () => {
    let newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!/^[0-9]{16}$/.test(cardNumber))
      newErrors.cardNumber = "Card number must be 16 digits";
    if (!/^\d{2}\/\d{2}$/.test(validThru))
      newErrors.validThru = "Valid thru must be in MM/YY format";
    if (!/^[0-9]{3}$/.test(cvv)) newErrors.cvv = "CVV must be 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Processing order...");
    }
  };

  return (
    <div className="checkout-view">
      <h2>Checkout</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={getImagePath(item.name)}
              alt={item.name}
              style={{
                width: "50px",
                height: "50px",
                marginRight: 10,
                borderRadius: 5,
                marginTop: 15,
              }}
            />
            <span>
              {item.quantity} x {item.name}
            </span>
            <span> ${item.price}</span>
          </div>
        ))}
      </div>
      <div className="cart-totals">
        <div className="cart-text">
          Subtotal: ${calculateSubtotal().toFixed(2)}
        </div>
        <div className="cart-text">
          Shipping: $
          {shippingMethod === "standard"
            ? shippingCosts.standard.toFixed(2)
            : shippingCosts.express.toFixed(2)}
        </div>
        <div className="cart-text">Total: ${calculateTotal().toFixed(2)}</div>
      </div>
      <form onSubmit={handlePlaceOrder}>
        <h3>Your Invoice Details</h3>
        <form onSubmit={(e) => e.preventDefault()}></form>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <h3>Select Your Shipping Method</h3>
        <label>
          <input
            type="radio"
            name="shippingMethod"
            value="standard"
            checked={shippingMethod === "standard"}
            onChange={() => setShippingMethod("standard")}
          />
          Standard: $10
        </label>
        <label>
          <input
            type="radio"
            name="shippingMethod"
            value="express"
            checked={shippingMethod === "express"}
            onChange={() => setShippingMethod("express")}
          />
          Express: $15
        </label>
        <h3>Payment Method</h3>
        <input
          type="text"
          placeholder="Name on Card"
          value={nameOnCard}
          onChange={(e) =>
            setNameOnCard(e.target.value.replace(/[^A-Z\s]/g, ""))
          }
        />
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) =>
            setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
          }
        />
        <input
          type="text"
          placeholder="Valid Thru (MM/YY)"
          value={validThru}
          onChange={(e) =>
            setValidThru(e.target.value.replace(/[^0-9\/]/g, "").slice(0, 5))
          }
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) =>
            setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
          }
        />
        <label>
          <input
            type="checkbox"
            checked={termsAgreed}
            onChange={(e) => setTermsAgreed(e.target.checked)}
          />
          I have read and agree to the terms and conditions
        </label>
        <button type="submit">Place Order</button>
        {Object.keys(errors).map((error) => (
          <p key={error} style={{ color: "red" }}>
            {errors[error]}
          </p>
        ))}
      </form>
    </div>
  );
};

export default CheckoutView;
