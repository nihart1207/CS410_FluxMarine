import React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


export default function EditSupplierData({supplier, handleRequest}) {
  const [open, setOpen] = React.useState(false);
  const [supplierName, setSupplierName] = useState(supplier.supplierName);
  const [email, setEmail] = useState(supplier.email);
  const [contact, setContact] = useState(supplier.contact);

  function renderForm() {
    const handleNameChange = (event) => {
        setSupplierName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleContactChange = (event) => {
        setContact(event.target.value);
    };


    const handleSave = () => {
      handleRequest(supplier._id , supplierName, email, contact , (success, message) => {
        if (success) {
          handleClose();
        } else {
          // Display the error message
          console.error(message);
        }
      });
    }

    const handleClose = () => {
      setOpen(false);
    }

    return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Supplier Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={supplierName}
            onChange={handleNameChange}
          />
          <TextField
            autoFocus
            margin="dense"
            label="email"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />

            <TextField
            autoFocus
            margin="dense"
            label="contact"
            type="text"
            fullWidth
            value={contact}
            onChange={handleContactChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
  }


  return (
    <>
      <IconButton color="secondary" aria-label="edit" onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      {open && renderForm()}
    </>
  );
}
