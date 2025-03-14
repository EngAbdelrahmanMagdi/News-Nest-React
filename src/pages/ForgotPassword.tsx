import { useState } from "react";
import { forgotPassword } from "../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMessage("Password reset link sent to your email.");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setError(Object.values(error.response.data.errors).flat().join("\n"));
      } else {
        setError(error.response?.data?.message || "Failed to send reset link");
      } 
    }
  };

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
        <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
