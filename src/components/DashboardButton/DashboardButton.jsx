import React from "react";
import "./DashboardButton.scss";
import { Link } from "react-router-dom";

const DashboardButton = () => {
  return (
    <Link to="/">
      <div>
        <button className="dashboard__button">Dashboard</button>
      </div>
    </Link>
  );
};

export default DashboardButton;
