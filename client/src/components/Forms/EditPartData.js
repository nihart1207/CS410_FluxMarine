import React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField} from '@mui/material';


export default function EditPartData({product, handleRequest}) {
  const [open, setOpen] = React.useState(false);
  const [partName, setPartName] = useState(product.productName);
  const [partDescription, setPartDescription] = useState(product.productDescription);

  function renderForm() {
    const handleNameChange = (event) => {
        setPartName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setPartDescription(event.target.value);
    };


    const handleSave = () => {
      handleRequest(product._id , partName, partDescription , (success, message) => {
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
        <DialogTitle>Edit Part Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Part Name"
            type="text"
            fullWidth
            value={partName}
            onChange={handleNameChange}
          />

            <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={partDescription}
            onChange={handleDescriptionChange}
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
