import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  return (
    <nav
      style={{
        height: "84px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>Teknolojik Yemekler</h1>
      <div>
        <ul style={{ listStyle: "none", display: "flex", gap: "2rem" }}>
          <li>
            <button onClick={() => navigate("/")}>Home</button>
          </li>
          <li>
            <button onClick={() => navigate("/help")}>Help</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
