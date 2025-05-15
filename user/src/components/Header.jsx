import { Link } from "react-router-dom";
import React from "react";
const headerStyle = {
  backgroundColor: "#2d3748", 
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  padding: "12px 16px",
  position: "sticky", 
  top: 0, 
  zIndex: 1000,
};

const containerStyle = {
  maxWidth: "1120px",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const titleStyle = {
  fontSize: "1.5rem",
  color: "white",
  fontWeight: "bold",
  userSelect: "none",
};

const navStyle = {
  display: "flex",
  gap: "24px",
};

const linkStyle = {
  color: "white",
  padding: "8px 12px",
  borderRadius: "6px",
  fontSize: "1.125rem",
  fontWeight: "500",
  textDecoration: "none",
  transition: "background-color 0.3s ease",
};

const linkHoverStyle = {
  backgroundColor: "#4a5568",
};

export default function Header() {

  const [hovered, setHovered] = React.useState(null);

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>🛍️ ShopEasy</h1>
        <nav style={navStyle}>
          {["Home", "Cart"].map((text) => (
            <Link
              key={text}
              to={text === "Home" ? "/" : "/cart"}
              style={{
                ...linkStyle,
                ...(hovered === text ? linkHoverStyle : {}),
              }}
              onMouseEnter={() => setHovered(text)}
              onMouseLeave={() => setHovered(null)}
            >
              {text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
