import React from "react";
import Specials from "../Components/specials";

const Home = ({ addToCart }) => {
  return (
    <div>
      <h1>Welcome to SOIL MAIN - Organic Grocer</h1>
      <h1 className="home-specialsTitle">Our Specials For The Week!</h1>
      <Specials addToCart={addToCart} />
      <h1 className="home-growYourGarden">Growing Your Own Garden!</h1>
      <div className="home-growYourGarden">
        <h2>Choose a Location</h2>
        <p>Find a spot that gets at least 6 hours of sunlight daily.</p>
        <p>
          Ensure the area has good drainage and isn't prone to standing water.
        </p>

        <h2>Plan Your Garden</h2>
        <p>
          Decide what vegetables you’d like to grow based on your climate and
          space.
        </p>
        <p>
          Sketch a layout, considering plant spacing and companion planting
          benefits.
        </p>

        <h2>Prepare the Soil</h2>
        <p>Clear the area of weeds and debris.</p>
        <p>
          Test the soil pH and nutrient levels (kits available at garden
          stores).
        </p>
        <p>
          Amend the soil with compost, manure, or other organic materials to
          improve fertility.
        </p>

        <h2>Select Your Plants</h2>
        <p>Choose seedlings or seeds based on the season and your climate.</p>
        <p>Opt for local, disease-resistant varieties when possible.</p>

        <h2>Planting</h2>
        <p>Follow the spacing guidelines on seed packets or plant tags.</p>
        <p>
          Plant seeds or seedlings according to the depth and spacing
          recommended.
        </p>

        <h2>Watering</h2>
        <p>
          Water plants regularly, focusing on the roots rather than the foliage.
        </p>
        <p>
          Water in the morning to allow leaves to dry during the day, reducing
          disease risk.
        </p>

        <h2>Mulching</h2>
        <p>
          Apply mulch around your plants to retain moisture, suppress weeds, and
          regulate soil temperature.
        </p>

        <h2>Maintenance</h2>
        <p>
          Regularly check for pests and diseases. Use organic methods like
          hand-picking pests or using natural sprays when possible.
        </p>
        <p>
          Prune and thin plants as needed to ensure adequate air circulation.
        </p>

        <h2>Fertilizing</h2>
        <p>
          Feed plants with a balanced organic fertilizer to encourage growth.
          Follow the directions for application rates and timing.
        </p>

        <h2>Harvesting</h2>
        <p>
          Harvest vegetables at their peak for the best flavor and to encourage
          further production.
        </p>
        <p>Regularly picking vegetables can prolong the harvest period.</p>
      </div>
    </div>
  );
};

export default Home;
