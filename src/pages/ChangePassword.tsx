import { useState } from "react";
import { changePassword } from "../services/authService";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [formData, setFormData] = useState({ old_password: "", new_password: "", confirm_password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await changePassword(formData.old_password, formData.new_password, formData.confirm_password);
      setError(null);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error: any) {
        if (error.response?.data?.errors) {
            setError(Object.values(error.response.data.errors).flat().join("\n"));
          } else {
            setError(error.response?.data?.message || "Changing Password failed");
        } 
    }
  };

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
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
