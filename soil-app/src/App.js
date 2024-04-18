// Dependencies
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import shoppingcart from "./Components/ShoppingCart.js";
import CartView from "./Components/CartView";
import CheckoutView from "./Views/CheckoutView";

// Styles
import "./App.css";

// Components
import NavBar from "./Components/nav";
import Footer from "./Components/footer";

// Utils∫
import {
  getItem,
  setItem,
  modifyItem,
  removeItem,
  removeItemByID,
} from "./Utils/storageHelper.js";

// Views
import Home from "./Views/home";
import Profile from "./Views/profile";
import SignUp from "./Views/signUp";
import SignIn from "./Views/signIn";
import DietPlan from "./Views/dietPlan.js";

function App() {
  const [view, setView] = useState(getItem("view") ?? "home");
  const [loggedInUser, setLoggedInUser] = useState(
    getItem("loggedInUser") ?? null
  );
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const price = parseFloat(item.price.replace("$", ""));

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((it) => it.name === item.name);
      if (existingItem) {
        return prevItems.map((it) =>
          it.name === item.name
            ? { ...it, quantity: it.quantity + 1, price: price }
            : it
        );
      }
      return [...prevItems, { ...item, quantity: 1, price: price }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const checkout = () => {
    //add here
  };

  const updateLoggedInUser = (user) => {
    if (user === null) {
      removeItem("loggedInUser");
      removeItemByID("users", loggedInUser.id);
      notify("Account deleted successfully", "success");
      setView("home");
    } else {
      setItem("loggedInUser", user);
      modifyItem("users", user);
    }
    setLoggedInUser(user);
  };

  const logIn = (user) => {
    setItem("loggedInUser", user);
    setLoggedInUser(user);
    setView("profile");
  };

  const logOut = () => {
    setLoggedInUser(null);
    setView("home");
  };

  const notify = (message, type) => {
    if (type === "error") {
      return toast.error(message);
    }
    toast.success(message);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (itemId, newQuantity) => {
    newQuantity = parseInt(newQuantity, 10);
    if (newQuantity < 1) return;
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getView = () => {
    setItem("view", view);

    switch (view) {
      case "home":
        return <Home addToCart={addToCart} />;
      case "cart":
        return (
          <CartView
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            updateQuantity={updateQuantity}
            setView={setView}
          />
        );
      case "checkout":
        return <CheckoutView cartItems={cartItems} />;
      case "profile":
        return (
          <Profile
            loggedInUser={loggedInUser}
            updateLoggedInUser={updateLoggedInUser}
            notify={notify}
          />
        );
      case "signUp":
        return <SignUp setView={setView} notify={notify} logIn={logIn} />;
      case "signIn":
        return (
          <SignIn
            setLoggedInUser={setLoggedInUser}
            setView={setView}
            notify={notify}
            logIn={logIn}
          />
        );
      case "diet":
        return (
          <DietPlan
            loggedInUser={loggedInUser}
            notify={notify}
            setView={setView}
          />
        );
      default:
        return (
          <div>
            <p>Page not found</p>
          </div>
        );
    }
  };

  //LocalStorage Images
  const images = [
    "carouselImages/image1.jpg",
    "carouselImages/image2.png",
    "carouselImages/image3.jpg",
    "carouselImages/image4.jpg",
    "carouselImages/image5.jpg",
    "carouselImages/image6.jpg",
  ];

  localStorage.setItem("specialsImages", JSON.stringify(images));

  return (
    <div className="App">
      <NavBar
        setView={setView}
        loggedInUser={loggedInUser}
        logOut={logOut}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        checkout={checkout}
      />

      <div className="view-wrapper">{getView()}</div>
      <Footer />
    </div>
  );
}

export default App;

//Davidtheman123
