import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OrdersTable from "./OrdersTable";
import { DatePicker } from "@mui/lab";


export default function Content() {
  const [all_orders, setAllOrders] = React.useState([]);

    const [orders, setOrders] = React.useState([]);

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
        setOrders(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);


  const [selectedDate, setSelectedDate] = React.useState(null);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [searchId, setSearchId] = React.useState("");

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

  const handleIdChange = (event) => {
    const {value} = event.target;
    setSearchId(value)
    if (value) {
      const filteredProducts = Object.values(all_orders).filter((product) =>
      product._id.toLowerCase().includes(value.toLowerCase())
      );
      setOrders(filteredProducts);
    } else {
      setOrders(all_orders);
    }
  };

  const handleStatusFilterChange = (event) => {
    const { value } = event.target;
    if (value === "") {
      setOrders(all_orders);
    } else {
      const filteredProducts = Object.values(all_orders).filter(
        (product) => product.status.includes(value)
      );
      setOrders(filteredProducts);
    }
  };
  

  // For Orders table
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
                placeholder="Search by order ID"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                value={searchId}
                onChange={handleIdChange}
                variant="standard"
              />
            </Grid>
            
            
            <Grid item>
              <IconButton onClick={handleCalendarOpen}>
                <CalendarTodayIcon />
              </IconButton>
              <DatePicker
                open={calendarOpen}
                onOpen={handleCalendarOpen}
                onClose={handleCalendarClose}
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select date" />
                )}
                sx={{ zIndex: 2000 }} // Ensure calendar popoveris on top of other elements
              />
            </Grid>
            

            <Grid item>
              <Select
                variant="standard"
                value=""
                displayEmpty
                IconComponent={ArrowDropDownIcon}
                onChange={handleStatusFilterChange}
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
        <OrdersTable orders={orders} />
      </Typography>
    </Paper>
  );
}


