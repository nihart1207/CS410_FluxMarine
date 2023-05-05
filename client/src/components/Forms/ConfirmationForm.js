import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function ConfirmationForm({ name, open, setAgreed, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setAgreed(true);
    handleClose();
  };

  const handleDisagree = () => {
    setAgreed(false);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">
        {`Confirm ${name}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {`Are you sure you want to ${name} this item?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree} color="primary">
          Disagree
        </Button>
        <Button onClick={handleAgree} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationForm;
