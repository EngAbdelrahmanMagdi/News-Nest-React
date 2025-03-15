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
      setTimeout(() => navigate("/dashboard"));
    },
  });

  return (
    <div>
      <h2>Change Password</h2>
      {error && (
          <div style={{ color: "red" }}>
            {error.split("\n").map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}
      <form onSubmit={handleSubmit}>
        <input type="password" name="old_password" placeholder="Old Password" onChange={handleChange} required />
        <input type="password" name="new_password" placeholder="New Password" onChange={handleChange} required />
        <input type="password" name="confirm_password" placeholder="Confirm New Password" onChange={handleChange} required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Changing Password..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
