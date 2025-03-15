import { useForm } from "../hooks/useForm";
import { changePassword } from "../services/authService";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  const { handleChange, handleSubmit, error, isLoading } = useForm({
    initialState: { old_password: "", new_password: "", confirm_password: "" },
    validate: (data) => {
      if (data.new_password !== data.confirm_password) return "Passwords do not match.";
      return null;
    },
    onSubmit: async (data) => {
      await changePassword(data.old_password, data.new_password, data.confirm_password);
      navigate("/dashboard");
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>
      <div className="auth-card">
        <h2>Change Password</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="password" name="old_password" className="form-control" placeholder="Old Password" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="password" name="new_password" className="form-control" placeholder="New Password" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="password" name="confirm_password" className="form-control" placeholder="Confirm New Password" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
