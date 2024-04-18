import React, { useState, useEffect } from "react";

const Specials = ({ addToCart }) => {
  const [imagePaths, setImagePaths] = useState([]);

  useEffect(() => {
    // Fetch image paths from local storage
    const storedImagePaths = JSON.parse(localStorage.getItem("specialsImages"));
    if (storedImagePaths) {
      setImagePaths(storedImagePaths);
    }
  }, []);

  const itemDetails = [
    { id: 1, name: "Salad Mix", price: "$5.99" },
    { id: 2, name: "Carrots", price: "$3.49" },
    { id: 3, name: "Lettuce", price: "$1.99" },
    { id: 4, name: "Beets", price: "$4.99" },
    { id: 5, name: "Tomatoes", price: "$2.99" },
    { id: 6, name: "Bell Peppers", price: "$5.49" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "30px",
        paddingTop: "30px",
      }}
    >
      {imagePaths.map((imagePath, index) => (
        <div
          key={index}
          className="specials-item"
          style={{ width: "100%", paddingBottom: "100%", position: "relative" }}
        >
          <img
            className="specials-rounded"
            src={process.env.PUBLIC_URL + "/" + imagePath}
            alt={itemDetails[index].name}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <div className="specials-overlay">
            <div>{itemDetails[index].name}</div>
            <div>{itemDetails[index].price}</div>
            <button
              className="specials-add-to-cart"
              onClick={() => addToCart(itemDetails[index])}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Specials;
