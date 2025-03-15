import { useForm } from "../hooks/useForm";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();

  const { handleChange, handleSubmit, error, isLoading } = useForm({
    initialState: { password: "", confirmPassword: "" },
    validate: (data) => {
      if (!token || !email) return "Invalid reset link.";
      if (data.password !== data.confirmPassword) return "Passwords do not match.";
      return null;
    },
    onSubmit: async (data) => {
      await resetPassword(email, token, data.password, data.confirmPassword);
      setTimeout(() => navigate("/login"));
    },
  });

  return (
    <div>
      <h2>Reset Password</h2>
      {error && (
          <div style={{ color: "red" }}>
            {error.split("\n").map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}
      <form onSubmit={handleSubmit}>
        <input type="password" name="password" placeholder="New Password" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Resetting Password..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
