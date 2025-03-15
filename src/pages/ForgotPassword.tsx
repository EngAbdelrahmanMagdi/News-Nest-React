import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { forgotPassword } from "../services/authService";

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
    <div>
      <h2>Forgot Password</h2>
      {error && !message ? (
          <div style={{ color: "red" }}>
            {error.split("\n").map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        ) : message}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
