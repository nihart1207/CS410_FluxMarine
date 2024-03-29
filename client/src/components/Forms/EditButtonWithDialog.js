import React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


function EditButtonWithDialog({user, handleRequest}) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);

  function renderForm() {
    const handleNameChange = (event) => {
      setName(event.target.value);
    };

    const handleRoleChange = (event) => {
      setRole(event.target.value);
    };

    const handleSave = () => {
      handleRequest(user.email, name, role, (success, message) => {
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
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={handleNameChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              onChange={handleRoleChange}
            >
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="EDITOR">Editor</MenuItem>
              <MenuItem value="USER">Viewer</MenuItem>
            </Select>
          </FormControl>
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

export default EditButtonWithDialog;
