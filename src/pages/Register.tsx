import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import { useForm } from "../hooks/useForm";

const Register = () => {
  const navigate = useNavigate();

  const { formData, handleChange, handleSubmit, error, isLoading } = useForm({
    initialState: { name: "", email: "", password: "", confirmPassword: "" },
    onSubmit: async ({ name, email, password }) => {
      await register(name, email, password);
      navigate("/dashboard");
    },
    validate: ({ password, confirmPassword }) =>
      password !== confirmPassword ? "Passwords do not match" : null,
  });

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>
      <div className="auth-card">
        <h2>Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" name="name" className="form-control" placeholder="Name" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-links">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
