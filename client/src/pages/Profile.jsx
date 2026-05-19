import { useState } from "react";

import Navbar from "../components/Navbar";

import "../styles/profile.css";

import { useNavigate } from "react-router-dom";

function Profile() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [name, setName] = useState(userInfo.name);

  const [email, setEmail] = useState(userInfo.email);

  const updateProfile = () => {
    const updatedUser = {
      ...userInfo,
      name,
      email,
    };

    localStorage.setItem("userInfo", JSON.stringify(updatedUser));

    alert("Profile Updated");
  };

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back
      </button>
      <div className="profile-container">
        <div className="profile-card">
          <div className="big-avatar">{name.charAt(0)}</div>

          <h2>Edit Profile</h2>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={updateProfile}>Save Changes</button>
        </div>
      </div>
    </>
  );
}

export default Profile;
