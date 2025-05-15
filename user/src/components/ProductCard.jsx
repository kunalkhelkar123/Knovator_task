import React from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  if (!product) return null;

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    margin: "1rem",
    maxWidth: "220px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
  };

  const imgStyle = {
    width: "100%",
    maxWidth: "200px",
    borderRadius: "6px",
    objectFit: "cover",
    marginBottom: "1rem",
  };

  const nameStyle = {
    fontSize: "1.25rem",
    margin: "0.5rem 0",
    color: "#333",
  };

  const descStyle = {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "0.5rem",
    minHeight: "48px",
    textAlign: "center",
  };

  const priceStyle = {
    fontWeight: "bold",
    fontSize: "1.1rem",
    marginBottom: "1rem",
    color: "#2b6cb0",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "0.5rem",
    width: "100%",
    justifyContent: "center",
  };

  const buttonStyle = {
    flex: "1",
    padding: "0.5rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
    transition: "background-color 0.3s ease",
  };

  const addToCartBtnStyle = {
    ...buttonStyle,
    backgroundColor: "#2b6cb0",
    color: "white",
  };



  return (
    <div style={cardStyle}>
      <img
        src={`http://localhost:5000/backend/utils/${product.image}`}
        alt={product.name}
      />
      <h3 style={nameStyle}>{product.name}</h3>
      <p style={descStyle}>{product.description}</p>
      <strong style={priceStyle}>₹{product.price}</strong>
      <div style={buttonContainerStyle}>
        <button
          style={addToCartBtnStyle}
          onClick={() => {addToCart(product)
            alert("Product added in cart")
          }}
          type="button"
        >
          Add to Cart
        </button>
       
      </div>
    </div>
  );
}
