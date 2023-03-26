import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import OrdersTable from "./OrdersTable";

export default function Content() {
  const orders = [
    {
      id: "001",
      date: "2023-03-01",
      supplier: "ABC Inc.",
      PartNumber: "Online Store",
      description: "New York",
      status: "Shipped",
    },
    {
      id: "002",
      date: "2023-03-03",
      supplier: "XYZ Corp",
      PartNumber: "Retail Store",
      description: "Los Angeles",
      status: "Pending",
    },
    {
      id: "003",
      date: "2023-03-05",
      supplier: "LMN LLC",
      PartNumber: "Wholesale",
      description: "Chicago",
      status: "Processing",
    },
  ];

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
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        <OrdersTable orders={orders} />
      </Typography>
    </Paper>
  );
}
