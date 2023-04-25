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
import { DatePicker } from "@mui/lab";
import UsersTable from "./UsersTable";

export default function Content() {
  
    // for users table
    const users = [
      {
        id: "1",
        name: "John Doe",
        role: "Administrator",
        email: "jon.doe@fluxmarine.com",
      },
      {
        id: "2",
        name: "Jane Doe",
        role: "Editor",
        email: "jane.doe@fluxmarine.com",
      },
      {
        id: "3",
        name: "Bob Smith",
        role: "Viewer",
        email: "bob.smith@fluxmarine.com",
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
                placeholder="Search by user ID"
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
                  Roles
                </MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
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
        <UsersTable users={users} />
      </Typography>
    </Paper>
  );
  }
  