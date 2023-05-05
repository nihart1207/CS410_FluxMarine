import React from "react";
import axios from "axios";
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import {Stack, Alert, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function UpdateOrderButtonAndPopup({data, setData}) {

    const [popup, setPopup] = React.useState(false);
    const [orderId, setOrderId] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSave = async (event) => {
        event.preventDefault();
        if (!orderId || !status) {
            setError("Cannot leave fields empty");
            return;
        }

        setLoading(true);
        const response = await axios.put(`/api/stock/${orderId}`, 
            {status: status},
            {headers:{'Content-Type': 'application/json'}, withCredentials: true }
        )       
        switch (response.status) {
            case 200:
                const updatedOrder = response.data;
                const updatedOrders = data.map(order =>
                    order._id === updatedOrder._id ? updatedOrder : order
                );
                setData(updatedOrders);
                setLoading(false);
                handleClose();
                break;
            case 404:
                setLoading(false);
                setError("Order Id doesnt exist");
                break;
            case 400:
                setLoading(false);
                setError("Missing fields");
                break;
            case 500:
                setLoading(false);
                setError("Internal error, please try again");
                break;
        }
    }

    const handleClose = () => {
        setPopup(false);
    }

    const handleClick = (event) => {
        event.preventDefault();
        setPopup(true);
    }

    const handleOrderChange = (event) => {
        event.preventDefault();
        setError("");
        setOrderId(event.target.value);
    }

    const handleStatusChange = (event) => {
        event.preventDefault();
        setError("");
        setStatus(event.target.value);
    }

    const renderForm = () => {
        return(
            <Dialog open={popup} onClose={handleClose}>
                <DialogTitle>Update Order Details</DialogTitle>
                <DialogContent>
                <Stack>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Order Id"
                    type="text"
                    fullWidth
                    value={orderId}
                    onChange={handleOrderChange}
                />
                <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Status</InputLabel>
                    <Select
                    labelId="role-label"
                    value={status}
                    onChange={handleStatusChange}
                >
                <MenuItem value="INVENTORY">Inventory</MenuItem>
                <MenuItem value="RECEIVED">Received</MenuItem>
                <MenuItem value="ASSEMBLY">Assembly</MenuItem>
                </Select>
                </FormControl>
                </Stack>
                {error && <Alert severity="error">{error}</Alert>}
                </DialogContent>

                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <LoadingButton
                    color="secondary"
                    onClick={handleSave}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                >
                <span>Save</span>
                </LoadingButton>
                </DialogActions>
            </Dialog>
        )
    }


    return (
        <div>
            <Button color="secondary" size="large" variant="outlined" onClick={handleClick}
                sx={{'&:hover': {backgroundColor: 'rgba(33, 150, 243, 0.1)',},}}
            >Update</Button>
            {popup && renderForm()}
        </div>
    )

}