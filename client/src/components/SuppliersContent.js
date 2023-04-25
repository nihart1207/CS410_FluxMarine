import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import IconButton from "@mui/material/IconButton";
import { DatePicker } from "@mui/lab";
import SuppliersTable from "./SuppliersTable";

export default function SuppliersContent() {
  
    // for suppliers table 
    const [all_suppliers, setAllSuppliers] = React.useState([]);

    const [suppliers, setSuppliers] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/suppliers', {
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
        setAllSuppliers(data);
        setSuppliers(data);
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

    const handleSearchNameChange = (event) => {
      const {value} = event.target;
      setSearchName(value)
      if (value) {
        const filteredProducts = Object.values(all_suppliers).filter((product) =>
        product.supplierName.toLowerCase().includes(value.toLowerCase())
        );
        setSuppliers(filteredProducts);
      } else {
        setSuppliers(all_suppliers);
      }
    };
  
  // For Suppliers table 
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
                  placeholder="Search by Supplier Name"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: "default" },
                  }}
                  value={searchName}
                  onChange={handleSearchNameChange}
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          <SuppliersTable suppliers={suppliers} />
        </Typography>
      </Paper>
    );
    }
  
   