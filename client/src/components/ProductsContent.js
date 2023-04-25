import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ProductsTable from "./ProductsTable";

export default function ProductsContent() {  
    //for products table
    const [all_products, setAllProducts] = React.useState([]);

    const [products, setProducts] = React.useState([]);

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
        setProducts(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

    const [selectedDate, setSelectedDate] = React.useState(null);
    const [calendarOpen, setCalendarOpen] = React.useState(false);
    const [searchName , setSearchName] = React.useState('');
  
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

    const handleNameChange = (event) => {
      const {value} = event.target;
      setSearchName(value)
      if (value) {
        const filteredProducts = Object.values(all_products).filter((product) =>
        product.partName.toLowerCase().includes(value.toLowerCase())
        );
        setProducts(filteredProducts);
      } else {
        setProducts(all_products);
      }
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
                placeholder="Search by Part Name"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
                value={searchName}
                onChange={handleNameChange}
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
