import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OrdersTable from "../Table/OrdersTable";
import Box from '@mui/material/Box';
import ActionBar from "../Actions/ActionBar";


export default function OrdersContent() {
  const [all_orders, setAllOrders] = React.useState([]);
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    fetch('/api/stocks', {
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
        setAllOrders(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const [searchId, setSearchId] = React.useState("");

  // For Orders table
  return (
    <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: 'calc(100vh - 64px - 56px)',
          overflowY: 'scroll',
          paddingTop: 2,
          paddingBottom: 2,
          paddingRight: 3,
          paddingLeft: 3
        }}
      >
    
    <ActionBar name="Orders" data={all_orders} setData={setAllOrders} ></ActionBar>


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
                placeholder="Search by order ID"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                value={searchId}
                onChange={(event)=>setSearchId(event.target.value)}
                variant="standard"
              />
            </Grid>
            

            <Grid item>
              <Select
                variant="standard"
                value=""
                displayEmpty
                IconComponent={ArrowDropDownIcon}
                onChange={(event)=>setStatus(event.target.value)}
                >
                <MenuItem value="" >Filter</MenuItem>
                <MenuItem value="INVENTORY">Inventory</MenuItem>
                <MenuItem value="RECEIVED">Received</MenuItem>
                <MenuItem value="ASSEMBLY">Assembly</MenuItem>
              </Select>

            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        <OrdersTable orders={all_orders} searchId={searchId} status={status} />
      </Typography>
    </Paper>
    </Box>
  );
}


