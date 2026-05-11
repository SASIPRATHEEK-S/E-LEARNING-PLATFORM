import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Navigation bar - shows different links based on login status and user role
export default function Navbar(){
  // Get authentication state from context
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary shadow"
      style={{ height: "56px" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-mortarboard me-2"></i>E-Learning Platform
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Signup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">
                    Welcome, {user.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light ms-2" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}


// This navbar used in singup.jsx,login.jsx,admindashboard,studentdashboard,instructordashboard
