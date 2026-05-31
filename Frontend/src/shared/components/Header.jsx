import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <header className="header">
      <nav className="nav-container">
        <Link to="/" className="logo">CDNProject</Link>
        <div className="nav-links">
          {user && (
            <>
              <Link to="/files" className={isActive("/files")}>Files</Link>
              <Link to="/profile" className={isActive("/profile")}>Profile</Link>
              <Link to="/contact" className={isActive("/contact")}>Contact</Link>
              <Link to="/reports" className={isActive("/reports")}>Reports</Link>
              {user.role === "admin" && (
                <Link to="/admin" className={isActive("/admin")}>Admin</Link>
              )}
            </>
          )}
          {user ? (
            <button onClick={handleLogout} className="btn-outline">Logout</button>
          ) : (
            <>
              <Link to="/login" className={isActive("/login")}>Login</Link>
              <Link to="/register" className={isActive("/register")}>Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
