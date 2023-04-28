import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Navigator from "./Navigator";
import Content from "./Content";
import Header from "./Header";
import SuppliersContent from "./SuppliersContent";
import UsersContent from "./UsersContent";
import ProductsContent from "./ProductsContent";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from "@mui/material";
import TextField from "@mui/material/TextField";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.fluxmarine.com/">
        FLUX MARINE
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

let theme = createTheme({
  palette: {
    primary: {
      light: "#000",
      main: "#000",
      dark: "#000",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 30,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 60,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "black",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: "0 16px",
          minWidth: 0,
          padding: 0,

          [theme.breakpoints.up("md")]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255,255,255,0.15)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#07ebd4",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 25,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 256;

export default function Paperbase() {
  const [content, setContent] = React.useState("Dashboard");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [popup, setPopup] = React.useState(false);
  const [name, setName] = React.useState("");
  const [isEditOn, setIsEditOn] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClose = () => {
    setPopup(false);
  }

  const handleOpen = () => {
    setPopup(true);
  }

  const renderProfile = () => {
    return (
      <Dialog
        open={popup}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }} >
          {"Profile"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          
          {/* current not in editing mode*/}
          {!isEditOn && (<Typography variant="h6" gutterBottom>
          {"Name"}</Typography>)}
          {/* currently in editing mode*/}
          {isEditOn && <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handleNameChange}/>}
          <Typography variant="h6" gutterBottom>
          {"Role"}
          </Typography>
          <Typography variant="h6" gutterBottom>
          {"User since:"}
          </Typography>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const handleNameChange=(event)=>{
    setName(event.target.value);
  }

  const handleEdit=()=> {
      if (name) {

      } else {

      }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}

          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
            changeContent = {setContent}
          />
        </Box>


        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header onDrawerToggle={handleDrawerToggle} name={content} openProfilePopup={handleOpen}/> 
            
          {/*pop up buton*/}
          {popup && renderProfile()}

          <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}> 
          {content === "Users" ? <UsersContent/> :
          content === "Parts" ? <ProductsContent/> :
          content === "Suppliers" ? <SuppliersContent/> :
          <Content/>}
          </Box>


          <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
