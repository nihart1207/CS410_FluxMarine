import React, { useState } from "react";
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { Alert} from '@mui/material';
import DownloadIcon from "@mui/icons-material/Download";

const DateRangeDialog = ({ onClose, open }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
    setError("");
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
    setError("");
  };

  const handleSave = async() => {
    if (!fromDate || !toDate) {
      setError("Please select both from date and to date.");
      return;
    }

    if (new Date(toDate) <= new Date(fromDate)) {
      setError("To date must be greater than from date.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`/api/stocks/csv?fromDate=${fromDate}&toDate=${toDate}`, {
        responseType: 'blob', // Set response type to blob to handle binary data
      });
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'stocks.csv';
      link.click();
    } catch (error) {
      console.log(error);
      setError("Failed to download CSV file.");
    }finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>Select date range</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            label="From date"
            type="date"
            value={fromDate}
            onChange={handleFromDateChange}
            sx={{ margin: "1rem" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="To date"
            type="date"
            value={toDate}
            onChange={handleToDateChange}
            sx={{ margin: "1rem" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        {error && <Alert severity="error">{error}</Alert>}
      </DialogContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem",
        }}
      >
        <Button onClick={onClose} color="secondary" sx={{ marginRight: "1rem" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={20} />
            ) : (
              <DownloadIcon />
            )
          }
        >
          {loading ? "Downloading..." : "Download"}
        </Button>
      </Box>
    </Dialog>
  );
};

export default DateRangeDialog;
