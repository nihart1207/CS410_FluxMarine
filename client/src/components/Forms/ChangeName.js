import React from "react";
import Cookies from 'js-cookie';
import axios from "axios"
import jwt_decode from 'jwt-decode';
import { Button,DialogTitle, Dialog, DialogContent,
     DialogContentText, DialogActions, Alert,TextField, Box } from "@mui/material";
import {useNavigate} from 'react-router-dom';

export default function ChangeName({setChangeNamePopup}) {

    const cookieValue = Cookies.get('token');
    const navigate = useNavigate();
    const payload = jwt_decode(cookieValue);
    const [newName, setNewName] = React.useState("");
    const [confirmName, setConfirmName] = React.useState("");
    const [error, setError] = React.useState("");

    const handleSave = async(event) => {
        if (newName === "" || confirmName === "") {
            setError("Cannot leave the field empty");
        } else if (newName !== confirmName) {
            setError("Names are not matching");
        } else {
            const response = await axios.put('/api/user?email='+payload.email+'&name='+newName);
            switch (response.status) {
                case 200:
                    console.log("succesfully updated");
                    break;
                default:
                    navigate("/", {replace : true})
                    break;
            }
            setChangeNamePopup(false);
        }
    }

    return (
        <Dialog
        style={{padding: '24px'}}
          open="true"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }} >
            {"Change Name of the Account"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
            <TextField
            id="outlined-basic"
            type="text"
            label="New Name"
            variant="outlined"
            required
            onChange={(event) => {
            setNewName(event.target.value);
            setError("");
            }}
            sx={{ mb: 2 }}
            />
        <TextField
            id="outlined-basic"
            type="text"
            label="Confirm New Name"
            variant="outlined"
            required
            onChange={(event) => {
            setConfirmName(event.target.value);
            setError("");
            }}
            sx={{ mb: 2 }}
                />
                {error && <Alert severity="error">{error}</Alert>}
            </Box>
            </DialogContentText>
            </DialogContent>
          <DialogActions>
            <Button onClick={() => setChangeNamePopup(false)}> Cancel</Button>
            <Button sx={{
    '&:hover': {
      bgcolor: 'rgba(76, 175, 80, 0.8)',
    },
  }} onClick={handleSave} autoFocus>Save</Button>
          </DialogActions>
        </Dialog>
      )
}

