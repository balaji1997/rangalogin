// pages/LoginPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.scss";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Placeholder for your actual login logic (API call or validation)
    if (email === "test@example.com" && password === "password") {
      console.log("Login successful!");
      alert("Login successful!"); // Or redirect to a home page
    } else {
      setErrorMessage("Incorrect username or password");
    }
  };

  return (
    <div className="login-page">
      <div
        style={{
          fontFamily: "Arial",
          fontWeight: "bold",
          color: "red",
          textAlign: "center",
        }}
      >
        <h1>Welcome to Connection Ranga</h1>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <div className="md:py-4">
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
      <div className="forgot-password">
        <Link to="/forget-password">Forgot Password?</Link>{" "}
        {/* Use Link here as well */}
      </div>
    </div>
  );
};

export default LoginPage;
