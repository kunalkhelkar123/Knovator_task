import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#f9fafb",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "24px",
          color: "#2d3748",
          textAlign: "center",
        }}
      >
        Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <p
          style={{
            fontSize: "1.2rem",
            color: "#718096",
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          Your cart is empty.
        </p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={`http://localhost:5000/backend/utils/${item.image}`}
                  alt={item.name}
                  style={{
                    width: "100%",
                    maxWidth: "180px",
                    borderRadius: "10px",
                    marginBottom: "12px",
                    objectFit: "contain",
                    height: "140px",
                  }}
                />
                <h3
                  style={{
                    fontSize: "1.25rem",
                    color: "#2d3748",
                    marginBottom: "8px",
                    fontWeight: "600",
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#4a5568",
                    marginBottom: "12px",
                    minHeight: "40px",
                  }}
                >
                  {item.description}
                </p>
                <strong
                  style={{
                    fontSize: "1.1rem",
                    color: "#3182ce",
                    marginBottom: "12px",
                  }}
                >
                  ₹{item.price}
                </strong>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: "2px solid #e2e8f0",
              paddingTop: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "1.4rem",
              fontWeight: "700",
              color: "#2d3748",
              marginBottom: "24px",
            }}
          >
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={() => navigate("/order", { state: { total } })}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#3182ce",
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "600",
              borderRadius: "10px",
              cursor: "pointer",
              border: "none",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#2c5282")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#3182ce")
            }
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
