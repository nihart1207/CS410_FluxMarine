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
  const orders = [
    {
      id: "001",
      date: "2023-03-01",
      supplier: "ABC Inc.",
      PartNumber: "Online Store",
      description: "New York",
      status: "Received",
    },
    {
      id: "002",
      date: "2023-03-03",
      supplier: "XYZ Corp",
      PartNumber: "Retail Store",
      description: "Los Angeles",
      status: "Inventory",
    },
    {
      id: "003",
      date: "2023-03-05",
      supplier: "LMN LLC",
      PartNumber: "Wholesale",
      description: "Chicago",
      status: "Assembly",
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
              >
                <MenuItem value="" disabled>
                  Filter
                </MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
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


