// LeftDrawer.js
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import { Box, Typography } from '@mui/material';
import logo from "../../assets/logo.png";

const SideNav = ({ setContent , role} ) => {
  const handleItemClick = (content) => {
    setContent(content);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        width: '240px',
        '& .MuiDrawer-paper': {
          width: '240px',
          backgroundColor: 'black',
          color: 'white',
        },
      }}
    >
      <List>
      <Box sx={{ height: '7px' }} />
        <ListItem>
          {/*
        <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, p:"5px"}}
          >
            FLUXMARINE
          </Typography>
          */}
          <img src={logo} alt="Logo Image" style={{ maxWidth: '100%' }} />
        </ListItem>
       <Box sx={{ height: '67px' }} />

        <ListItem button onClick={() => handleItemClick('Dashboard')}>
          <ListItemIcon>
            <LineAxisIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>


        <ListItem button onClick={() => handleItemClick('Orders')}>
          <ListItemIcon>
            <ShoppingCartIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>


        <ListItem button onClick={() => handleItemClick('Parts')}>
          <ListItemIcon>
            <CategoryIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Parts" />
        </ListItem>

        <ListItem button onClick={() => handleItemClick('Suppliers')}>
          <ListItemIcon>
            <InventoryIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Suppliers" />
        </ListItem>

        <ListItem button onClick={() => handleItemClick('Users')}>
          <ListItemIcon>
            <PeopleAltIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>

      </List>
    </Drawer>
  );
};

export default SideNav;
