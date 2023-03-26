import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant={isMobile ? 'h6' : 'h4'} component="div">
          My Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
