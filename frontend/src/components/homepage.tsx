import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Wellcome to Our Safe Chat platform </h1>
      <h2>Chat with your friends</h2>
      <h3>Securely</h3>
      <Link to="/login">
        <button
          style={{
            marginTop: "20px",
            textDecoration: "none",
            padding: 20,
            backgroundColor: "green",
            cursor: "pointer",
            border: "none",
            borderRadius: "5px",
            fontSize: "20px",
            color: "white",
          }}
        >
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Homepage;
