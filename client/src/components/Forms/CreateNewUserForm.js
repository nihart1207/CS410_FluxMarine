import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, TextField , Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import SaveIcon from '@mui/icons-material/Save';


export default function CreateNewUserForm({ open, handleClose, data, setData}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("USER");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSave = async(event) => {
    event.preventDefault();
    if (!role || !email || !role) {
        setError("Cannot leave fields empty");
        return;
    }

    setLoading(true);
    const response = await axios.post("/api/user", 
        {name: name, email:email, role: role, password: "testing"},
        {headers:{'Content-Type': 'application/json'}, withCredentials: true }
    )
    switch (response.status) {
        case 200:
            setData([response.data , ...data]);
            setLoading(false);
            handleClose();
            break;
        case 400:
            setLoading(false);
            setError("Missing fields");
            break;
        case 409:
            setLoading(false);
            setError("User email already taken");
            break;
        case 500:
            setLoading(false);
            setError("Internal error, please try again");
            break;
    }
  } 

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">
        Create New User
      </DialogTitle>
      <DialogContent>
        
      <Stack>

            {/* name text field */}
            <TextField 
                id="name"
                type = "text"
                text="" required 
                label="Name" 
                margin='dense'
                variant="outlined" 
                value={name} 
                onChange={(event)=>{setName(event.target.value); setError("")}}/>
            
            {/* email text field */}
            <TextField
                margin='dense' 
                id="email"
                type = "email"
                text="" required 
                label="email" 
                variant="outlined" 
                value={email} 
                onChange={(event)=>{setEmail(event.target.value); setError("")}}/>
            

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={role}
                    label="Role"
                    onChange={(event)=>{setRole(event.target.value); setError("");}}
                    >
                    <MenuItem value="USER" >User</MenuItem>
                    <MenuItem value="EDITOR" >Editor</MenuItem>
                    <MenuItem value="ADMIN" >Admin</MenuItem>
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
  );
}
