import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add"
import Popover from "@mui/material/Popover";


const lightColor = "rgba(255, 255, 255, 0.7)";

function Header(props) {
  const { onDrawerToggle } = props;

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
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
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }} >
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
              

            </Grid>
          </Grid>
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
              >
                New {props.name}
              </Button>
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
