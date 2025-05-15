const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const products = require("./data/products");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const usersFile = path.join(__dirname, "data", "users.json");
app.use("/backend/utils", express.static(path.join(__dirname, "utils")));

if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, "[]");
}
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/checkuser", (req, res) => {
  const order = req.body;

  const requiredFields = [
    "name",
    "address",
    "city",
    "state",
    "country",
    "pincode",
    "mobile",
    "paymentMethod",
  ];

  for (const field of requiredFields) {
    if (!order[field]) {
      return res.status(400).json({ error: `${field} is required` });
    }
  }

  if (order.paymentMethod === "upi" && !order.upiId) {
    return res.status(400).json({ error: "UPI ID is required" });
  }

  if (order.paymentMethod === "card" && !order.cardNumber) {
    return res.status(400).json({ error: "Card number is required" });
  }

  // Read existing orders
  let orders = [];
  try {
    const fileContent = fs.readFileSync(usersFile, "utf-8");
    orders = fileContent ? JSON.parse(fileContent) : [];
  } catch (err) {
    console.error("Failed to parse users.json:", err);
    orders = [];
  }
  orders.push({ ...order, createdAt: new Date().toISOString() });
  fs.writeFileSync(usersFile, JSON.stringify(orders, null, 2));
  console.log("Order received:", { firstName, lastName, address, items });
  res.status(201).json({ message: "Order stored successfully" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
