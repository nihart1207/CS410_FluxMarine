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
    const suppliers = [
        {
          id: "1",
          name: "Walmart",
          contact: "0000000000",
          email: "sam@walmart.com",
        },
        {
          id: "2",
          name: "Krogers",
          contact: "1111111111",
          email: "jon@krogers.com",
        },
        {
          id: "3",
          name: "Target",
          contact: "2222222222",
          email: "will@target.com",
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
                  placeholder="Search by Supplier ID"
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
            </Grid>
          </Toolbar>
        </AppBar>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          <SuppliersTable suppliers={suppliers} />
        </Typography>
      </Paper>
    );
    }
  
   