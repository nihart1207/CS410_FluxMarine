import React from "react";
import Cookies from 'js-cookie';
import axios from "axios"
import jwt_decode from 'jwt-decode';
import { Button,DialogTitle, Dialog, DialogContent,
     DialogContentText, DialogActions, Alert,TextField } from "@mui/material";
import {useNavigate} from 'react-router-dom';

export default function ChangeName({setChangeNameDialog}) {

    const cookieValue = Cookies.get('token');
    const navigate = useNavigate();
    const payload = jwt_decode(cookieValue);
    const [newName, setNewName] = React.useState("");
    const [confirmNewName, setConfirmNewName] = React.useState("");
    const [error, setError] = React.useState("");

    const handleSave = async(event) => {
        if (newName === "" || confirmNewName === "") {
            setError("Cannot leave the field empty");
        } else if (newName !== confirmNewName) {
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
            setChangeNameDialog(false);
        }
    }

    return (
        <Dialog
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }} >
            {"Change Name of the Account"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <TextField id="outlined-basic" label="New Name" variant="outlined" required onChange={(event)=>{setNewName(event.target.value); setError("");}}/>
            <TextField id="outlined-basic" label="Confirm New Name" variant="outlined" required onChange={(event)=>{setConfirmNewName(event.target.value); setError("");}}/>
            <Alert severity="error">{error}</Alert>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setChangeNameDialog(false)}> Cancel</Button>
            <Button onClick={handleSave} autoFocus>Save</Button>
          </DialogActions>
        </Dialog>
      )
}

