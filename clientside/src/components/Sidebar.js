import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { useState } from "react";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009688",
    },
    secondary: {
      main: "#6c757d",
    },
  },
});

const drawerWidth = 240;

const SidebarWrapper = styled(Drawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  ...(open && {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  }),
}));

const SidebarToolbar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

function Sidebar() {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <SidebarWrapper
      open={open}
      variant="permanent"
      PaperProps={{
        sx: {
          width: drawerWidth,
          ...(open && {
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }),
          ...(!open && {
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            overflowX: "hidden",
            width: (theme) => theme.spacing(7) + 1,
            [theme.breakpoints.up("sm")]: {
              width: (theme) => theme.spacing(9) + 1,
            },
          }),
        },
      }}
    >
      <SidebarToolbar>
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          {open ? <ChevronLeftIcon /> : <DashboardIcon />}
        </IconButton>
      </SidebarToolbar>
      <List>
        <ListItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
    </SidebarWrapper>
  );
}

export default Sidebar;
