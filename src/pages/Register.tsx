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
    <div>
      <h2>Register</h2>
      {error && (
          <div style={{ color: "red" }}>
            {error.split("\n").map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
        <button type="submit" disabled={isLoading}>{isLoading ? "Registering..." : "Register"}</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Register;
