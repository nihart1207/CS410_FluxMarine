import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import ChangeName from '../Forms/ChangeName';
import ChangePassword from '../Forms/ChangePassword';
import SideNav from '../Navigation/SideNavigations';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ProductsContent from '../../components/Content/ProductsContent'
import SuppliersContent from '../../components/Content/SuppliersContent'
import UsersContent from '../../components/Content/UsersContent';
import OrdersContent from '../Content/OrdersContent';
import DashboardContent from '../Content/DashboardContent';
import jwt_decode from 'jwt-decode';
import Footer from '../Footer/footer'


export default function Header() {

  const token = Cookies.get('token');
  const payload = jwt_decode(token);
  const navigate = useNavigate();
  const [content, setContent] = React.useState('Dashboard');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [changeNamePopup, setChangeNamePopup] = React.useState(false);
  const [changePasswordPopup, setChangePasswordPopup] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  if (!payload) {
    Cookies.remove('token');
    navigate("/", {replace: true});
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const handleChangeNameClick = () => {
    handleMenuClose();
    setChangeNamePopup(true);
  }

  const handleChangePasswordClick = () => {
    handleMenuClose();
    setChangePasswordPopup(true);
  }

  const handleLogout = () => {
    handleMenuClose();
    Cookies.remove('token');
    navigate("/", {replace:true});
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleChangeNameClick}>Change Name</MenuItem>
      <MenuItem onClick={handleChangePasswordClick}>Change Password</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, display: 'flex'}}>

      {/* sideNavigation bar */}
      <SideNav setContent={setContent} />

      {/* header */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <AppBar position="static" sx={{zIndex: 1300, elevation:0 , backgroundColor:'white',}}>
          <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color: 'black' } }}
          >
            Welcome, {payload.name}
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="black"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          </Toolbar>
        </AppBar>

        {/* content */}

      {content === 'Dashboard' && <DashboardContent />}
      {content === 'Parts' && <ProductsContent /> }
      {content === 'Suppliers' && <SuppliersContent />}
      {content === 'Users' && <UsersContent />}
      {content === 'Orders' && <OrdersContent />}


      {/* sideNavigation bar */}
      
      <Footer />
      {renderMobileMenu}
      {renderMenu}
      {changeNamePopup && <ChangeName  setChangeNamePopup={setChangeNamePopup} />}
      {changePasswordPopup && <ChangePassword setChangePasswordDialog={setChangePasswordPopup} />}
    </Box>
    </Box>
  );
}