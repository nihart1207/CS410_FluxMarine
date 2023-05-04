import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SaveIcon from '@mui/icons-material/Save';
import { Alert, TextField, Stack} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export default function CreateOrderForm({popup, setPopup}) {

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [supplierId, setSupplierId] = React.useState("");
  const [partId, setPartId] = React.useState("");

  const handleSave = (event) => {
    if (supplierId && partId) {
        setLoading(true);
        const response = axios.post("/api/stock", 
            {supplier_id: supplierId, part_id: partId}, 
            {headers:{
                'Content-Type': 'application/json'
            }, withCredentials: true 
            });
        switch (response.status) {
            case 404:
                setLoading(false);
                setError("Part Id / Supplier Id are missing");
                break;
            case 200:
                setLoading(false);
                setError("");
                setPopup(false);
                break;
            case 500:
                setLoading(false);
                setError("Internal server error try again ");
                break;
        }
    } else {
        setError("Part Id / Supplier Id are missing");
    }
  }

  return (
    
      <Dialog
        open={popup}
        onClose={()=>setPopup(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create a New Order"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
            <Stack>
            <TextField 
                id="part_id"
                text="" required 
                label="Part ID" 
                margin='dense'
                variant="outlined" 
                value={partId} 
                onChange={(event)=>{setPartId(event.target.value); setError("")}}/>
            
            <TextField
                margin='dense' 
                id="supplier_id"
                text="" required 
                label="Supplier ID" 
                variant="outlined" 
                value={supplierId} 
                onChange={(event)=>{setSupplierId(event.target.value); setError("")}}/>
            

            </Stack>
            
            
            {/* error  message shows here */}
            {error && <Alert severity="error">{error}</Alert>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setPopup(false)}>Cancel</Button>
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