import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/authService";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !email) {
      setError("Invalid reset link.");
      return;
    }  
    try {    
      await resetPassword(email, token, formData.password, formData.confirmPassword);
      setMessage("Password reset successful. You can now log in.");
      setTimeout(() => {
        navigate("/login");
      },2000)
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setError(Object.values(error.response.data.errors).flat().join("\n"));
      } else {
        setError(error.response?.data?.message || "Resetting password failed");
      }   
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && !message ? (
          <div style={{ color: "red" }}>
            {error.split("\n").map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        ) : message}
      <form onSubmit={handleSubmit}>
        <input type="password" name="password" placeholder="New Password" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
