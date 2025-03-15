import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { forgotPassword } from "../services/authService";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");

  const { handleChange, handleSubmit, error, isLoading } = useForm({
    initialState: { email: "" },
    validate: (data) => (!data.email.includes("@") ? "Invalid email address." : null),
    onSubmit: async (data) => {
      await forgotPassword(data.email);
      setMessage("Check your email for the reset link.");
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>
      <div className="auth-card">
        <h2>Forgot Password</h2>
        {error && !message && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
          </button>
        </form>

        <p className="auth-links">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
