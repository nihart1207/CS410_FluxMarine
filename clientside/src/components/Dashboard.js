import React from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import Navigator from "./Navigator";
import Paperbase from "./Paperbase";

const Dashboard = () => {
  return (
    <div>
      <Navigator />
      <Paperbase />
    </div>
  );
};

export default Dashboard;
