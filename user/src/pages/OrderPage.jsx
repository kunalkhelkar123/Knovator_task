import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function OrderPage() {
  const location = useLocation();
  const total = location.state?.total || 0;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    mobile: "",
    paymentMethod: "upi", 
    upiId: "",
    cardNumber: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.state.trim()) errs.state = "State is required";
    if (!form.country.trim()) errs.country = "Country is required";

    if (!form.pincode.trim()) {
      errs.pincode = "Pincode is required";
    } else if (!/^\d{5,6}$/.test(form.pincode)) {
      errs.pincode = "Invalid pincode";
    }

    if (!form.mobile.trim()) {
      errs.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(form.mobile)) {
      errs.mobile = "Invalid mobile number";
    }

    if (form.paymentMethod === "upi") {
      if (!form.upiId.trim()) {
        errs.upiId = "UPI ID is required";
      } else if (!/^\w+@\w+$/.test(form.upiId)) {
        errs.upiId = "Invalid UPI ID";
      }
    } else if (form.paymentMethod === "card") {
      if (!form.cardNumber.trim()) {
        errs.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(form.cardNumber)) {
        errs.cardNumber = "Invalid card number";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setForm({
      ...form,
      paymentMethod: e.target.value,
      upiId: "",
      cardNumber: "",
    });
    setErrors((prev) => ({
      ...prev,
      upiId: undefined,
      cardNumber: undefined,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("http://localhost:5000/api/checkuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form, total }),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Order placed successfully!");

          navigate("/")
        } else {
          alert("Error: " + result.error);
        }
      } catch (error) {
        alert("Failed to place order: " + error.message);
      }

    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    marginTop: "4px",
    marginBottom: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  };

  const errorStyle = {
    color: "red",
    fontSize: "0.85rem",
    marginTop: "-6px",
    marginBottom: "8px",
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#fefefe",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
        Place Your Order
      </h2>

      <div
        style={{
          fontSize: "1.2rem",
          fontWeight: "600",
          marginBottom: "24px",
          textAlign: "center",
          color: "#2d3748",
        }}
      >
        Total Amount: ₹{total}
      </div>

      <form onSubmit={handleSubmit} noValidate>

        <label>
          Name<span style={{ color: "red" }}> *</span>:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}
        </label>
        <label>
          Address<span style={{ color: "red" }}> *</span>:
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            style={{ ...inputStyle, height: "60px", resize: "vertical" }}
            required
          />
          {errors.address && <div style={errorStyle}>{errors.address}</div>}
        </label>

        <label>
          City<span style={{ color: "red" }}> *</span>:
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          {errors.city && <div style={errorStyle}>{errors.city}</div>}
        </label>

        <label>
          State<span style={{ color: "red" }}> *</span>:
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          {errors.state && <div style={errorStyle}>{errors.state}</div>}
        </label>

        <label>
          Country<span style={{ color: "red" }}> *</span>:
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          {errors.country && <div style={errorStyle}>{errors.country}</div>}
        </label>

        <label>
          Pincode<span style={{ color: "red" }}> *</span>:
          <input
            type="text"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            style={inputStyle}
            required
            maxLength={6}
          />
          {errors.pincode && <div style={errorStyle}>{errors.pincode}</div>}
        </label>

        <label>
          Mobile Number<span style={{ color: "red" }}> *</span>:
          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            style={inputStyle}
            required
            maxLength={10}
            pattern="\d{10}"
            placeholder="10 digit number"
          />
          {errors.mobile && <div style={errorStyle}>{errors.mobile}</div>}
        </label>

        <fieldset style={{ marginBottom: "16px" }}>
          <legend>
            Payment Method<span style={{ color: "red" }}> *</span>:
          </legend>
          <label style={{ marginRight: "12px" }}>
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={form.paymentMethod === "upi"}
              onChange={handlePaymentChange}
            />{" "}
            UPI
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={form.paymentMethod === "card"}
              onChange={handlePaymentChange}
            />{" "}
            Card
          </label>
        </fieldset>

        {form.paymentMethod === "upi" && (
          <label>
            UPI ID<span style={{ color: "red" }}> *</span>:
            <input
              type="text"
              name="upiId"
              value={form.upiId}
              onChange={handleChange}
              style={inputStyle}
              required={form.paymentMethod === "upi"}
              placeholder="example@bank"
            />
            {errors.upiId && <div style={errorStyle}>{errors.upiId}</div>}
          </label>
        )}

        {form.paymentMethod === "card" && (
          <label>
            Card Number<span style={{ color: "red" }}> *</span>:
            <input
              type="text"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              style={inputStyle}
              required={form.paymentMethod === "card"}
              maxLength={16}
              placeholder="16 digit card number"
            />
            {errors.cardNumber && (
              <div style={errorStyle}>{errors.cardNumber}</div>
            )}
          </label>
        )}

        <button
          type="submit"
          style={{
            marginTop: "24px",
            padding: "12px",
            width: "100%",
            fontSize: "1.1rem",
            backgroundColor: "#3182ce",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
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
      </form>
    </div>
  );
}
