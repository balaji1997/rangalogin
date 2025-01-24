import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.scss";
import API from "../utils/api.ts"; // Import Axios instance

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await API.post("/users/login", { email, password });
      alert(response.data); // Login successful message
      // Redirect or handle success logic
    } catch (error: any) {
      setErrorMessage(
        error.response?.data || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome to Connection Ranga</h1>
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
        <div>
          <Link to="/signup">Sign Up</Link>
        </div>
        <div className="forgot-password">
          <Link to="/forget-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
