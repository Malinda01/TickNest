import { Link, useNavigate } from "react-router-dom";

import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">TickNest</h2>

      <div className="nav-right">
        <Link to="/profile" className="profile-logo">
          {userInfo?.name?.charAt(0)}
        </Link>

        <button className="logout-btn" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
