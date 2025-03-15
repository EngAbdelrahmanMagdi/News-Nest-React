import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { User } from "../types/types";
import { UserIcon } from "./UserIcon";
import { Container, Row, Col, Dropdown } from "react-bootstrap";

const UserInfo = ({ user }: { user: User }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Container>
      <Row className="justify-content-end mb-3">
        <Col xs="auto">
          <Dropdown show={menuOpen} onToggle={setMenuOpen}>
            <Dropdown.Toggle as="div" onClick={() => setMenuOpen(!menuOpen)}>
              <UserIcon />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.ItemText>
                <strong>{user?.name}</strong> <br />
                {user?.email}
              </Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => navigate("/change-password")}>
                Change Password
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/preferences")}>
                Preferences
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="text-danger">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
};

export default UserInfo;
