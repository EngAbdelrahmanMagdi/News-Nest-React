import { useForm } from "../hooks/useForm";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const { handleChange, handleSubmit, error, isLoading } = useForm({
    initialState: { email: "", password: "" },
    onSubmit: async ({ email, password }) => {
      await login(email, password);
      navigate("/dashboard");
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>
      <div className="auth-card">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <p className="auth-links">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
