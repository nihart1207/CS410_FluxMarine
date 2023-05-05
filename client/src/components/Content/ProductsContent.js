import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ProductsTable from "../Table/ProductsTable";
import Box from '@mui/material/Box';
import ActionBar from "../Actions/ActionBar";

export default function ProductsContent() {  
    //for products table
    const [all_products, setAllProducts] = React.useState([]);
    const [searchName , setSearchName] = React.useState('');

  React.useEffect(() => {
    fetch('/api/parts', {
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
        setAllProducts(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  
  // for products table 
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
    {/* action buttons go here */}
    <ActionBar name="Parts" data={all_products} setData={setAllProducts} ></ActionBar>


    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
      {/* search bar goes here */}
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
                placeholder="Search by Part Name"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
                value={searchName}
                onChange={(event) => setSearchName(event.target.value)}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* Table goes here */}
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        <ProductsTable all_products={all_products} setAllProducts={setAllProducts} searchName={searchName}/>
      </Typography>
    </Paper>
    </Box>
  );
}
