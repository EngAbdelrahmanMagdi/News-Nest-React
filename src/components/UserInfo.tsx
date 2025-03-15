import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ user }: { user: any }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout} className="btn btn-danger mb-4">Logout</button>
    </div>
  );
};

export default UserInfo;
