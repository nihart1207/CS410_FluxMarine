import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Sidebar from './Sidebar';



const Dashboard = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Dashboard;
