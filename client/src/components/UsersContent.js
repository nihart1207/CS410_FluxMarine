import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import UsersTable from "./UsersTable";

export default function UsersContent() {
  const [all_users, setAllUsers] = React.useState([]);

  const [users, setUsers] = React.useState([]);

React.useEffect(() => {
  fetch('/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setAllUsers(data);
      setUsers(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}, []);
    
  
    const [searchName , setSearchName] = React.useState('');
  
  

    const handleSearchNameChange = (event) => {
      const {value} = event.target;
      setSearchName(value)
      if (value) {
        const filteredProducts = Object.values(all_users).filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
        );
        setUsers(filteredProducts);
      } else {
        setUsers(all_users);
      }
    };

  
  // for users table 
  return (
    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: "block" }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by user Name"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
                value={searchName}
                onChange={handleSearchNameChange}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        <UsersTable users={users} />
      </Typography>
    </Paper>
  );
  }
  