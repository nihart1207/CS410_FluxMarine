import React from 'react';
import { Box } from '@mui/material';

const Home = () => <div>Home Component</div>;
const About = () => <div>About Component</div>;

function ContentArea({ selectedComponent }) {
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      default:
        return <div>Unknown Component</div>;
    }
  };

  return (
    <Box component="main" flexGrow={1} p={3}>
      {renderComponent()}
    </Box>
  );
}

export default ContentArea;
