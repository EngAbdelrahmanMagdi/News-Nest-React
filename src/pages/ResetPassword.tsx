import { useForm } from "../hooks/useForm";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
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
    <div className="auth-container">
      <div className="auth-overlay"></div>
      <div className="auth-card">
        <h2>Reset Password</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="New Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>

        <p className="auth-links">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
