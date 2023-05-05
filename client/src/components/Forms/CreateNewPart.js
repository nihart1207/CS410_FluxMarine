import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, TextField , Stack } from '@mui/material';
import axios from "axios";
import SaveIcon from '@mui/icons-material/Save';


export default function CreateNewPartForm({ open, handleClose, data, setData}) {
  const [partName, setPartName] = React.useState("");
  const [partDescription, setPartDescription] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSave = async(event) => {
    event.preventDefault();
    if (!partName || !partDescription) {
        setError("Cannot leave fields empty");
        return;
    }

    setLoading(true);
    const response = await axios.post("/api/part", 
        {partName: partName, partDescription: partDescription},
        {headers:{'Content-Type': 'application/json'}, withCredentials: true }
    )
    switch (response.status) {
        case 200:
            console.log(response.data);
            setData([response.data , ...data]);
            setLoading(false);
            handleClose();
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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">
        Create New Part
      </DialogTitle>
      <DialogContent>
        
      <Stack>

            {/* part name text field */}
            <TextField 
                id="name"
                type = "text"
                text="" required 
                label="Name" 
                margin='dense'
                variant="outlined" 
                value={partName} 
                onChange={(event)=>{setPartName(event.target.value); setError("")}}/>
            

            {/* description text field */}
            <TextField
                margin='dense' 
                id="contact"
                type = "text"
                text="" required 
                label="description" 
                variant="outlined" 
                value={partDescription} 
                onChange={(event)=>{setPartDescription(event.target.value); setError("")}}/>
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
