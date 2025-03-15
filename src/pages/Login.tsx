import { useForm } from "../hooks/useForm";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const { handleChange, handleSubmit, error, isLoading } = useForm({
    initialState: { email: "", password: "" },
    onSubmit: async ({ email, password }) => {
      await login(email, password);
      setTimeout(() => navigate("/dashboard"));
    },
  });

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
      </form>
      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
      <p>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
