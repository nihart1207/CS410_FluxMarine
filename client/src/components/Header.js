import * as React from "react";
import Cookies from 'js-cookie';
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add"
import SendIcon from "@mui/icons-material/Send"
import { Dialog, DialogTitle, DialogContent, TextField } from "@mui/material";
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

const lightColor = "rgba(255, 255, 255, 0.7)";

function Header(props) {

  const cookieValue = Cookies.get('token');
  const payload = jwt_decode(cookieValue);
  const navigate = new useNavigate();
  const { onDrawerToggle } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const open_profile = Boolean(anchorEl);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = (event) => {
    Cookies.remove('token');
    navigate("/");
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderExportButton = () => {
    if (props.name === "Orders") {
      return (
        <Button
          sx={{
            borderColor: lightColor,
            bgcolor: "#fff",
            color: "#6A5ACD",
            "&:hover": {
              color: "#fff",
              bgcolor: "#6A5ACD",
            },
            mr: 2, // Add spacing between buttons
          }}
          variant="outlined"
          color="inherit"
          size="large"
          startIcon={<CloudDownloadIcon />}
        >
          Export to Excel
        </Button>
      );
    }
  }

  const renderForm = () => {
    if (props.name === "Orders") {
      return (
        <form>
          <TextField
            required
            autoFocus
            margin="dense"
            id="order_id"
            label="Order ID"
            type="text"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="part_id"
            label="Part ID"
            type="text"
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="supplier_id"
            label="Supplier ID"
            type="text"
            fullWidth
          />
        </form>
      )
    } else if (props.name === "Users") {
      return (
        <form>
        <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
        />
        <TextField 
            required
            margin="dense"
            id="user_email"
            label="Email"
            type="email"
            fullWidth
        />
        <TextField
          margin="dense"
          fullWidth
          id="role"
          select
          label="Role"
          defaultValue="USER"
          helperText="Please select user role"
        >
          <MenuItem value="USER">User</MenuItem>
          <MenuItem value="EDITOR">Editor</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </TextField>
        </form>
      )
    } else if (props.name === "Suppliers") {
      return (
        <form>
        <TextField
            autoFocus
            margin="dense"
            id="supplier_name"
            label="Supplier Name"
            type="text"
            fullWidth
          />
        <TextField
            margin="dense"
            id="supplier_email"
            label="Email"
            type="email"
            fullWidth
          />
        <TextField
            margin="dense"
            id="contact"
            label="Contact"
            type="number"
            fullWidth
          />
        </form>
      )
    } else {
      return (
        <form>
        <TextField
            autoFocus
            margin="dense"
            id="part_name"
            label="Part Name"
            type="text"
            fullWidth
          />

        <TextField
            autoFocus
            margin="dense"
            id="part_description"
            label="Part Description"
            type="text"
            fullWidth
          />

        </form>
      )
    }

  }


  const renderNewItemButton = () => {
    if (props.name !== "Dashboard") {
      return (
        <div>
          <Button
            sx={{
              borderColor: lightColor,
              bgcolor: "#fff",
              color: "#6A5ACD",
              "&:hover": {
                color: "#fff",
                bgcolor: "#6A5ACD",
              },
            }}
            variant="outlined"
            color="inherit"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            New {props.name}
          </Button>
  
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New {props.name}</DialogTitle>
            <DialogContent>
              {renderForm()}
            </DialogContent>
            <Stack margin="dense" direction="row-reverse" spacing={2} alignItems="flex-end" justifyContent="flex-start">
            <Button
            sx={{
              borderColor: lightColor,
              bgcolor: lightColor,
              color: "#4CAF50",
              "&:hover": {
                color: lightColor,
                bgcolor: "#4CAF50",
              },
            }}
            variant="outlined"
            color="inherit"
            size="large"
            startIcon={<SendIcon />}
            onClick={handleOpen}
            > 
            Submit
            </Button>
          </Stack>
          </Dialog>
        </div>
      );
    }
  
    return null;
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const titleCase = (str) => {
    return str.toLowerCase().split(' ').map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  };

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
      <MenuItem onClick={()=> props.setChangeNameDialog(true)} >Change Name</MenuItem>
      <MenuItem onClick={()=> props.setChangePasswordDialog(true)} >Change Password</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Typography variant="h4" sx={{ p: 0.5 }} gutterBottom>Hi ,{titleCase(payload.name)}</Typography>    
            </Grid>

            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item onClick={handleClick} >
              <IconButton color="inherit" sx={{ p: 0.5 }}
                  onClick={handleClick} 
                  aria-controls={open_profile ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open_profile ? 'true' : undefined}   
              >
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
          
          {renderMenu}

        </Toolbar>
      </AppBar>


      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
              {props.name}
              </Typography>
            </Grid>
          
            <Grid item>        
            {renderExportButton()}
            </Grid>
            <Grid item>
            {renderNewItemButton()}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
