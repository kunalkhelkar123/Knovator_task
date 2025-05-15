import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import banner from "../assets/8852975.jpg";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        console.log("data ", res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <img
        src={banner}
        alt="Banner"
        style={{  width: "100%", height: "500px", objectFit: "cover" }}
      />
      <h2 style={{ margin: "20px", textAlign:"center" , fontSize:"40px"}}>Products</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
