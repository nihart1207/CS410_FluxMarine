import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ProductsTable from "./ProductsTable";

export default function Content() {  
    //for products table
    const products = [
      {
        id: "1",
        name: "Electric Motor",
        description: "It is an electric motor",
      },
      {
        id: "2",
        name: "Hex Nut",
        description: "It is a Hex nut",
      },
      {
        id: "3",
        name: "Axle",
        description: "It is an Axle",
      },
    ];
  
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [calendarOpen, setCalendarOpen] = React.useState(false);
  
    const handleCalendarOpen = () => {
      setCalendarOpen(true);
    };
  
    const handleCalendarClose = () => {
      setCalendarOpen(false);
    };
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
      handleCalendarClose();
    };
  
  // for products table 
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
                placeholder="Search by Product ID"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        <ProductsTable products={products} />
      </Typography>
    </Paper>
  );
  }
  