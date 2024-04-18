import React from "react";
import Specials from "../Components/specials";

const Home = ({ addToCart }) => {
  return (
    <div>
      <h1>Welcome to SOIL MAIN - Organic Grocer</h1>
      <h1 className="home-specialsTitle">Our Specials For The Week!</h1>
      <Specials addToCart={addToCart} />
      <h1 className="home-growYourGarden">Growing Your Own Garden!</h1>
    </div>
  );
};

export default Home;
